import Image from "next/image";
import Navbar from "./navbar";
import React from "react";
import ServiciosContainer from "./services";
import ServiciosContainer2 from "./services2";


   

const Body = () => {
    return (
             
    <div className="flex grid grid-cols-1 bg-gray-900 ">


        <div id="nav" className="z-[100]">
        <Navbar></Navbar>
        </div>

         <div className="md:hidden h-screen bg-gradient-to-br from-orange-200 to-orange-100">
                  

                <div id="smhero" className="flex grid grid-cols-1 items-center justify-center md:grid-cols-2">

                <div className="mt-14 p-5">              
                <h1 className="text-center uppercase bg-gradient-to-br from-sky-600 to-blue-800 text-transparent bg-clip-text text-4xl">Do what you love</h1> {/**I craft your website to help you achieve your goals. */}
                
                <video 
    className="absolute inset-0 w-screen h-screen object-cover" 
    autoPlay 
    muted 
    loop
    playsInline 
    >
    
    <source 
    src="/Hobbies.mp4" 
    type="video/mp4" />

    </video>
                </div>            
                <p className="text-xl text-center uppercase bg-gradient-to-tl from-gray-600 to-blue-700 text-transparent bg-clip-text -translate-y-14">I craft your website for you</p>
                <p className="text-s text-center bg-gradient-to-tl from-gray-600 to-blue-700 text-transparent bg-clip-text -translate-y-14 md:order-">(It&apos;s what I love)</p>
                </div>
                
                </div>


                <div id='mdhero' className="hidden md:flex h-screen bg-gradient-to-br from-orange-200 to-orange-100">
                  

                  <div id="containerhero" className="flex grid grid-cols-2 items-center justify-center gap-2">
  
                  <div className="flex grid grid-cols-1 space-y-5">              
                  <h1 className="text-7xl text-center uppercase bg-gradient-to-br from-sky-600 to-blue-800 text-transparent bg-clip-text">Do what you love</h1> {/**I craft your website to help you achieve your goals. */}
                            
                  <p className="text-4xl text-center uppercase  bg-gradient-to-tl from-gray-600 to-blue-700 text-transparent bg-clip-text">I craft your website for you</p>
                  <p className="text-2xl text-center bg-gradient-to-tl from-gray-600 to-blue-700 text-transparent bg-clip-text">(It&apos;s what I love)</p>
                  </div>
                  <Image src="/trailp.gif" priority={true} width={1000} height={1000} alt="trailroadpicture" className="flex rounded-[60px] -translate-y-5 opacity-70 p-8" />
                
                  </div>
                  
                  </div>

                
               
              
            <div className="flex grid md:grid-cols-1">
<div>
                <p className="flex text-gray-200 items-center justify-center p-4 text-5xl md:text-7xl mt-5">Services</p></div>
                
                <div className="flex grid grid-cols-1 md:grid-cols-2">
                <div id='lite' className="p-2 ">
                    <ServiciosContainer></ServiciosContainer>
                </div>

                <div id="premium"  className="p-2 mb-10">
                    <ServiciosContainer2></ServiciosContainer2>
                </div>
                </div></div>
                
                <div id="containercs" className="flex grid grid-cols-1 md:grid-cols-2 bg-gradient-to-tr from-blue-950 p-10">


                    <div className="flex flex-col w-full justify-center mx-auto md:w-1/2 mt-10 items-center" id="containercontact">
                       
                       <p className="text-gray-200 text-4xl md:text-5xl mb-2 mx-auto">Contact:</p>
                       
                       <ul className="flex grid grid-cols-1 p-10 w-full rounded-[5px] z-0 bg-gradient-to-tl from-gray-900 to-blue-950 gap-2">
                       <li className='flex items-center gap-4 p-2 animate-[pulse_2s_ease-in-out_infinite]  mb-4'>
      <a href="https://calendly.com/guido-llaurado/appointment-for-landinpage" target='_blank' className="">
        <div className="flex items-center gap-2">
          <Image src="/calendariogray200.png" width={1000} height={1000} alt="calendarico" className="w-8" />
          <li className="bg-gradient-to-tl from-blue-600 to-cyan-400 text-transparent bg-clip-text text-xl font-bold md:text-xl">Free appointment</li>
        </div>
      </a>
    </li>

                            <li className='flex items-center justify-start gap-4 p-2 mb-4'>
                                <Image src="/mailgray200bold.png" width={1000} height={1000} alt="mailico" className="w-8" />
                                <a href="mailto:guido.llaurado@gmail.com" target='_blank' className="text-gray-200 text-l md:text-2xl">
                                    Email</a>
                            </li>



                            <li className='flex items-center gap-4 p-2 mb-4'>
                                <Image src="/wpgray200.png" width={1000} height={1000} alt="phoneico" className="w-8" />
                                <a className="flex items-center text-gray-200 text-l md:text-2xl" href='https://wa.me/15109600432' target='_blank'>
                                 Whatsapp</a>
                            </li>


                            <li className='flex justify-start items-center gap-4 p-2 mb-4'>
                                <Image src="/instagramgray200.png" width={1000} height={1000} alt="instagramico" className="w-8" />
                                <a href="https://www.instagram.com/guidollaurado/" target='_blank' className="text-gray-200 text-l md:text-2xl">
                                    Instagram</a>
                            </li>

                        </ul>
                    </div>



                    <div className="flex flex-col w-full justify-center mx-auto md:w-1/2 mt-10 items-center" id="containerportfolio">

                    <p className="text-gray-200 text-4xl md:text-5xl mb-2 mx-auto">My work</p>

                        <ul className="flex grid grid-cols-1 p-10 w-full rounded-[5px] z-0 bg-gradient-to-tl from-gray-900 to-blue-950 gap-2">
                        <li className='text-center p-2 text-gray-200 text-2xl md:text-2xl'><span className="bg-gradient-to-br from-cyan-500 via-cyan-400 to-blue-600 text-transparent bg-clip-text">Lite website</span></li>
                            <a href="https://www.pidosoporte.com/" target="_blank"><p className="text-l text-center text-white p-2 md:text-xl text-gray-200 underline">www.pidosoporte.com</p></a>

                            <li className='text-center p-2 text-gray-200 text-2xl md:text-2xl'><span className="bg-gradient-to-br from-cyan-500 via-cyan-400 to-blue-600 text-transparent bg-clip-text">Premium website</span></li>
                            <a href="https://www.alarmascmm.com/" target="_blank"><p className="text-l text-center text-white p-2 md:text-xl text-gray-200 underline">www.alarmascmm.com</p></a>
                          
                        </ul>
                    </div>
                    


                </div>

                
                <div id="containerfeatures" className="flex flex-col mx-auto mt-5 w-full md:w-1/2 p-2 group mb-24">
                        

                        <ul className="md:h-full flex grid grid-cols-1 p-5 w-full rounded-[5px] z-0 bg-gradient-to-tl from-gray-900 to-blue-950">
                        <p className="text-4xl text-center bg-gradient-to-br from-cyan-500 via-cyan-400 to-blue-600 text-transparent bg-clip-text md:text-5xl md:mt-10 ">Features:</p>

                            <li className='flex items-center p-4 gap-4 text-gray-200 text-l md:text-2xl '>
                                <Image src="/next-js.svg" width={1000} height={1000} alt="next-jsico" className="w-14 bg-white rounded-full p-0.5"></Image>
                                High-performance technology
                            </li>

                            <li className="text-l text-white p-2 md:text-xl">I develop websites carried out using Next.js.</li>
                            <li className="text-l text-white p-2 md:text-xl">That&apos;s mean customized and highly efficient web solutions, superior performance and a more optimized user experience compared to conventional solutions.</li>
                            <li className="text-l text-white p-2 md:text-xl">It&apos;s harder than pre-tailored web development, but it&apos;s worth the effort.</li>

                            <li className='flex items-center p-4 gap-4 text-gray-200 text-xl md:text-2xl'>
                                <Image src="/vercel.svg" width={1000} height={1000} alt="vercelico" className="w-14 bg-white rounded-full p-2 "></Image>
                                Vercel deploy (The cherry on top!)
                            </li>

                            <li className="text-l text-white p-2 md:text-xl">Create it to work with Nextjs, Vercel provides a fast and efficient deployment enviroment.</li>
                            <li className="text-l text-white p-2 md:text-xl">The automatic manage of SSL encryption and threat protection makes your websites always guarded against potential risks.  </li>
                            <li className="text-l text-white p-2 md:text-xl"> </li>
                        </ul>
                        
<div className="flex flex-col items-center p-2 mt-5">
  <p className="text-center text-xl md:text-4xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 text-transparent bg-clip-text">Ready to start?</p>
  
  <a href='https://wa.me/+15109600432' target='_blank' > 
  <button className="bg-gradient-to-l w-fit from-blue-950 to-blue-900 text-white rounded-3xl p-2 mt-1 text-l md:text-xl mt-5">
    Contact me
  </button></a>
</div>  



                    </div>


                <footer className="flex flex-col items-center p-5 bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-600 text-center">
                    <h1 className="text-xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text  md:text-3xl font-bold">Guido Llaurado</h1>
                    <p className="text-sm md:text-lg text-gray-200">
                        Design and Development | All rights reserved | Built with <span className="bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-transparent bg-clip-text">Tailwind CSS</span>
                    </p>

                    <div className="flex flex-col items-center mt-4">
                        <p className="p-4 text-gray-200">
                            Open to new opportunities. Ready to contribute to your team or company.
                        </p>
                        <a href="mailto:guido.llaurado@gmail.com">
                            <Image className="w-8" src="/mailgray200.png" width={1000} height={1000} alt="gmailicon" />
                        </a>
                       
                        <a href="https://www.flaticon.es/iconos-gratis/instagram" title="iconos" className="mt-5 text-gray-200">Icons created by Freepik - Flaticon</a>

                    </div>
                </footer>
                

                
            </div>
    )



}

export default Body;