import FrontLayout from "../layouts/FrontLayout";
import AdminLayout from "../layouts/AdminLayout";
import FitnessLanding from "../pages/FitnessLanding";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import AdminProducts from "../pages/AdminProducts";
import AdminOrders from "../pages/AdminOrders";
import AdminCoupons from "../pages/AdminCoupons";
import OrderSuccess from "../pages/OrderSuccess";
import NotFound from "../pages/NotFound";

const routes = [
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      {
        index: true,
        element: <FitnessLanding />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order-success",
        element: <OrderSuccess />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "coupons",
        element: <AdminCoupons />,
      },
    ],
  },
];

export default routes;
