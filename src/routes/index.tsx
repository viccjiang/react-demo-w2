import FrontLayout from "../layouts/FrontLayout";
import AdminLayout from "../layouts/AdminLayout";
import FitnessLanding from "../pages/front/FitnessLanding";
import ProductList from "../pages/front/ProductList";
import ProductDetail from "../pages/front/ProductDetail";
import Cart from "../pages/front/Cart";
import Login from "../pages/front/Login";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminCoupons from "../pages/admin/AdminCoupons";
import Favorites from "../pages/front/Favorites";
import OrderSuccess from "../pages/front/OrderSuccess";
import NotFound from "../pages/front/NotFound";

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
        path: "favorites",
        element: <Favorites />,
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
