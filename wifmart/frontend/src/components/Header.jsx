
import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import { BiCategoryAlt } from "react-icons/bi";
import { IoHelpCircleOutline } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import CategoryDropdown from './CategoryList';
import icon from '../assets/profile_icon.png'
import { PiShoppingCartSimpleBold } from "react-icons/pi"
import { GiHamburgerMenu } from "react-icons/gi";





import { IoIosArrowForward } from "react-icons/io";
import { FiShoppingBag } from 'react-icons/fi';
import { BsChatLeftDots } from "react-icons/bs";
import { LuTicket } from "react-icons/lu";
import { IoPhonePortraitSharp } from "react-icons/io5";
import { FiTv } from "react-icons/fi";
import { CiApple } from "react-icons/ci";
import { GiLipstick } from "react-icons/gi";
import { MdOutlineHomeWork } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { GiClothes } from "react-icons/gi";
import { MdStars } from "react-icons/md";


const Header = () => {


  const [hambugDrop,setHambugDrop] = useState(false)

  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const location = useLocation();

  const hideSearchBar = location.pathname === "/login" || location.pathname === "/signup";

          const email = user?.email || "";
        const emailPrefix = email.split("@")[0];
        const maskedEmail = emailPrefix.length > 4 
          ? `${emailPrefix.slice(0, 2)}**${emailPrefix.slice(-2)}` 
          : emailPrefix;

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

   

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    } else if (data.error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".user-menu") && menuDisplay) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuDisplay]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="w-full  fixed max-h-[93px] h-[100px] bg-gray-900 top-0 lg:bg-gray-950 lg:h-[90px]  
    shadow-sm  z-40 flex  lg:px-4 lg:py-6  flex-col">
           <div className="px-2 sm:px-6 flex items-center justify-between w-full flex-shrink-0">

{/* Left Section - Logo and Links */}
<div className="flex items-center gap-5 flex-shrink-0">
  {/* Logo */}
  <div className="hidden lg:flex items-center">
    <Link to="/">
      <Logo w="120px" h="25px" />
    </Link>
  </div>

  {/* Common Links */}
  <div className="lg:flex gap-5 hidden items-center flex-shrink-0">
    <div className="flex gap-2 items-center flex-shrink-0">
      <CategoryDropdown />
    </div>
    <div className="flex">
      <p className="text-[14px] font-semibold text-white whitespace-nowrap">Sell on Wifmart</p>
    </div>
  </div>
</div>

{/* Search Bar */}
{!hideSearchBar && (
  <div className="lg:flex w-[500px] ml-4 hidden flex-shrink-0 ">
    <div className="inline-flex px-3 border bg-white border-gray-400 rounded-l-md items-center 
    w-[35vw] min-w-[300px]">
      <GrSearch className="text-gray-500" />
      <input
        type="text"
        className="w-full text-[12px] font-normal outline-none bg-inherit pl-3"
        placeholder="Search products, brands and categories"
        onChange={handleSearch}
        value={search}
      />
    </div>
    <button className="bg-yellow-500 text-[12px] shadow-lg ml-[-2px] text-black py-2 px-4 font-semibold rounded-r-md">
      {/* Search  */}
      <GrSearch className="text-black text-lg" />

    </button>
  </div>
)}

