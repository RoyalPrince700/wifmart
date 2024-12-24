// filepath: /c:/Users/HP/Desktop/com/wifmart/frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        const response = await fetch(SummaryApi.current_user.url, {
            method: SummaryApi.current_user.method,
            credentials: 'include', // Include credentials
        });

        const data = await response.json();

        if (data.success) {
            dispatch(setUserDetails(data.data));
        }
    };

    const fetchUserAddToCart = async () => {
        const response = await fetch(SummaryApi.addToCartProductCount.url, {
            method: SummaryApi.addToCartProductCount.method,
            credentials: 'include',
        });

        const data = await response.json();

        setCartProductCount(data?.data?.count);
    };

    useEffect(() => {
        // Check for token in cookies
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            fetchUserDetails();
            fetchUserAddToCart();
        }
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