'use client'

import React from 'react';
import { useState } from 'react';


const Navbar = () => {

const [menuOpen, setMenuOpen] = useState (false)

    const handleNav = () => {
        setMenuOpen(!menuOpen);

    } 

    return (



<nav className='flex grid grid-cols-1 w-full '> 

<h1 className='text-l p-5 font-bold bg-gradient-to-tr from-blue-800 via-cyan-400 to-blue-800 text-transparent bg-clip-text md:text-xl'>GuidoLl</h1>


<button onClick={handleNav} id="BOTONMENU" className="absolute top-6 right-4 cursor-pointer">

  <div className="bar w-7 h-0.5 mb-1 mt-1 bg-cyan-600 md:w-10 md:mr-5"></div>
  <div className="bar w-7 h-0.5 mb-1 mt-1 bg-cyan-600 md:w-10 md:mr-5"></div> 
  <div className="bar w-7 h-0.5 mb-1 mt-1 bg-cyan-600 md:w-10 md:mr-5"></div> 
  </button>

<div className={
menuOpen
? 'absolute top-0 left-0 w-screen bg-gradient-to-br from-gray-900 via-gray-600 to-gray-700 transition ease-in-out delay-150 duration-300 '
: 'absolute top-[-100%] h-screen w-full left-0 transition ease-in-out delay-150 duration-300 '
}>


<div onClick={handleNav} className='absolute cursor-pointer right-0 top-0'>
<h1 className='mr-2 text-2xl text-gray-200 md:mr-10 md:text-2xl font-light z-[100]'>x</h1>
</div>

<div id='MENUDESPLEGABLE' className='flex space-x-6 items-center justify-center py-6 ml-4 md:space-x-24'>

  <a href="landing" target='_blank' className='text-gray-200 text-xs md:text-lg'>
    <p>Landing page</p>
  </a>

  <a href="basic" target='_blank' className='text-gray-200 text-xs md:text-lg'>
    <p>Basic web</p>
  </a>

  <a href="premium" target='_blank' className='text-gray-200 text-xs md:text-lg'>
    <p>Premium web</p>
  </a>

  <a href='#containercontact' className='text-blue-800 text-lg md:text-2xl text-cyan-400 animate-[pulse_2s_ease-in-out_infinite]'>
    <p>Contact</p>
  </a>

</div>

</div>
</nav>

);
}


export default Navbar;         
