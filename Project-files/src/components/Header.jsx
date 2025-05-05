import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../content/navigation";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchInput(query.replace(/%20/g, " "));
  }, [location.search]);

  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      navigate(`/search?q=${searchInput.trim()}`);
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black/50 z-40">
      <div className="container mx-auto px-2 flex items-center h-full">
        <Link to={"/"}>
          <img src={logo} alt="Logo" width={120} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav) => (
            <div key={nav.label}>
              <NavLink
                to={nav.href}
                className={({ isActive }) =>
                  `px-2 hover:text-neutral-100 ${
                    isActive ? "text-neutral-100" : ""
                  }`
                }
              >
                {nav.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="ml-auto flex gap-4 items-center">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            {showSearch && (
              <input
                ref={searchRef}
                type="text"
                placeholder="Search..."
                className="bg-transparent border-b border-white text-white px-4 py-2 outline-none transition-all duration-300 w-48"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
            )}
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)} // ⬅️ إظهار/إخفاء البحث
              className="cursor-pointer text-2xl text-white"
            >
              <IoSearchOutline />
            </button>
          </form>

          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer transition-all active:scale-75">
            <img src={userIcon} alt="User Icon" className="w-full h-full" />
          </div>
        </div>
      </div>
    </header>
  );
};