{/* Right Section - User Menu and Links */}
<div className="lg:flex hidden items-center flex-shrink-0">
  {/* User Menu */}
  <div className="relative  flex justify-center">
    {user?._id && (
      <div
        className="text-3xl cursor-pointer flex justify-center user-menu"
        onClick={() => setMenuDisplay((prev) => !prev)}
      >
        {user?.profilePic ? (
          <img
            src={user?.profilePic}
            className="w-10 h-10 rounded-full"
            alt={user?.name}
          />
        ) : (
          <div className="flex gap-2 items-center">
            {/* <img src={icon} alt="" className="w-5 text-black" /> */}
            <FaRegCircleUser className="text-2xl text-white" />
            <p className="text-[14px] text-white font-semibold whitespace-nowrap">Hi, {user?.email?.split('@')[0]}</p>
          </div>
        )}
      </div>
    )}

    {menuDisplay && (
      <div className="absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg z-40 rounded w-40">
        <nav className="flex flex-col gap-2">
          {user?.role === ROLE.ADMIN && (
            <Link
              to="/admin-panel/all-products"
              className="whitespace-nowrap text-[14px] font-normal hover:bg-gray-100 p-2 rounded"
              onClick={() => setMenuDisplay(false)}
            >
              Admin Panel
            </Link>
          )}
          {user?.role === ROLE.HR && (
            <Link
              to="/hr-panel"
              className="whitespace-nowrap hover:bg-gray-100 p-2 rounded text-[14px] font-normal"
              onClick={() => setMenuDisplay(false)}
            >
              HR Panel
            </Link>
          )}
          {user?.role === ROLE.LOGISTICS_ASSOCIATE && (
            <Link
              to="/la-panel"
              className="whitespace-nowrap text-[14px] font-normal hover:bg-gray-100 p-2 rounded"
              onClick={() => setMenuDisplay(false)}
            >
              Logistics Panel
            </Link>
          )}
          <Link
            to="/payondeliveryorder"
            className="whitespace-nowrap hover:bg-gray-100 p-2 rounded text-[14px] font-normal"
            onClick={() => setMenuDisplay(false)}
          >
            Orders
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuDisplay(false);
            }}
            className="whitespace-nowrap hover:bg-gray-100 p-2 text-[14px] font-normal rounded text-left"
          >
            Logout
          </button>
        </nav>
      </div>
    )}
  </div>

  {/* Cart and Support Links */}
  {user?._id ? (
    <div className="flex items-center gap-6">
      <Link to="/cart" className="text-2xl flex relative">
        <div className="flex items-center gap-2">
          <PiShoppingCartSimpleBold className="text-2xl " />
          <p className="font-semibold text-[14px] text-white whitespace-nowrap">My Cart</p>
        </div>
        <div className="bg-yellow-500 rounded-full text-black w-3 h-3 p-2 flex items-center justify-center 
        absolute -top-1 -right-3">
          <p className="text-sm">{context?.cartProductCount}</p>
        </div>
      </Link>
      <Link to="/support" className="flex items-center gap-1">
        <MdOutlineContactSupport className="text-2xl text-white" />
        <p className="font-semibold text-[14px] text-white whitespace-nowrap">Support</p>
      </Link>
    </div>
  ) : (
    <div className="lg:flex hidden items-center gap-5">
      <Link to="/login" className="flex items-center gap-2">
      {/* <img src={icon} alt="" className="w-5 text-black" />
       */}
            <FaRegCircleUser className="text-2xl" />

        <p className="text-[14px] font-semibold text-white whitespace-nowrap">Account</p>
      </Link>
      <Link to="/support" className="flex items-center gap-1">
        <MdOutlineContactSupport className="text-2xl" />
        <p className="text-[14px] font-medium text-white whitespace-nowrap">Support</p>
      </Link>
      <Link to="/cart" className="flex items-center gap-1">
        <PiShoppingCartSimpleBold className="text-2xl " />
        <p className="text-[14px] font-medium text-white whitespace-nowrap">My Cart</p>
      </Link>
      <Link
        to="/login"
        className="px-6 py-3 rounded-md text-black hover:bg-yellow-500 bg-yellow-500 font-semibold p-3 text-[12px]"
      >
        Login
      </Link>
    </div>
  )}
</div>
</div>


      {/* mobile */}

          <div className="flex-col pt-4 pb-3 lg:hidden">
              
          <div className="flex px-4 justify-between pb-2 lg:hidden items-center">
  {/* Logo */}
  <div className=" lg:hidden  ml-[-5px]">
    <Link to="/" className="">
      <Logo w="120px" h="20px" />
    </Link>
  </div>

  {/* Icons: Profile, Cart, and Hamburger */}
  <div className="flex lg:hidden items-center gap-6">
    {/* Profile Icon */}
    <div className="relative flex items-center justify-center">
      <div
        className="text-3xl cursor-pointer flex justify-center user-menu"
        onClick={() => setMenuDisplay((prev) => !prev)}
      >
        {user?._id ? (
          user?.profilePic ? (
            <img
              src={user?.profilePic}
              className="rounded-full w-6 h-6 object-cover"
              alt={user?.name}
            />
          ) : (
            // <img src={icon} alt="" className="w-4 text-black" />
            <FaRegCircleUser className="text-2xl text-white" />

          )
        ) : (
          <Link to="/login">
            {/* <img src={icon} alt="" className="w-4 text-black" /> */}
            <FaRegCircleUser className="text-2xl text-white" />

          </Link>
        )}
      </div>

     {/* Profile Menu Dropdown */}
{menuDisplay && user?._id && (
  <div className="absolute lg:hidden bg-white bottom-0 top-11 h-fit p-4 shadow-lg z-40 rounded w-40">
    <nav className="flex flex-col gap-2">
      <p
        className="truncate hover:bg-gray-100 p-2 rounded"
        title={user?.email} // Shows full email on hover
      >
        Hi, {user?.email?.split("@")[0]}
      </p>
      {user?.role === ROLE.ADMIN && (
        <Link
          to="/admin-panel/all-products"
          className="whitespace-nowrap hover:bg-gray-100 p-2 rounded"
          onClick={() => setMenuDisplay(false)}
        >
          Admin Panel
        </Link>
      )}
      {user?.role === ROLE.HR && (
        <Link
          to="/hr-panel"
          className="whitespace-nowrap hover:bg-gray-100 p-2 rounded"
          onClick={() => setMenuDisplay(false)}
        >
          HR Panel
        </Link>
      )}
      {user?.role === ROLE.LOGISTICS_ASSOCIATE && (
        <Link
          to="/la-panel"
          className="whitespace-nowrap hover:bg-gray-100 p-2 rounded"
          onClick={() => setMenuDisplay(false)}
        >
          Logistics Panel
        </Link>
      )}
      <Link
        to="/payondeliveryorder"
        className="whitespace-nowrap hover:bg-gray-100 p-2 rounded"
        onClick={() => setMenuDisplay(false)}
      >
        Orders
      </Link>
      <button
        onClick={() => {
          handleLogout();
          setMenuDisplay(false);
        }}
        className="whitespace-nowrap hover:bg-gray-100 p-2 rounded text-left"
      >
        Logout
      </button>
    </nav>
  </div>
)}

    </div>

    {/* Cart Icon */}
    <Link to="/cart" className="relative flex items-center">
      <div className="flex items-center gap-2">
        <PiShoppingCartSimpleBold className="text-2xl text-white" />
      </div>
      {user?._id && (
        <div className="bg-[#ffc518] absolute top-[-4px] right-[-5px] rounded-full text-black w-3 h-3 flex items-center justify-center shadow-sm">
          <p className="text-[10px] shadow-sm">{context?.cartProductCount}</p>
        </div>
      )}
    </Link>

    {/* Hamburger Menu */}
    <GiHamburgerMenu
      onClick={() => setHambugDrop(!hambugDrop)}
      className="lg:hidden flex text-md cursor-pointer text-white text-2xl"
    />
  </div>
