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


import { matchPath } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [cartProductCount, setCartProductCount] = useState(0);

  // List of routes where header and footer should be hidden
  const hideHeaderFooterRoutes = [
    '/login',
    '/sign-up',
    '/token-verification',
    '/forgot-password',
    '/reset-password/:token',
    '/verify-email',
  ];

  // Check if the current route matches any in the list
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.some((route) =>
    matchPath({ path: route, end: true }, location.pathname)
  );

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
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
          autoClose={1000}
          limit={1}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          newestOnTop={true}
        />

        {/* Conditionally render Header and Footer */}
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
