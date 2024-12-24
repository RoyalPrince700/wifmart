import './app.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import ScrollToTop from './components/ScrollTop';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [cartProductCount, setCartProductCount] = useState(0);

  const hideHeaderFooterRoutes = ['/login', '/sign-up'];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include', // Ensure cookies are sent
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        // Successfully fetched user details
        dispatch(setUserDetails(dataApi.data));
      } else {
        // Handle invalid or expired token
        if (
          dataApi.message === "Invalid or expired token. Please login again." ||
          dataApi.message === "Please Login...!"
        ) {
          window.location.href = "/login";
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer
          position="top-center"
          autoClose={300}
          limit={1}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          newestOnTop={true}
        />
        {!shouldHideHeaderFooter && <Header />}
        <main className={`min-h-[calc(100vh-120px)] pt-0`}>
          <Outlet />
        </main>
        {!shouldHideHeaderFooter && <Footer />}
      </Context.Provider>
    </>
  );
}

export default App;
