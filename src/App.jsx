
import { Toaster } from "react-hot-toast";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Brands from "./Pages/Brands/Brands";
import Categories from "./Pages/Categories/Categories";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
import ProtectesRoutes from "./Protected/ProtectesRoutes";
import AuthContextProvider from "./Context/AuthContext";
import LoginProtected from "./Protected/LoginProtected";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyOtp from "./Pages/VerifyOtp/VerifyOtp";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Error404 from "./Pages/404/Error404";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import AllOrders from "./Pages/AllOrders/AllOrders";
import CategoriesDetails from "./Pages/CategoriesDetails/CategoriesDetails";
import BrandsDetails from "./Pages/BrandsDetails/BrandsDetails";
import WishList from "./Pages/WishList/WishList";
import WishListContextProvider from "./Context/WishListContext";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectesRoutes>
            <Home />
          </ProtectesRoutes>
        ),
      },
      {
        path: "/Brands",
        element: (
          <ProtectesRoutes>
            <Brands />
          </ProtectesRoutes>
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectesRoutes>
            <Categories />
          </ProtectesRoutes>
        ),
      },
      {
        path: "/prodcuts",
        element: (
          <ProtectesRoutes>
            <Products />
          </ProtectesRoutes>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectesRoutes>
            <Cart />
          </ProtectesRoutes>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectesRoutes>
            <AllOrders/> 
          </ProtectesRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <LoginProtected>
            <Login />
          </LoginProtected>
        ),
      },
      {
        path: "/register",
        element: (
          <LoginProtected>
            <Register />
          </LoginProtected>
        ),
      },
      {
        path: "/forgetPassword",
        element: (
          <LoginProtected>
            <ForgetPassword />
          </LoginProtected>
        ),
      },
      {
        path: "/verifyOtp",
        element: (
          <LoginProtected>
            <VerifyOtp />
          </LoginProtected>
        ),
      },
      {
        path: "/resetpassword",
        element: (
          <LoginProtected>
            <ResetPassword />
          </LoginProtected>
        ),
      },
      {
        path: "/error404",
        element: (
          <LoginProtected>
            <Error404 />
          </LoginProtected>
        ),
      },
      {
        path: "/productDetails/:id",
        element: (
          <ProductDetails />          
        ),
      },
      {
        path: "/categoriesDetails/:id",
        element: (
          <CategoriesDetails />
        ),
      },
      {
        path: "/brandsDetails/:id",
        element: (
          <BrandsDetails />
        ),
      },
      {
        path: "/wishList",
        element: (
          <ProtectesRoutes>
            <WishList />
          </ProtectesRoutes>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
    <WishListContextProvider>
      <CartContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </CartContextProvider>
    </WishListContextProvider>
    </AuthContextProvider>
   
  );
}

export default App;
