import { createHashRouter } from "react-router";

const basename = import.meta.env.MODE === "production" ? "/react-demo-w2" : "/";

const router = createHashRouter(
  [
    {
      path: "/",
      lazy: {
        Component: async () =>
          (await import("./pages/FitnessLanding")).default,
      },
    },
    {
      path: "/products",
      lazy: {
        Component: async () =>
          (await import("./pages/ProductList")).default,
      },
    },
    {
      path: "/products/:id",
      lazy: {
        Component: async () =>
          (await import("./pages/ProductDetail")).default,
      },
    },
    {
      path: "/cart",
      lazy: {
        Component: async () =>
          (await import("./pages/Cart")).default,
      },
    },
    {
      path: "/admin",
      lazy: {
        Component: async () =>
          (await import("./pages/AdminDashboard")).default,
      },
    },
  ],
  { basename },
);

export default router;
