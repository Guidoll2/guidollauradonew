'use client';

import Flechaup from "./flechaup";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ServiciosContainer from "./services";



export default function Home() {
  const divRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [isVisible, setIsVisible] = useState([false, false, false, false, false]);

  useEffect(() => {
    const handleScroll = () => {
      const newVisibility = divRefs.map((ref) => {
        if (!ref.current) return false;
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight * 1 && rect.bottom >= 0;
      });
      setIsVisible(newVisibility);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial visibility
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
    <main className="flex-grow bg-gradient-to-b from-orange-100 to-pink-100 z-10">
      <Flechaup />
      <video className="invisible md:visible absolute -z-[10] top-24 md:top-0 md:w-4/5 w-screen md:rounded-l-full right-0 opacity-70 md:transform md:translate-x-1/3 md:translate-y-0 translate-y-1/2 mt-0 md:mt-5" autoPlay muted loop playsInline>
        <source src="/Hobbies2.mp4" type="video/mp4" />
      </video>
      
      <div id="nav" className="z-0 flex flex-row justify-end pr-12 gap-8 h-[5px] bg-gradient-to-l from-blue-600 to-blue-300 w-screen hover:h-[4vw] ease-in-out duration-700 hover:items-center hover:text-black text-orange-100 items-start ">
        <div className="absolute  h-1 w-1 bg-gradient-to-br from-orange-300 to-blue-700 to-20% rounded-b-full rounded-l-lg left-0 top-0"></div>
        <a href='#services'>
        <p className="text-extralight ml-2">Services</p></a>
        <Link href="#contact" className="">
        <p className="text-extralight ml-2">Contact</p></Link>
        <Link href="#portfolio">
        <p className="text-extralight ml-2">Portfolio</p></Link>
      </div>

      <div id="HeroMD" className="hidden md:flex flex-cols-1 w-screen z-[10] bg-gray-100 bg-opacity-80 transform md:translate-y-1/2 items-center justify-start p-4 gap-4 z-10 mb-48 md:mt-0 mt-8" >
        
      
        <div>
          <h1 className='text-4xl md:text-8xl text-start font-normal text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-400'>Do what you love</h1>
          <p className="text-xl md:text-4xl ml-2 bg-gradient-to-tl from-gray-800 from-20% to-gray-800 text-transparent bg-clip-text">
            I craft your <span className="text-2xl md:text-6xl font-light bg-gradient-to-tl from-blue-600 text-transparent bg-clip-text">website</span> for you
          </p>
          <p className="text-xl md:text-3xl ml-2 py-2 bg-gradient-to-tl from-gray-800 from-20% to-gray-800 text-transparent bg-clip-text">
            (It&apos;s what I love)
          </p>
        </div>
      </div>

      <div id="Herosm" className="md:hidden flex flex-cols-1 w-screen bg-gray-100 bg-opacity-80 transform md:translate-y-1/2 items-center justify-start  gap-4 z-10 mb-48 md:mt-0 mt-8" >
        <div>
          <h1 className='text-6xl mb-8 mt-8 text-center font-normal text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-400 p-2'>Do what you love</h1>
          
          <video className="w-screen rounded-lg opacity-70" autoPlay muted loop playsInline>
        <source src="/Hobbies2.mp4" type="video/mp4" />
      </video>
          <p className="text-4xl text-center ml-2 m-4 bg-gradient-to-tl from-gray-800 from-20% to-gray-800 text-transparent bg-clip-text">
            I craft your <span className="text-5xl  font-light bg-gradient-to-tl from-blue-600 text-transparent bg-clip-text">website</span> for you
          </p>
          <p className="text-2xl ml-4 py-2 bg-gradient-to-tl from-gray-800 from-20% to-gray-800 text-transparent bg-clip-text">
            (It&apos;s what I love)
          </p>
        </div>
      </div>
    

      <div className="hidden md:flex h-48"></div>


    <div id="Hook1" ref={divRefs[0]} className={`flex shadow-lg bg-gradient-to-tl from-blue-400 to-blue-300 transition-transform duration-[1500ms] ease-in-out transform ${isVisible[3] ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="w-screen md:p-8 flex grid grid-cols-5 items-center justify-center">
        
        <div className="flex flex-col justify-center items-center gap-4">
         <Image className="w-6 md:w-16 hover:w-[6vw] ease-in-out duration-700" src={'/diseño.png'} alt="icon" width={1000} height={1000}></Image>
          <h2 className="text-xs md:text-xl">Design</h2>
        </div>
          
        <div className="flex flex-col justify-center items-center gap-4">
          <Image className="w-6 md:w-16" src={'/tool.png'} alt="icon" width={1000} height={1000}></Image>
            <h2 className="text-xs md:text-xl">Development</h2>
        </div>

        <div className="flex flex-col items-center justify-center rounded-md">
          <p className="text-center text-xs md:text-3xl font-bold md:mb-4">Book an Appointment!</p>
          <Link href='https://calendly.com/guido-llaurado/appointment-for-landinpage' target='_blank'>
            <button className="bg-gray-950 mt-4 text-gray-100 text-xs md:text-xl px-1 md:py-2 md:px-4 rounded hover:bg-orange-400">
            Schedule Now
          </button></Link>
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
         <Image className="w-6 md:w-16" src={'/SEO.png'} alt="icon" width={1000} height={1000}></Image>
          <h2 className="text-xs md:text-xl">SEO Optimization</h2>
        </div>
        
        <div className="flex flex-col justify-center items-center gap-4">
          <Image className="w-6 md:w-16" src={'/nube.png'} alt="icon" width={1000} height={1000}></Image>
          <h2 className="text-xs md:text-xl">Host and domain</h2>
        </div>
        </div>

      <div className="h-24"></div>
      </div>
      
      <div className="h-2" id="services"></div>


      <div ref={divRefs[1]} className={`flex flex-col justify-center transition-transform duration-[2000ms] ease-in-out transform ${isVisible[3] ? 'translate-x-0' : 'translate-x-full'}`}>
      <p className="text-4xl p-12 text-center font-normal text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-blue-700">From a simple landing page or a complex web application, I bring your vision to life to meet your needs.</p>
        
      </div>


  <div ref={divRefs[3]} className={`flex flex-col md:grid md:grid-cols-2 h-fit w-screen justify-center bg-gradient-to-tl from-blue-400 to-blue-300 transition-transform duration-[2000ms] ease-in-out transform ${isVisible[3] ? 'translate-x-0' : 'translate-x-full'}`}>
     

    <div id="premium" className="flex flex-col items-center justify-center">
       <h2 className="p-8 text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-700">Premium websites from $700</h2>
          <p className="text-black text-2xl mb-12">Complete, functional & escalable</p>
        
        <div className="z-[10] flex flex-col mb-12 items-center h-24 w-24 gap-4 bg-orange-100 rounded-full hover:rounded-[1px] hover:w-fit hover:h-fit hover:p-8 ease-in duration-700 text-transparent hover:text-black text-nowrap">
          <p className="text-3xl -translate-y-2 font-extrabold text-black p-3">+</p>
          <p className=" text-l font-bold">Customized functions: E-commerce, Users/Customers portal, Etc</p>
          <p className=" text-l">Homepage and from 1 up to 8 sections</p>
          <p className=" text-l">Responsive Design (Adaptive layout to different screens)</p>
          <p className=" text-l"> </p>
          <p className=" text-l">SEO Optimization & SSL security</p>
          <p className=" text-l">Host and Domain</p>
          <p className=" text-l mb-8">Links to social and contact options</p>

        </div>
    </div>


    <div id="basic" className="flex flex-col items-center justify-center">         
          <h2 className="p-8 text-center text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-700">Basic websites from $500</h2>
          <p className="text-2xl text-black mb-12">Powerfull, simple & elegant.</p>
      
       <div className="z-[10] flex flex-col mb-12 items-center h-24 w-24 gap-4 bg-orange-100 rounded-full hover:rounded-[1px] hover:w-fit hover:h-fit hover:p-8 ease-in duration-700 text-transparent hover:text-black text-nowrap">
          <p className="text-3xl -translate-y-2 font-extrabold text-black p-3">+</p>
          <p className=" text-l">Homepage and from 1 up to 8 sections</p>
          <p className=" text-l">Responsive Design (Adaptive layout to different screens)</p>
          <p className=" text-l"> </p>
          <p className=" text-l">SEO Optimization & SSL security</p>
          <p className=" text-l">Host and Domain</p>
          <p className=" text-l mb-8">Links to social and contact options</p>
       </div>
    </div>

  </div>
      <div className="flex flex-col items-center justify-center rounded-md mt-24 mb-24 w-screen z-[10]">
  <p className="text-black  text-center text-3xl font-bold mb-4 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 text-transparent bg-clip-text">Ready to start?</p>
  <Link href='https://calendly.com/guido-llaurado/appointment-for-landinpage' target='_blank'>
            <button className="bg-gray-950 mt-4 text-gray-100 text-xl  py-2 px-4 rounded hover:bg-orange-400">
            Schedule Now
          </button></Link>
          <p className="text-black  text-center text-3xl font-bold mb-4 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 text-transparent bg-clip-text mt-5">Or keep scroolling to see my work</p>
</div>
<div className="w-screen flex flex-col justify-center items-center animate-bounce">
<Image src={'/flecha-abajo.png'} alt="downarrow" width={1000} height={1000} className="w-12"></Image>
</div>
      
      <div id="portfolio" className="z-[20] flex flex-col bg-gradient-to-tl from-blue-400 to-blue-300 items-center justify-center mt-12 mb-12">
         <p className="text-5xl p-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-700">Portfolio</p> 
          
        <div className="flex grid grid-cols-3 gap-5 mb-12 mt-4 w-fit text-white">
          
          <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-l md:text-2xl text-black">Services provider</p>       
           <Link href="http://www.alarmascmm.com" target="_blank">
           <button className="bg-blue-950 hover:to-green-600 rounded-lg flex flex-col justify-center items-center p-2">alarmascmm.com</button>
           </Link>       
        </div>


        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-l md:text-2xl text-black">IT Company</p>       
           <Link href="http://www.pidosoporte.com" target="_blank">
           <button className="bg-blue-950 hover:to-green-600 rounded-lg flex flex-col justify-center items-center p-2">pidosoporte.com</button>
           </Link>       
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-l md:text-2xl text-black">Proffesional</p>       
           <Link href="https://laureanogh.vercel.app/" target="_blank">
           <button className="bg-blue-950 hover:to-green-600 rounded-lg flex flex-col justify-center items-center p-2">laureanogherardi.org</button>
           </Link>       
        </div>

      </div>
       </div>
  

      <footer id="contact" className="w-full p-5 bg-gradient-to-tl from-blue-400 to-blue-300 text-center text-black">
        <h1 className="text-xl bg-gradient-to-r from-gray-950 to-blue-950 text-transparent bg-clip-text md:text-3xl font-bold">Guido Llaurado</h1>
        <p className="text-sm md:text-lg">
          Design and Development | All rights reserved | Built with <span className="bg-gradient-to-r from-gray-950 to-blue-950 text-transparent bg-clip-text">Tailwind CSS</span>
        </p>

        <div className="flex flex-col items-center mt-4">
          <p className="p-4">
            Open to new opportunities. Ready to contribute to your team or company.
          </p>
          <div className="flex flex-row gap-8">
          <a href="mailto:guido.llaurado@gmail.com">
            <Image className="w-8" src="/mail.png" width={1000} height={1000} alt="gmailicon" />
          </a>
          <a href='https://wa.me/+5492226524466' target='_blank'>
            <Image className="w-8" src="/whatsapp.png" width={1000} height={1000} alt="wpicon" />
          </a>
          <a href="https://www.instagram.com/guidollaurado/" target="_blank">
            <Image className="w-8" src="/instagram.svg" width={1000} height={1000} alt="instagramicon" />
          </a>
          </div>
          <a href="https://www.flaticon.es/iconos-gratis/instagram" title="iconos" className="mt-5">Icons created by Freepik - Flaticon</a>
        </div>
      </footer>
    </main></div>
  );
}
