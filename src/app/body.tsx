import Image from "next/image";
import Navbar from "./navbar";

const Body = () => {
    return (
             
    <div className="flex grid grid-cols-1 h-screen">


        <div id="nav" className="z-[100]">
        <Navbar></Navbar>
        </div>

         <div className="h-screen bg-gradient-to-tl from-orange-400 to-orange-300">
                <h1 className="flex items-center h-4/5 -translate-y-10 text-5xl text-center font-extrabold uppercase bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-transparent bg-clip-text md:text-8xl md:indent-5 md:mt-10">I craft your website to help you achieve your goals.</h1>
                </div>


 <div id="containeroptions" className="flex grid grid-cols-1 md:grid-cols-2 md:py-5 bg-gradient-to-br from-gray-900 via-gray-600 to-gray-700">

<div className="flex grid grid-cols-1">
      <p className="text-5xl z-10 md:translate-x-15 text-center font-bold mt-5 bg-gradient-to-br from-cyan-500 via-cyan-400 to-blue-600 text-transparent bg-clip-text md:text-8xl">Services</p>
    </div>
       
                    <div className="relative group p-10 " id="containerlanding">                        
                        <ul className="flex grid grid-cols-1 p-10 rounded-[5px] list-disc bg-gradient-to-tl from-orange-400 to-orange-300 shadow-xl">
                        <div className="text-center">
                        <p className="text-4xl text-gray-900 font-bold p-2 md:text-4xl hidden md:block"><span className="bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-transparent bg-clip-text">Landing</span> Page</p>
    
    <p className="text-4xl text-gray-900 font-bold p-2 md:hidden">
    <span className="block bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-transparent bg-clip-text">Landing</span>
    <span className="block">Page</span>
    </p>
</div>

                            <p className='flex items-center gap-4 p-2 text-gray-900 text-2xl md:text-2xl font-bold'>From $150</p>
                            <li className="text-xl p-2 md:text-xl text-gray-900">Designed to capture the visitor attention and turn them into a customer.</li>
                            <li className="text-xl p-2 md:text-xl text-gray-900">Ideal complement for campaigns on Google Ads and social media. </li>
                            <li className="text-xl p-2 md:text-xl text-gray-900">IA designed logo, host and domain* included. </li>

                            <a href="landing"> <button className="absolute bottom-4 md:bottom-4 left-1/2 transform -translate-x-1/2 text-xl bg-gradient-to-br from-gray-900 to-gray-700 px-4 py-2 rounded-full text-black z-10 border-[1px] border-gray-400 md:text-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"><span className="text-gray-200 ">More details</span></button></a>
                        </ul>
                    </div>
                    

                    <div className="relative group p-10 md:order-2 " id="containerwebbasic">
                       

                        <ul className="flex grid grid-cols-1 p-10 rounded-[5px] list-disc md:h-full z-0 bg-gradient-to-tl from-orange-400 to-orange-300">
                        <div className="text-center">
                        <p className="text-4xl text-gray-900 font-bold p-2 md:text-4xl hidden md:block"><span className="bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-transparent bg-clip-text">Basic</span> Website</p>
    
  <p className="text-4xl text-gray-900 font-bold p-2 md:text-4xl md:hidden">
    <span className="block bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-transparent bg-clip-text">Basic</span>
    <span className="block">Website</span>
  </p>
</div>
                            <p className='flex items-center gap-4 p-2 text-gray-900 text-2xl md:text-2xl font-bold'>From $250</p>
                            <li className="text-xl p-2 md:text-xl text-gray-900">Enjoy an attractive and functional web presence.</li>
                            <li className="text-xl p-2 md:text-xl text-gray-900">Includes a professional design, optimized for mobile devices. </li>
                            <li className="text-xl p-2 md:text-xl text-gray-900">8 Sections, host and domain* included. </li>

                            <a href="basic" > <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl bg-gradient-to-br from-gray-900 to-gray-700 px-4 py-2 rounded-full text-black z-10 border-[1px] border-gray-400 md:text-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"><span className="text-gray-200 ">More details</span></button></a>
                        </ul>
                    </div>

                    <div className="relative group p-10" id="containerwebpremium">
             

                        <ul className="flex grid grid-cols-1 p-10 rounded-[5px] z-0 list-disc bg-gradient-to-tl from-orange-400 to-orange-300">
                        <p className="text-4xl text-center text-gray-900 font-bold p-2 md:text-4xl"><span className="bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-transparent bg-clip-text">Premium</span> Website</p>
                            <p className='flex items-center gap-4 p-2 text-gray-900 text-2xl md:text-2xl font-bold'>From $500</p>
                            <li className="text-xl p-2 md:text-xl text-gray-900">Website with customized features, such as online payment options, booking systems, real-time chat, among many other functionalities.</li>
                            <li className="text-xl p-2 md:text-xl text-gray-900">Includes a professional design, optimized for mobile devices. </li>
                            <li className="text-xl p-2 md:text-xl text-gray-900">8 Sections, host and domain* included. </li>

                            <a href="premium"> <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl bg-gradient-to-br from-gray-900 to-gray-700 px-4 py-2 rounded-full text-black z-10 border-[1px] border-gray-400 md:text-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"><span className="text-gray-200">More details</span></button></a>
                        </ul>
                    </div>
                </div>  

                <div id="containercs" className="flex grid grid-cols-1 md:grid-cols-1 bg-gradient-to-tl from-orange-400 to-orange-300 border-t-[2px] border-blue-900">


                    <div className="relative flex flex-col w-full justify-center mx-auto md:w-1/2 mt-10 md:mt-20 items-center p-2 " id="containercontact">

                  

                        <ul className="flex grid grid-cols-1 p-10 w-full rounded-[5px] z-0 bg-gradient-to-tl from-gray-900 via-gray-600 to-gray-600 gap-2">
                        <p className="text-4xl text-center text-gray-200 p-2 md:text-5xl">Contact me</p>
                            <li className='flex items-center justify-center gap-4 p-2 animate-[pulse_2s_ease-in-out_infinite]  mb-4'>
                                <Image src="/calendariogray200.png" width={1000} height={1000} alt="calendarico" className="w-8" />
                                <a href="https://calendly.com/guido-llaurado/appointment-for-landinpage" target='_blank' className="bg-gradient-to-tl from-blue-600 to-cyan-400 text-transparent bg-clip-text text-4xl font-bold md:text-5xl">Free appointment</a>
                            </li>


                            <li className='flex items-center justify-start gap-4 p-2 mb-4'>
                                <Image src="/mailgray200bold.png" width={1000} height={1000} alt="mailico" className="w-8" />
                                <a href="mailto:guido.llaurado@gmail.com" target='_blank' className="text-gray-200 text-2xl md:text-2xl">
                                    Email</a>
                            </li>



                            <li className='flex items-center gap-4 p-2 mb-4'>
                                <Image src="/wpgray200.png" width={1000} height={1000} alt="phoneico" className="w-8" />
                                <a className="flex items-center text-gray-200 text-2xl md:text-2xl" href='https://wa.me/15109600432' target='_blank'>
                                 Whatsapp</a>
                            </li>


                            <li className='flex justify-start items-center gap-4 p-2 mb-4'>
                                <Image src="/instagramgray200.png" width={1000} height={1000} alt="instagramico" className="w-8" />
                                <a href="https://www.instagram.com/guidollaurado/" target='_blank' className="text-gray-200 text-2xl md:text-2xl">
                                    Instagram</a>
                            </li>

                        </ul>
                    </div>



                    <div className="relative mx-auto w-full md:w-1/2 p-2 group mb-5" id="containerportfolio">

         

                        <ul className="md:h-full flex grid grid-cols-1 p-4 w-full rounded-[5px] w-full z-0 bg-gradient-to-tl from-gray-900 via-gray-600 to-gray-600">
                        <p className="text-3xl text-center text-gray-200 p-2 md:text-4xl">My work</p>
                            <li className='text-center p-2 text-gray-200 text-l md:text-2xl'><span className="bg-gradient-to-br from-cyan-500 via-cyan-400 to-blue-600 text-transparent bg-clip-text">Basic web</span> for electronic security company:</li>
                            <a href="https://www.alarmascmm.com/" target="_blank"><p className="text-l text-center text-white p-2 md:text-xl text-gray-300">www.alarmascmm.com</p></a>

                        </ul>
                    </div>


                    <div id="containerfeatures" className="relative mx-auto w-full md:w-1/2 p-2 group mb-24">
                        

                        <ul className="md:h-full flex grid grid-cols-1 p-5 w-full rounded-[5px] z-0 bg-gradient-to-tl from-gray-900 via-gray-600 to-gray-600">
                        <p className="text-5xl text-center text-gray-200 md:text-4xl md:mt-10 ">Features:</p>

                            <li className='dropdown-item flex items-center p-4 gap-4 text-gray-200 text-xl md:text-2xl'>
                                <Image src="/star.png" width={1000} height={1000} alt="starico" className="w-6"></Image>
                                Your project, my sole priority:</li>

                            <li className="text-l text-white p-2 md:text-xl text-gray-300">Websites tailored to your specific needs.</li>
                            <li className="text-l text-white p-2 md:text-xl text-gray-300">Responsive design.</li>
                            <li className="text-l text-white p-2 md:text-xl text-gray-300">User experience improved.</li>
                            <li className="text-l text-white p-2 md:text-xl text-gray-300">SEO positioning.</li>

                            <li className='flex items-center p-4 gap-4 text-gray-200 text-xl md:text-2xl '>
                                <Image src="/next-js.svg" width={1000} height={1000} alt="next-jsico" className="w-6"></Image>
                                High-performance technology
                            </li>

                            <li className="text-l text-white p-2 md:text-xl">Design of websites carried out using Next.js</li>
                            <li className="text-l text-white p-2 md:text-xl">Customized and highly efficient web solutions.</li>
                            <li className="text-l text-white p-2 md:text-xl">Superior performance and a more optimized user experience compared to conventional solutions. </li>

                            <li className='flex items-center p-4 gap-4 text-gray-200 text-xl md:text-2xl'>
                                <Image src="/vercel.svg" width={1000} height={1000} alt="vercelico" className="w-6"></Image>
                                Vercel deploy
                            </li>

                            <li className="text-l text-white p-2 md:text-xl">Fast and efficient deployments.</li>
                            <li className="text-l text-white p-2 md:text-xl">Automatic SSL encryption and threat protection. </li>
                            <li className="text-l text-white p-2 md:text-xl">Websites always guarded against potential risks. </li>

                        </ul>
                    </div>
                </div>


                <footer className="flex flex-col items-center p-5 bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-600  text-center">
                    <h1 className="text-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-transparent bg-clip-text  md:text-3xl font-bold">Guido Llaurado</h1>
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