import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../assets/react.svg";
import { categories } from "../utils/data";
import { AiOutlineLogout } from "react-icons/ai";
import { googleLogout } from "@react-oauth/google";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-gray-800 transiton-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center text-gray-800 px-5 gap-3 font-bold border-r-2 border-black transiton-all duration-200 ease-in-out capitalize";

function Sidebar({ user, closeToggle }) {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    googleLogout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col bg-white h-full min-w-[230px] justify-between">
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} alt="profile-image" className="w-9 rounded" />
          <p className="text-gray-800 text-2xl font-bold">{`Hi, ${user.userName}`}</p>
        </Link>
      )}
      <div className="flex flex-col">
        <div className="flex flex-col gap-5 mt-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl text-gray-800">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                alt="category-image"
                className="w-8 h-8 rounded-full object-cover shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="p-5 font-bold">
        <button
          type="button"
          className=" flex items-center gap-2 w-full justify-center bg-white p-2 rounded-full cursor-pointer outline-none shadow-md hover:shadow-lg"
          onClick={logout}
        >
          <AiOutlineLogout fontSize={15} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
