import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import ForgotPassword from "../Pages/ForgotPassword";
import SignUp from "../Pages/SignUp";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/AllUsers";
import AllProducts from "../Pages/AllProducts";
import CategoryProduct from "../Pages/CategoryProduct";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import SearchProduct from "../Pages/SearchProduct";
import Success from "../Pages/Success";
import Cancel from "../Pages/Cancel";
import OrderPage from "../Pages/OrderPage";
import AllOrders from "../Pages/AllOrders";
import Checkout from "../Pages/Checkout";
import FoodProductDetails from "../Pages/FoodProductDetails";
import PayOnDeliveryOrders from "../Pages/PayOnDeliveryOrderPage";
import HRPanel from "../Pages/HrPanel";
import AllLogistics from "../Pages/AllLogisticsAttendants";
import LADashboard from "../Pages/LaPanel";
import ManageOrders from "../Pages/ManageAssignedLAOrder";
import HRAllOrders from "../Pages/HRAllOrders";
import LAAllOrders from "../Pages/LAAllOrders";
import Support from "../Pages/Support";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import TokenVerification from "../Pages/TokenVerification";
import ResetPassword from "../Pages/ResetPassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            }, {
                path: "token-verification",
                element: <TokenVerification />,
            },{
                path: "reset-password/:token",
                element: <ResetPassword />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "sign-up",
                element: <SignUp />,
            },  {
                path: "support",
                element: <Support />,
            },{
                path: "contact-us",
                element: <ContactUs />,
            },{
                path: "about-us",
                element: <AboutUs />,
            },
            {
                path: "product-category",
                element: <CategoryProduct />,
            },
            {
                path: "product/:id",
                element: <ProductDetails />,
            }, {
                path: "foodproduct/:id",
                element: <FoodProductDetails />,
            },
            {
                path: "search/product/:id", // Add this line for searching products
                element: <ProductDetails />, // You can reuse the same component
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "success",
                element: <Success />,
            },
            {
                path: "cancel",
                element: <Cancel />,
            },
            {
                path: "search",
                element: <SearchProduct />,
            },
            {
                path: "order",
                element: <OrderPage />,
            },  {
                path: "payondeliveryorder",
                element: <PayOnDeliveryOrders />,
            }, {
                path: "checkout",
                element: <Checkout />,
            },
            {
                path: "la-panel",
                element: <LADashboard />,
                children: [
                   {
                        path: "la-all-orders",
                        element: <LAAllOrders />,
                    },
                ],
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />,
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />,
                    }, {
                        path: "all-orders",
                        element: <AllOrders />,
                    },
                ],
            },
            {
                path: "hr-panel",
                element: <HRPanel />,
                children: [
                    {
                        path: "all-logistics-attendant",
                        element: <AllLogistics />,
                    },{
                        path: "manage-orders",
                        element: <ManageOrders />,
                    },{
                        path: "hr-orders",
                        element: <HRAllOrders />,
                    },
                  
                ],
            },
        ],
    },
]);

export default router;
