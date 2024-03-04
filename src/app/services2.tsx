'use client'

import React, { useState } from "react";
import Image from "next/image";



const ServiciosContainer2 = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded); 
  };

  return (
    
    
    <div id="containerservicios" className={`relative ${expanded ?  'h-auto' : 'h-auto overflow-hidden'}`}>
    <div className="flex flex-col justify-center items-center p-5 bg-orange-400 rounded-xl">
    <div className="flex grid grid-cols-1">

    </div>

      <div className="flex flex-col items-center md:gap-8 p-5 -translate-y-5 md:flex-row md:items-start md:justify-center">


<div className="flex flex-col items-center">
  
  
  <p className="mt-4 text-center bg-gradient-to-l  from-gray-950 to-blue-950 text-transparent bg-clip-text text-4xl md:text-6xl">Premium Websites</p>
  <p className="mt-4 text-center bg-gradient-to-tr from-blue-800 to-blue-950 text-transparent bg-clip-text text-xl md:text-3xl">From us$300*</p>
  <p className="mt-4 text-center bg-gradient-to-tl from-gray-950 to-blue-950 text-transparent bg-clip-text text-l md:text-2xl">Complete, functional & escalable</p>

</div>

      </div>

      {expanded && (
        
        
        <div className="rounded-l w-full bg-gradient-to-tl from-gray-900 to-zinc-700 flex grid grid-cols-1 md:grid-cols-1 items-center gap-5 md:gap-20 md:p-10 md:flex-row md:items-start md:justify-center expandable-container">
          


          <p className="text-4xl mt-4 text-center bg-gradient-to-l from-blue-500 to-blue-400 text-transparent bg-clip-text md:text-5xl">What´s included?</p>
          <ul className="list-disc md:text-xl">
          <li className="text-center text-gray-200 p-5">Connection with social platforms.</li>
              <li className="text-center text-gray-200 p-5">Search engine optimization (SEO).</li>
              <li className="text-center text-gray-200 p-5">Scalable sites.</li>
              <li className="text-center text-gray-200 p-5">Host and domain (1 year).</li>
              <li className="text-center text-gray-200 p-5">Customized functions like, databases, integrated payment system and more.</li>
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

        
      )}

      <button
        onClick={handleExpandClick}
        className="bg-gradient-to-l from-blue-950 to-blue-900 text-white rounded-3xl p-0.5 mt-2"
      >
        <span className="flex w-full text-gray-300 rounded-3xl p-1 md:text-l text-xs md:text-2xl">
          {expanded ? "Close" : "More info"}
        </span>
      </button>
    </div>
  </div>
  );
};


export default ServiciosContainer2;