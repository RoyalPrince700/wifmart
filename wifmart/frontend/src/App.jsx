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
    const [isLoading, setIsLoading] = useState(true);

    const hideHeaderFooterRoutes = ['/login', '/sign-up'];
    const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(SummaryApi.current_user.url, {
                method: SummaryApi.current_user.method,
                credentials: 'include', // Include credentials
            });
            const data = await response.json();

            if (response.ok && data.success) {
                dispatch(setUserDetails(data.data));
            } else {
                console.error("Failed to fetch user details:", data.message);
            }
        } catch (error) {
            console.error("Error fetching user details:", error.message);
        }
    };

    const fetchUserAddToCart = async () => {
        try {
            const response = await fetch(SummaryApi.addToCartProductCount.url, {
                method: SummaryApi.addToCartProductCount.method,
                credentials: 'include',
            });
            const data = await response.json();

            if (response.ok) {
                setCartProductCount(data?.data?.count || 0);
            } else {
                console.error("Failed to fetch cart product count:", data.message);
            }
        } catch (error) {
            console.error("Error fetching cart product count:", error.message);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchUserDetails();
            await fetchUserAddToCart();
            setIsLoading(false);
        })();
    }, [dispatch]);

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

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
                    autoClose={3000}
                    limit={1}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="light"
                    newestOnTop={true}
                />
                {!shouldHideHeaderFooter && <Header />}
                <main className="min-h-[calc(100vh-120px)] pt-0">
                    <Outlet />
                </main>
                {!shouldHideHeaderFooter && <Footer />}
            </Context.Provider>
        </>
    );
}

export default App;
