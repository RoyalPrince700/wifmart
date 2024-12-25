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
import { RiShoppingCartLine } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";
import CategoryDropdown from './CategoryList';





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
  const [exploreMobDrop,setExploreMobDrop] = useState(false)
  const [degreeMobDrop,setDegreeMobDrop] = useState(false)
  const [certMobDrop,setCertMobDrop] = useState(false)
  const [dataMobDrop,setDataMobDrop] = useState(false)
  const [businessMobDrop,setBusinessMobDrop] = useState(false)
  const [compMobDrop,setCompMobDrop] = useState(false)
  const [infoMobDrop,setInfoMobDrop] = useState(false)
  const [langMobDrop,setLangMobDrop] = useState(false)
  const [healthMobDrop,setHealthMobDrop] = useState(false)
  const [personalMobDrop,setPersonalMobDrop] = useState(false)
  const [phyMobDrop,setPhyMobDrop] = useState(false)
  const [socMobDrop,setSocMobDrop] = useState(false)
  const [artMobDrop,setArtMobDrop] = useState(false)
  const [mathMobDrop,setMathMobDrop] = useState(false)




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
    <header className="w-full  fixed top-0 bg-white shadow-md z-40 flex md:py-4 lg:px-4 sm:py-3 flex-col">
            <div className="px-2 sm:px-6 flex items-center justify-between sm:py-4">

          <div className="flex items-center gap-5">
   {/* Logo and Hamburger Menu */}
   <div className="hidden md:flex items-center ">
          <Link to="/">
            <Logo w="150px" h="30px" />
          </Link>
        </div>

         {/* Common Links */}
                <div className="lg:flex gap-5 hidden items-center">
                  <div className="flex gap-2 items-center">
                    <CategoryDropdown />
                         {/* Other navbar items */}
                  </div>
                  <div className="flex">
                    <p className="font-semibold">Sell on Wifmart</p>
                  </div>
                </div>

          </div>
     
         {/* Search Bar */}
               {!hideSearchBar && (
                 <div className="lg:flex w-[500px] gap-1  hidden">
                   <div className="inline-flex py-2 px-3 border border-gray-400 rounded-md items-center w-[35vw]">
                     <GrSearch className="text-gray-500" />
                     <input
                       type="text"
                       className="w-full font-semibold outline-none bg-inherit pl-3"
                       placeholder="Search products, brands and categories"
                       onChange={handleSearch}
                       value={search}
                     />
                   </div>
                   <button className="bg-yellow-600 shadow-lg text-white py-2 px-6 font-semibold rounded-md">
                     SEARCH
                   </button>
                 </div>
               )}

<div className="lg:flex hidden items-center gap-7">
  <div className="relative flex justify-center">
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
            <FaRegCircleUser className="text-2xl" />
            <p className="font-semibold text-[18px]">Hi, {user?.email?.split('@')[0]}</p>
            {/* Extracts and displays only the part before @ */}
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

  {user?._id && (
    <div className="flex items-center gap-6">
      <Link to="/cart" className="text-2xl flex relative">
        <div className="flex items-center gap-2">
          <RiShoppingCartLine className="text-2xl" />
          <p className="font-semibold text-[18px]">My Cart</p>
        </div>

        <div className="bg-yellow-600 rounded-full text-white w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3">
          <p className="text-sm">{context?.cartProductCount}</p>
        </div>
      </Link>
      <Link to="/support" className="flex items-center gap-1">
        <MdOutlineContactSupport className="text-2xl" />
        <p className="font-semibold">Support </p>
      </Link>
    </div>
  )}

  {!user?._id && (
    <div className="lg:flex hidden items-center gap-5">
      <Link to="/account" className="flex items-center gap-1">
        <FaRegCircleUser className="text-2xl" />
        <p className="font-semibold">Account</p>
      </Link>
      <Link to="/support" className="flex items-center gap-1">
        <MdOutlineContactSupport className="text-2xl" />
        <p className="font-semibold">Support</p>
      </Link>
      <Link to="/cart" className="flex items-center gap-1">
        <RiShoppingCartLine className="text-2xl" />
        <p className="font-semibold">My Cart</p>
      </Link>
      <Link
        to="/login"
        className="px-2 py-1 rounded-md text-white hover:bg-yellow-700 bg-yellow-600 p-3"
      >
        Login
      </Link>
    </div>
  )}
 

