'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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



<nav className='flex grid grid-cols-1 w-full '> 



<button onClick={handleNav} id="BOTONMENU" className="absolute top-6 right-4 cursor-pointer z-[90]">

  <div className="bar w-7 h-0.5 mb-1 mt-1 bg-cyan-600 md:w-10 md:mr-5"></div>
  <div className="bar w-7 h-0.5 mb-1 mt-1 bg-cyan-600 md:w-10 md:mr-5"></div> 
  <div className="bar w-7 h-0.5 mb-1 mt-1 bg-cyan-600 md:w-10 md:mr-5"></div> 
  </button>

<div className={
menuOpen
? 'absolute top-0 left-0 w-screen bg-gradient-to-br from-gray-900 via-gray-600 to-gray-700 transition ease-in-out delay-150 duration-300 z-[100]'
: 'absolute top-[-100%] h-screen w-full left-0 transition ease-in-out delay-150 duration-300 '
}>



<div id='MENUDESPLEGABLE' className='flex space-x-6  justify-center h-16 py-6 md:py-3 ml-10 md:space-x-24'>

  <a href="landing" className='text-gray-200 text-xs md:text-lg'>
    <p>Landing page</p>
  </a>

  <a href="basic" className='text-gray-200 text-xs md:text-lg'>
    <p>Basic web</p>
  </a>

  <a href="premium"  className='text-gray-200 text-xs md:text-lg'>
    <p>Premium web</p>
  </a>

  <a href='#containercontact' className='text-blue-800 text-xs md:text-lg text-cyan-400 animate-[pulse_2s_ease-in-out_infinite]'>
    <p>Contact</p>
  </a>

</div>

</div>
</nav>

);
}


export default Navbar;         
