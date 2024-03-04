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



<button onClick={handleNav} id="BOTONMENU" className="absolute top-0.5 right-0.5 cursor-pointer z-[90]">

  <div className="w-3 h-3 md:w-8 md:h-8 rounded-bl-full bg-gradient-to-br from-sky-600 to-blue-800 "></div>

 
  </button>

<div className={
menuOpen
? 'absolute top-0 left-0 w-screen bg-gradient-to-br from-gray-900 via-gray-600 to-gray-700 transition ease-in-out delay-150 duration-300 z-[100]'
: 'absolute top-[-100%] h-screen w-full left-0 transition ease-in-out delay-150 duration-300 '
}>



<div id='MENUDESPLEGABLE' className='flex space-x-6 justify-center items-center h-16 md:py-3 md:space-x-24'>

  <a href="#lite" className='text-gray-200 text-xs md:text-lg'>
    <p>Lite website</p>
  </a>

  <a href="#premium"  className='text-gray-200 text-xs md:text-lg'>
    <p>Premium website</p>
  </a>

  <a href='#containercontact' className='text-blue-800 text-xs md:text-lg text-blue-400 animate-[pulse_2s_ease-in-out_infinite]'>
    <p>Contact</p>
  </a>

</div>

</div>
</nav>

);
}


export default Navbar;         
