'use client'
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNav = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const menu = document.getElementById('MENUDESPLEGABLE');
            const button = document.getElementById('BOTONMENU');

            if (
                menuOpen &&
                menu &&
                button &&
                !(menu.contains(event.target as Node) || button.contains(event.target as Node))
            ) {
                closeMenu();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpen]);

    return (



<nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-700 to-blue-400 bg-opacity-95 backdrop-blur-md shadow-lg z-50">
  <div className="flex items-center justify-between px-4 py-3">
    {/* Logo o nombre */}
    <a href="#" className="text-white font-bold text-xl tracking-wide">Guido Llaurado</a>
    {/* Botón menú */}
    <button
      onClick={handleNav}
      id="BOTONMENU"
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      className="flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 transition z-[90]"
    >
      {menuOpen ? (
        <FaTimes className="text-2xl text-white transition" />
      ) : (
        <FaBars className="text-2xl text-white transition" />
      )}
    </button>
  </div>

<div
    className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-[49] ${
      menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    }`}
    onClick={closeMenu}
    aria-hidden="true"
  />

  {/* Menú desplegable */}
  <div
    className={`absolute top-0 left-0 w-full bg-gradient-to-br from-blue-600 to-orange-200 rounded-b-3xl shadow-2xl transition-transform duration-500 z-[100] ${
      menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    }`}
    style={{ transitionProperty: "transform, opacity" }}
  >
    <div
      id="MENUDESPLEGABLE"
      className="flex flex-col items-center py-8 space-y-6"
      role="menu"
    >
      <a href="#lite" className="text-blue-900 text-lg font-semibold hover:text-orange-600 transition" role="menuitem">
        Lite website
      </a>
      <a href="#premium" className="text-blue-900 text-lg font-semibold hover:text-orange-600 transition" role="menuitem">
        Premium website
      </a>
      <a
        href="#containercontact"
        className="text-orange-600 text-lg font-bold animate-pulse"
        role="menuitem"
      >
        Contact
      </a>
    </div>
  </div>
</nav>

);
}


export default Navbar;         
