import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AdminProvider, useAdmin } from "../../components/AdminContext";
import AdminForm from "../../routes/AdminForm";

function AdminProductsStub() {
    return <p>Admin Products Page</p>;
}

const renderAdminForm = () => {
    return render(
        <AdminProvider>
            <MemoryRouter initialEntries={["/admin/login"]}>
                <Routes>
                    <Route path="/admin/login" element={<AdminForm />} />
                    <Route path="/admin/products" element={<AdminProductsStub />} />
                </Routes>
            </MemoryRouter>
        </AdminProvider>
    );
};

describe("AdminForm (login page)", () => {
    it("renders a username input, password input, and submit button", () => {
        renderAdminForm();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    });

    it("navigates to /admin/products after submitting any username and password", async () => {
        const user = userEvent.setup();
        renderAdminForm();

        await user.type(screen.getByLabelText(/username/i), "anything");
        await user.type(screen.getByLabelText(/password/i), "anything");
        await user.click(screen.getByRole("button", { name: /log in/i }));

        expect(screen.getByText("Admin Products Page")).toBeInTheDocument();
    });

    it("logs in successfully even with minimal/arbitrary input", async () => {
        const user = userEvent.setup();
        renderAdminForm();

        await user.type(screen.getByLabelText(/username/i), "x");
        await user.type(screen.getByLabelText(/password/i), "y");
        await user.click(screen.getByRole("button", { name: /log in/i }));

        expect(screen.getByText("Admin Products Page")).toBeInTheDocument();
    });
});

function AdminStatusConsumer() {
    const { isAdmin, login, logout } = useAdmin();
    return (
        <div>
            <p>{isAdmin ? "Logged in" : "Logged out"}</p>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

describe("AdminContext", () => {
    it("defaults isAdmin to false", () => {
        render(
            <AdminProvider>
                <AdminStatusConsumer />
            </AdminProvider>
        );
        expect(screen.getByText("Logged out")).toBeInTheDocument();
    });

    it("sets isAdmin to true after calling login", async () => {
        const user = userEvent.setup();
        render(
            <AdminProvider>
                <AdminStatusConsumer />
            </AdminProvider>
        );

        await user.click(screen.getByRole("button", { name: /login/i }));
        expect(screen.getByText("Logged in")).toBeInTheDocument();
    });

    it("sets isAdmin back to false after calling logout", async () => {
        const user = userEvent.setup();
        render(
            <AdminProvider>
                <AdminStatusConsumer />
            </AdminProvider>
        );

        await user.click(screen.getByRole("button", { name: /login/i }));
        expect(screen.getByText("Logged in")).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: /logout/i }));
        expect(screen.getByText("Logged out")).toBeInTheDocument();
    });
});
