'use client'

import React, { useState } from "react";
import Image from "next/image";



const ServiciosContainer = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded); 
  };

  return (
    
    
    <div id="containerservicios" className={`flex flex-col ${expanded ?  'h-auto' : 'h-auto overflow-hidden'}`}>
      
      <div className="flex flex-col bg-pink-100 rounded-r-full w-[75vw] h-[75vw] md:w-[35vw] md:h-[35vw] justify-center items-center hover:w-screen hover:h-[35vw] ease-in-out duration-700">
          
          
           <div className="flex flex-col p-4">
   
    <p className="mt-4 text-pink-100 text-4xl md:text-6xl">Lite Websites</p>
    <p className="mt-4 text-center bg-gradient-to-tr from-blue-800 to-blue-950 text-transparent bg-clip-text text-xl md:text-3xl">From us$90*</p>
    <p className="mt-4 text-center bg-gradient-to-tl from-gray-950 to-blue-950 text-transparent bg-clip-text text-l md:text-2xl">Powerfull, simple & elegant.</p>



        </div>
        <div className="hidden hover:flex hover:flex-col justify-center items-center text-blue-300 hover:text-gray-100">
           <ul className="md:text-xl space-y-4 ">
              <li className="text-start justify-center">Homepage with customizable navbar.</li>
              <li className="text-start justify-center">Links to social media.</li>
              <li className="text-start justify-center">From 2 up to 8 sections.</li>
              <li className="text-start justify-center">Host and domain (1 year).</li>
              <li className="text-start justify-center">Responsive design and development.</li>
              <li className="text-start justify-center">SSL security.</li>
             
            </ul>
           </div>
       
        
        {/*
        {expanded && (
                   
          <div className="flex flex-col mx-auto p-5 bg-orange-400 rounded-full w-[50vw] h-[50vw] -translate-x-24 items-center  bg-gradient-to-tl from-gray-900 to-zinc-700 expandable-container">
            


            <p className="text-4xl mt-4 text-center bg-gradient-to-l from-blue-500 to-blue-400 text-transparent bg-clip-text md:text-5xl">What&apos;s included?</p>
            <ul className="list-disc md:text-xl">
              <li className="text-center text-gray-200 p-5">Homepage with customizable navbar.</li>
              <li className="text-center text-gray-200 p-5">Links to social media.</li>
              <li className="text-center text-gray-200 p-5">From 2 up to 8 sections.</li>
              <li className="text-center text-gray-200 p-5">Host and domain (1 year).</li>
              <li className="text-center text-gray-200 p-5">Responsive design and development.</li>
              <li className="text-center text-gray-200 p-5">SSL security.</li>
             
            </ul>
         
          <div className="flex grid grid-cols-1">
            <a href="https://calendly.com/guido-llaurado/appointment-for-landinpage" className="flex row items-center justify-center"  target='_blank'><Image src="/calendariogray200.png" height={1000} width={1000} className="w-12 p-1 md:w-16 " alt="calendarIcon" />
              <p className="flex items-center justify-center text-xl p-2 md:text-3xl gap-2 text-gray-300 text-center bg-gradient-to-tl from-blue-400 to-blue-500 text-transparent bg-clip-text animate-[pulse_2s_ease-in-out_infinite] ">
               Free appointment.
                  </p></a></div>

<div className="flex justify-center mb-4">        
<button className="bg-gradient-to-l from-blue-500 to-blue-700 text-white rounded-3xl p-0.5 w-fit h-fit">
<a href='https://wa.me/+15109600432' target='_blank' > 
<span className="flex w-full bg-gray-900 text-white rounded-3xl p-2 md:text-2xl">
Connect with me
</span></a>
</button>
</div>

<p className="p-2 text-gray-200 text-[10px] text-center md:text-[15px]">The base cost of US$90 includes a website with 2 sections. Each additional section incurs an extra charge of $10*</p>
          


          </div> 

          
        )}*/}

            </div> 
           
          

    </div>

    
  );
};

export default ServiciosContainer;