</div>

     

      {!hideSearchBar && (
        <div className="flex w-full px-4 text-[12px] lg:hidden items-center">
          <input
            type="text"
            placeholder="Search products, brands and categories here..."
            className="w-full outline-none border rounded-md py-1 px-4 focus-within:shadow-md"
            onChange={handleSearch}
            value={search}
          />
        </div>
      )}


      {/* hamburger menu */}
      <div className={`bg-white left-0 top-0 mb-16 bottom-0 h-[100vh] absolute font-semibold overflow-hidden 
      transition-transform duration-300 
          ${hambugDrop ? 'w-[100vw]' : 'w-0'}`}>

        {/* logo and cross */}
        <div className="flex justify-between items-center px-2 w-full bg-gray-900 h-[70px]">
          <div className='flex items-center '>
            <Link to="/" onClick={() => setHambugDrop(false)}>
            <Logo w="100px" h="20px" />

            </Link>
          </div>
          <div>
            <RxCross1 onClick={() => setHambugDrop(false)} className='text-xl text-white cursor-pointer ' />
          </div>
        </div>



        {/* Menu Items */}
        <div className='px-2 pt-4 font-normal overflow-y-auto h-[calc(100vh-64px)]'>
          {/* These items should stack vertically */}
          <div className='flex flex-col w-full justify-center'>
               
          <div className='text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-2
                       cursor-pointer'>
    {user ? (
      // Logout button when user is logged in
      <div
        onClick={() => {
          handleLogout();
          setHambugDrop(false); // Close dropdown after logging out
        }}
        className=' 
         text-gray-500  rounded w-[90vw] px'
      >
        Logout
      </div>
    ) : (
      // Login button when user is not logged in
      <Link to="/login">
        <div
          onClick={() => setHambugDrop(false)} // Close dropdown after clicking login
          className=' 
           text-gray-500 rounded  w-[90vw] px'
        >
          Login &gt; &gt;
        </div>
      </Link>
    )}
  </div>
          
            <hr className='border-none h-[0.5px] w-full mb-2 bg-gray-200' />
            <div className='flex justify-between px-2 items-center py-2'>
                <p className='text-gray-600 text-[14px]'>OUR CATEGORIES</p>
            </div>
            <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-2   cursor-pointer"
                    >
                      <IoPhonePortraitSharp className="text-xl" />
                    <p>Phone and Tablet</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-2   cursor-pointer"
                    >
                      <FiTv className="text-xl" />
                    <p>Appliances</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-2   cursor-pointer"
                    >
                      <FiTv className="text-xl" />
                    <p>Electronics</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-2   cursor-pointer"
                    >
                      <CiApple className="text-xl" />
                    <p>Supermarket</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-2   cursor-pointer"
                    >
                      <GiLipstick className="text-xl" />
                    <p>Health & Beauty</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-2   cursor-pointer"
                    >
                      <MdOutlineHomeWork className="text-xl" />
                    <p>Home & Office</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-2   cursor-pointer"
                    >
                      <CiHome className="text-xl" />
                    <p>Power</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-2   cursor-pointer"
                    >
                      <LuTicket className="text-xl" />
                    <p>Computing</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-2   cursor-pointer"
                    >
                      <GiClothes className="text-xl" />
                    <p>Women's Fashion</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 pb-10 font-normal hover:font-semibold flex 
                    items-center gap-2  py-5 px-2   cursor-pointer"
                    >
                      <GiClothes className="text-xl" />
                    <p>Men's Fashion</p>
                 </NavLink>

              </div>   
        
        </div>
      

      </div>
        </div>

    </header>
  );
};

export default Header;