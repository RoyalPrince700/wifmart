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
  const location = useLocation(); // Get the current route
  const [cartProductCount, setCartProductCount] = useState(0);

  // List of routes where header and footer should be hidden
  const hideHeaderFooterRoutes = ['/login', '/sign-up'];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

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
    // Fetch user details
    fetchUserDetails();

    // Fetch user cart product count
    fetchUserAddToCart();
  }, []);

  return (
    <>
      {/* Ensure the page scrolls to the top on route change */}
      <ScrollToTop />

        <Context.Provider
          value={{
            fetchUserDetails, // User details fetch
            cartProductCount, // Current user add-to-cart product count
            fetchUserAddToCart,
          }}
        >
        <ToastContainer
              position="top-center"    // Position at the top center
              autoClose={300}         // Close after 0.3 second
              limit={1}                // Only display 1 toast at a time
              closeOnClick             // Close toast on click
              pauseOnHover             // Pause auto-close on hover
              draggable                // Allow dragging of toast
              theme="light"            // Optional: set theme to "light" or "dark"
              newestOnTop={true}       // Show the newest toast on top
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
