import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AdminProductContainer from "../../routes/AdminProductContainer";
import AdminProductList from "../../components/AdminProductList";
import AdminProductForm from "../../components/AdminProductForm";

vi.mock("../../hooks/FetchData", () => ({
    default: vi.fn(),
}));
import useFetchData from "../../hooks/FetchData";

vi.mock("../../components/AdminContext", () => ({
    useAdmin: vi.fn(),
}));
import { useAdmin } from "../../components/AdminContext";

const mockFlavors = () => [
    {
        id: "1",
        name: "Vanilla",
        price: 4.0,
        image: "https://example.com/vanilla.jpg",
        imageAlt: "Vanilla Ice Cream",
        locationsIds: [1, 2],
    },
    {
        id: "2",
        name: "Mint Chocolate Chip",
        price: 5.0,
        image: "https://example.com/mint.jpg",
        imageAlt: "Mint Chocolate Chip Ice Cream",
        locationsIds: [1],
    },
];

const renderAdminAt = (initialPath) => {
    return render(
        <MemoryRouter initialEntries={[initialPath]}>
            <Routes>
                <Route path="/admin/login" element={<p>Login Page</p>} />
                <Route path="/admin/products" element={<AdminProductContainer />}>
                    <Route index element={<AdminProductList />} />
                    <Route path="new" element={<AdminProductForm />} />
                    <Route path=":id/edit" element={<AdminProductForm />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
};

beforeEach(() => {
    useFetchData.mockImplementation(() => ({
        data: mockFlavors(),
        error: null,
        loading: false,
    }));
    useAdmin.mockReturnValue({ isAdmin: true, login: vi.fn(), logout: vi.fn() });

    global.fetch = vi.fn((url, options = {}) => {
        const method = options.method || "GET";

        if (method === "POST") {
            const body = JSON.parse(options.body);
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ id: "99", ...body }),
            });
        }

        if (method === "PATCH") {
            const body = JSON.parse(options.body);
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(body),
            });
        }

        if (method === "DELETE") {
            return Promise.resolve({ ok: true });
        }

        return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });
});

describe("AdminProductContainer route protection", () => {
    it("redirects to /admin/login when the user is not logged in", () => {
        useAdmin.mockReturnValue({ isAdmin: false, login: vi.fn(), logout: vi.fn() });
        renderAdminAt("/admin/products");
        expect(screen.getByText("Login Page")).toBeInTheDocument();
    });

    it("renders the product list when the user is logged in", () => {
        renderAdminAt("/admin/products");
        expect(screen.getByText("Vanilla")).toBeInTheDocument();
        expect(screen.getByText("Mint Chocolate Chip")).toBeInTheDocument();
    });
});

describe("AdminProductCard", () => {
    it("renders an Edit link and a Delete button for each product", () => {
        renderAdminAt("/admin/products");
        const editLinks = screen.getAllByRole("link", { name: /edit/i });
        const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
        expect(editLinks).toHaveLength(2);
        expect(deleteButtons).toHaveLength(2);
    });

    it("removes the product and calls the DELETE endpoint when Delete is clicked", async () => {
        const user = userEvent.setup();
        renderAdminAt("/admin/products");

        const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
        await user.click(deleteButtons[0]);

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("/flavors/1"),
            expect.objectContaining({ method: "DELETE" })
        );
        expect(screen.queryByText("Vanilla")).not.toBeInTheDocument();
        expect(screen.getByText("Mint Chocolate Chip")).toBeInTheDocument();
    });
});

describe("AdminProductForm - create", () => {
    it("shows an empty form when adding a new product", async () => {
        const user = userEvent.setup();
        renderAdminAt("/admin/products");

        await user.click(screen.getByRole("link", { name: /add new product/i }));

        expect(screen.getByRole("heading", { name: /add new flavor/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toHaveValue("");
        expect(screen.getByLabelText(/price/i)).toHaveValue(null);
    });

    it("creates a new product and returns to the list showing it", async () => {
        const user = userEvent.setup();
        renderAdminAt("/admin/products/new");

        await user.type(screen.getByLabelText(/name/i), "Strawberry");
        await user.type(screen.getByLabelText(/price/i), "4.75");
        await user.type(screen.getByLabelText(/image url/i), "https://example.com/strawberry.jpg");
        await user.type(screen.getByLabelText(/image alt text/i), "Strawberry Ice Cream");
        await user.click(screen.getByRole("button", { name: /add flavor/i }));

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("/flavors"),
            expect.objectContaining({ method: "POST" })
        );
        expect(await screen.findByText("Strawberry")).toBeInTheDocument();
    });
});

describe("AdminProductForm - edit", () => {
    it("pre-fills the form with the existing product's values", async () => {
        const user = userEvent.setup();
        renderAdminAt("/admin/products");

        const editLinks = screen.getAllByRole("link", { name: /edit/i });
        await user.click(editLinks[0]);

        expect(screen.getByRole("heading", { name: /edit flavor/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toHaveValue("Vanilla");
        expect(screen.getByLabelText(/price/i)).toHaveValue(4);
    });

    it("updates the product's price and reflects it back in the list", async () => {
        const user = userEvent.setup();
        renderAdminAt("/admin/products/1/edit");

        const priceInput = screen.getByLabelText(/price/i);
        await user.clear(priceInput);
        await user.type(priceInput, "6.25");
        await user.click(screen.getByRole("button", { name: /save changes/i }));

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("/flavors/1"),
            expect.objectContaining({ method: "PATCH" })
        );
        expect(await screen.findByText("$6.25")).toBeInTheDocument();
    });
});
