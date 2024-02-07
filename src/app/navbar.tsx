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

<h1 className='text-l p-5 font-bold bg-gradient-to-tr from-blue-800 via-cyan-400 to-blue-800 text-transparent bg-clip-text md:text-xl'>GuidoLl</h1>


<button onClick={handleNav} id="BOTONMENU" className="absolute top-6 right-4 cursor-pointer hover:opacity-30 hover:animate-bounce z-">

  <div className="bar w-7 h-0.5 mb-1 mt-1 bg-cyan-600 md:w-10 md:mr-5"></div>
  <div className="bar w-7 h-0.5 mb-1 mt-1 bg-cyan-600 md:w-10 md:mr-5"></div> 
  <div className="bar w-7 h-0.5 mb-1 mt-1 bg-cyan-600 md:w-10 md:mr-5"></div>
  </button>

<div className={
menuOpen
? 'absolute top-0 left-0 w-screen bg-gray-700 transition ease-in-out delay-150 duration-300 '
: 'absolute top-[-100%] h-screen w-full left-0 transition ease-in-out delay-150 duration-300 '
}>


<div onClick={handleNav} className='absolute cursor-pointer right-0 top-0'>
<h1 className='mr-2 text-2xl text-gray-200 md:mr-10 md:text-2xl font-light z-[100]'>x</h1>
</div>

<div id='MENUDESPLEGABLE' className='flex grid grid-cols-1 p-6 text-center'>




<a href="landing" target='_blank'>     
<p className='text-start text-l text-blue-800 md:text-l text-gray-200'>Landing page</p></a>
<a href="basic" target='_blank'>
<p className='text-start text-l text-blue-800 md:text-l text-gray-200'>Basic web</p></a>           
<a href="premium" target='_blank'>
<p className='text-start text-l text-blue-800 md:text-l text-gray-200'>Premium web</p>
</a>

<a href='#containercontact'> 

<p className='text-blue-800 text-l text-start  md:text-2xl text-cyan-400 animate-[pulse_2s_ease-in-out_infinite] '>Contact</p>
</a>

</div>




</div>
</nav>

);
}


export default Navbar;         
