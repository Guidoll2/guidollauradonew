'use client'

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';


const Navbar = () => {

const [menuOpen, setMenuOpen] = useState (false)

    const handleNav = () => {
        setMenuOpen(!menuOpen);

    } 

    return (



<nav className='flex grid grid-cols-1 w-full '> 



<button onClick={handleNav} id="BOTONMENU" className="absolute top-6 right-4 cursor-pointer hover:opacity-30 hover:animate-bounce">

  <div className="bar w-7 h-0.5 mb-1 mt-1 bg-purple-900 md:w-10 md:mr-5 dark:bg-purple-200"></div>
  <div className="bar w-7 h-0.5 mb-1 mt-1 bg-purple-900 md:w-10 md:mr-5 dark:bg-purple-200"></div> 
  <div className="bar w-7 h-0.5 mb-1 mt-1 bg-purple-900 md:w-10 md:mr-5 dark:bg-purple-200"></div>
  </button>

<div className={
menuOpen
? 'absolute top-0 left-0 w-screen bg-gray-400 transition ease-in-out delay-150 duration-300 z-[100]'
: 'absolute top-[-100%] h-screen w-full left-0 transition ease-in-out delay-150 duration-300 '
}>


<div onClick={handleNav} className='absolute cursor-pointer right-0 top-0'>
<h1 className='mr-2 text-2xl text-gray-200 md:mr-10 md:text-2xl font-light z-[100]'>x</h1>
</div>

<div id='MENUDESPLEGABLE' className='flex grid grid-cols-1 p-6 text-center'>


<img src='Ialogo3.png' className='absolute opacity-90 bottom-1 left-0 rounded-r-[100px] w-36 h-36'></img>

<h1 className='text-l absolute -translate-x-2 translate-y-20 text-gray-300 shadow-xl md:text-xl'>GuidoLl</h1>

<a href="landing" target='_blank'>     
<p className='text-end text-l text-blue-800 -translate-x-5 md:-translate-x-20 md:text-l text-gray-100'>Landing page</p></a>
<a href="basicweb" target='_blank'>
<p className='text-end text-l text-blue-800 -translate-x-5 md:-translate-x-20 md:text-l text-gray-100'>Basic web</p></a>           
<a href="premiumweb" target='_blank'>
<p className='text-end text-l text-blue-800 -translate-x-5 md:-translate-x-20 md:text-l text-gray-100'>Premium web</p>
</a>

<a href='#containercontact'> 

<p className='text-blue-800 text-l text-end -translate-x-5 md:-translate-x-20 md:text-2xl text-gray-200 animate-[pulse_2s_ease-in-out_infinite] '>Contact</p>
</a>

</div>




</div>
</nav>

);
}


export default Navbar;         
