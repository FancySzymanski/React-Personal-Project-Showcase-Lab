# Ice Cream Showcase

A React single-page app for a multi-location ice cream shop. Customers can browse locations and flavors, and search by flavor or location name. An admin portal lets you add, edit, and delete flavors.

As this is just a test/demo, any input in username and password will successfully log into the user portal

## Tech

React, Vite, React Router, json-server (mock backend), Vitest, React Testing Library

## Getting Started

```bash
npm install
npm run server   # json-server on http://localhost:3001
npm run dev      # Vite dev server on http://localhost:5173
```

Run both commands in separate terminals.

## Testing

```bash
npm run test
```

## Features

- Client-side routing with nested routes and `Outlet` context
- Custom hooks: `useFetchData` (GET) and `useMutateData` (POST, PATCH, DELETE)
- `useContext` for admin login state, `useId` for form fields
- Flavors can be shared across multiple locations