</div>

      </div>

      {/* mobile */}

          <div className="flex-col pt-4 pb-2 md:hidden">
              
           <div className="flex px-4 justify-between md:hidden pb-3 items-center">
                  {/* Logo and Hamburger Menu */}
                  <div className="flex md:hidden items-center  gap-1 sm:gap-6">
                    
                <RxHamburgerMenu onClick={() => setHambugDrop(!hambugDrop)} className='lg:hidden flex text-md cursor-pointer' />
                  <Link to="/" className="">
                    <Logo w="130px" h="20px" />
                  </Link>
                </div>

                <div className="flex lg:hidden items-center gap-3">
          <div className="relative flex justify-center">
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
                  
                    <div className="flex gap-1 items-center">
                    <FaRegCircleUser className="text-xl" />
                    <p className="font-semibold text-[10px]">Hi, {user?.email?.split('@')[0]}</p>
                    {/* Extracts and displays only the part before @ */}
                  </div>
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute lg:hidden bg-white bottom-0 top-11 h-fit p-4 shadow-lg z-40 rounded w-40">
                 <nav className="flex  flex-col gap-2">
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

          {user?._id && (
            <div className="flex items-center gap-6">
                  <Link to="/cart" className="text-2xl flex relative">
                  <div className="flex items-center gap-2">
                  <RiShoppingCartLine className="text-xl" />
                  </div>
                  
                  <div className="bg-yellow-600 rounded-full text-white w-3 h-3 p-1 flex items-center 
                  justify-center absolute -top-1 -right-2">
                    <p className="text-[10px]">{context?.cartProductCount}</p>
                  </div>
                </Link>
               
            </div>
          
            
          )}

          {!user?._id && (
            <div className="flex lg:hidden items-center gap-5">
               <Link to="/" className="flex items-center gap-1">
                              <FaRegCircleUser className="text-xl" />
                            </Link>
              <Link to="/cart" className="flex items-center gap-1">
                              <RiShoppingCartLine className="text-xl" />
                            </Link>
            </div>
            
          )}
        </div>








                {/* <div className="flex items-center gap-6">
                <MdOutlineContactSupport className="text-xl text-gray-600 lg:hidden" />
                <RiShoppingCartLine className="text-xl text-gray-600 lg:hidden" />
                </div> */}
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
        <div>
          <div className='flex items-center justify-center pt-6'>
            <Link to="/" onClick={() => setHambugDrop(false)}>
            <Logo w="100px" h="25px" />

            </Link>
          </div>
          <div>
            <RxCross1 onClick={() => setHambugDrop(false)} className='text-xl cursor-pointer absolute right-3 top-5' />
          </div>
          <hr className='border-none w-full h-[0.5px] bg-gray-300 mt-5' />
        </div>



        {/* Menu Items */}
        <div className='px-6 pt-4 font-normal overflow-y-auto h-[calc(100vh-64px)]'>
          {/* These items should stack vertically */}
          <div className='flex flex-col w-full justify-center'>
                <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center 
                    gap-2  py-5 px-5 hover:bg-yellow-600 hover:text-white cursor-pointer"
                    >
                      <FaRegCircleUser className="text-xl" />
                    <p>Account</p>
                 </NavLink>

                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-5
                     hover:bg-yellow-600 hover:text-white cursor-pointer"
                    >
                      <MdOutlineContactSupport className="text-xl" />
                    <p>Support</p>
                 </NavLink>

                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-5 hover:bg-yellow-600 hover:text-white cursor-pointer"
                    >
                      <RiShoppingCartLine className="text-xl" />
                    <p>My Cart</p>
                 </NavLink>
                 
            <hr className='border-none h-[0.5px] w-full mb-2 bg-gray-200' />
            <div className='flex justify-between px-5 items-center py-2'>
                <p className='text-gray-600 text-[14px]'>OUR CATEGORIES</p>
                <p className='text-yellow-500'>See All</p>
            </div>
            <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-5 hover:bg-yellow-600 hover:text-white cursor-pointer"
                    >
                      <IoPhonePortraitSharp className="text-xl" />
                    <p>Phone and Tablet</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-5 hover:bg-yellow-600 hover:text-white cursor-pointer"
                    >
                      <FiTv className="text-xl" />
                    <p>Appliances</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-5 hover:bg-yellow-600 hover:text-white cursor-pointer"
                    >
                      <FiTv className="text-xl" />
                    <p>Electronics</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-5 hover:bg-yellow-600 hover:text-white cursor-pointer"
                    >
                      <CiApple className="text-xl" />
                    <p>Supermarket</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-5 hover:bg-yellow-600 hover:text-white cursor-pointer"
                    >
                      <GiLipstick className="text-xl" />
                    <p>Health & Beauty</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-5 hover:bg-yellow-600 hover:text-white cursor-pointer"
                    >
                      <MdOutlineHomeWork className="text-xl" />
                    <p>Home & Office</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-5 hover:bg-yellow-600 hover:text-white cursor-pointer"
                    >
                      <CiHome className="text-xl" />
                    <p>Power</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-5 hover:bg-yellow-600 hover:text-white cursor-pointer"
                    >
                      <LuTicket className="text-xl" />
                    <p>Computing</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 font-normal hover:font-semibold flex items-center gap-2  py-5 px-5 hover:bg-yellow-600 hover:text-white cursor-pointer"
                    >
                      <GiClothes className="text-xl" />
                    <p>Women's Fashion</p>
                 </NavLink>
                 <NavLink
                    to="/" onClick={() => setMobileVisible(false)} // Close dropdown on click
                    className="text-gray-500 pb-48 font-normal hover:font-semibold flex 
                    items-center gap-2  py-5 px-5 hover:bg-yellow-600 hover:text-white cursor-pointer"
                    >
                      <GiClothes className="text-xl" />
                    <p>Men's Fashion</p>
                 </NavLink>

              </div>   
        
        </div>
            <div className='bottom-0 absolute bg-yellow-100 shadow-2xl  w-full h-36'>
              <div className='flex flex-col gap-3 items-center my-4'>
              <button 
              onClick={() => window.location.href = '/login'} className='bg-yellow-600 border hover:border-yellow-600 hover:text-yellow-600 hover:bg-yellow-100 text-white py-3 rounded mx-4 w-[90vw] px'
            >  Log In </button>

            <button
            onClick={() => window.location.href = '/singup'}
            className='bg-inherit border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white py-3 rounded  mx-4  w-[90vw] px'>Sign Up </button>

              </div>
          
            </div>


      </div>
        </div>

    </header>
  );
};

export default Header;