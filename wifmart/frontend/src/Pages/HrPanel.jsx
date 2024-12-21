import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import ROLE from '../common/role';
import SummaryApi from '../common';

const HRPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [logisticsAttendants, setLogisticsAttendants] = useState([]);

    useEffect(() => {
        if (user?.role !== ROLE.HR) {
            navigate("/");
        }
    }, [user, navigate]);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const fetchLogisticsAttendants = async () => {
        try {
            const response = await fetch(SummaryApi.getOrderLogisticsAttendants.url, {
                method: SummaryApi.getOrderLogisticsAttendants.method,
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                setLogisticsAttendants(data.data);
            }
        } catch (error) {
            console.error("Error fetching logistics attendants:", error.message);
        }
    };

    useEffect(() => {
        fetchLogisticsAttendants();
    }, []);

    return (
        <div className="min-h-[calc(100vh-120px)] mt-[80px] md:ml-28 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-white shadow">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <AiOutlineMenu className="text-2xl" />
                </button>
                <div className="flex items-center space-x-2">
                    {user?.profilePic ? (
                        <img
                            src={user?.profilePic}
                            className="w-8 h-8 rounded-full"
                            alt={user?.name}
                        />
                    ) : (
                        <FaRegCircleUser className="text-xl" />
                    )}
                    <span className="text-sm font-semibold capitalize">{user?.name}</span>
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`bg-white mt-[120px] absolute md:static z-10 top-0 left-0 w-60 h-full transform 
                    transition-transform duration-300 ease-in-out md:block ${
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="h-32 flex flex-col justify-center items-center">
                    <FaRegCircleUser className="text-5xl" />
                    <p className="capitalize text-lg font-semibold">{user?.name}</p>
                    <p className="text-sm">{user?.role}</p>
                </div>

                <nav className="grid p-4">
                            <Link
                                to={"all-logistics-attendant"}
                                className="px-2 py-1 hover:bg-slate-100"
                                onClick={closeMobileMenu}
                            >
                                All Logistics Attendants
                            </Link>
                            <Link
                                to={"hr-orders"}
                                className="px-2 py-1 hover:bg-slate-100"
                                onClick={closeMobileMenu}
                            >
                                Manage Orders
                            </Link>
                        </nav>

            </div>

            {/* Main Content */}
            <main
                className={`flex-1 w-full h-full p-4 bg-gray-100 ${
                    isMobileMenuOpen ? "opacity-50 pointer-events-none" : "opacity-100"
                }`}
                onClick={closeMobileMenu}
            >
                <Outlet />
            </main>
        </div>
    );
};

export default HRPanel;
