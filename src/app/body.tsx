import Image from "next/image";

const Body = () => {
    return (

        <div className="flex grid grid-cols-1 w-screen h-screen">
                   
          
        <h1 className="flex items-center h-screen -translate-y-10 text-5xl text-center font-extrabold uppercase bg-gradient-to-tl from-blue-800 via-cyan-400 to-blue-800 text-transparent bg-clip-text md:text-8xl  md:indent-5">I create your website to help you achieve your goals.</h1>

          
        <div id="containeroptions" className="flex grid grid-cols-1 p-8 md:grid md:grid-cols-3 md:p-0 gap-8 bg-gradient-to-tr from-gray-500 to-gray-600">

         <div className="relative group p-10 order-2" id="containerlanding">
           
           <h3 className="text-3xl text-center text-gray-200 p-2 md:text-4xl">Landing Page</h3>
         
        <ul className="flex grid grid-cols-1 p-10 rounded-[5px] list-disc bg-gradient-to-tl from-blue-600 via-sky-600 to-blue-300">
        
            <h3 className='flex items-center gap-4 p-2 text-gray-900 text-2xl md:text-3xl font-bold'>From $150</h3> 
            <li className="text-l text-white p-2 md:text-xl text-gray-900">Designed to capture the visitor attention and turn them into a customer.</li>
            <li className="text-l text-white p-2 md:text-xl text-gray-900">Ideal complement for campaigns on Google Ads and social media. </li>
            <li className="text-l text-white p-2 md:text-xl text-gray-900">IA designed logo, host and domain* included. </li>

            <a href="landing" target='_blank'> <button className="absolute bottom-4 md:bottom-24 left-1/2 transform -translate-x-1/2 text-xl bg-gray-200 px-4 py-2 rounded-full text-black z-10 border-[1px] border-gray-400 md:text-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"><span className="text-gray-700 ">More details</span></button></a>
        </ul>
        </div>

     
        <div className="relative group p-10 order-1" id="containerwebbasic">
           <h3 className="text-3xl text-center text-gray-200 p-2 md:text-4xl">Basic Website</h3>
         
        <ul className="flex grid grid-cols-1 p-10 rounded-[5px] z-0 list-disc bg-gradient-to-tl from-blue-600 via-sky-600 to-blue-300">
        
            <h3 className='flex items-center gap-4 p-2 text-gray-900 text-2xl md:text-3xl font-bold'>From $250</h3> 
            <li className="text-l text-white p-2 md:text-xl text-gray-300">Enjoy an attractive and functional web presence.</li>
            <li className="text-l text-white p-2 md:text-xl text-gray-300">Includes a professional design, optimized for mobile devices. </li>
            <li className="text-l text-white p-2 md:text-xl text-gray-300">8 Sections, host and domain* included. </li>

            <a href="basic" target='_blank'> <button className="absolute bottom-4 md:bottom-32 left-1/2 transform -translate-x-1/2 text-xl bg-gray-200 px-4 py-2 rounded-full text-black z-10 border-[1px] border-gray-400 md:text-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"><span className="text-gray-700 ">More details</span></button></a>
        </ul>
        </div>

       <div className="relative group p-10 order-3" id="containerwebpremium">           
           <h3 className="text-3xl text-center text-gray-200 p-2 md:text-4xl">Premium Website</h3>
         
        <ul className="flex grid grid-cols-1 p-10 rounded-[5px] z-0 list-disc bg-gradient-to-tl from-blue-600 via-sky-600 to-blue-300">
        
            <h3 className='flex items-center gap-4 p-2 text-gray-900 text-2xl md:text-3xl font-bold'>From $500</h3> 
            <li className="text-l text-white p-2 md:text-xl text-gray-300">Website with customized features, such as online payment options, booking systems, real-time chat, among many other functionalities.</li>
            <li className="text-l text-white p-2 md:text-xl text-gray-300">Includes a professional design, optimized for mobile devices. </li>
            <li className="text-l text-white p-2 md:text-xl text-gray-300">8 Sections, host and domain* included. </li>

        <a href="premium" target='_blank'> <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl bg-gray-200 px-4 py-2 rounded-full text-black z-10 border-[1px] border-gray-400 md:text-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"><span className="text-gray-700">More details</span></button></a>
        </ul>
        </div>
</div>

<div id="containercs" className="flex grid grid-cols-1 md:grid-cols-1 bg-gradient-to-br from-blue-950 via-sky-600 to-blue-600 border-t-[2px] border-blue-900">

<div className="relative flex flex-col justify-center mx-auto md:w-1/2 mt-10 md:mt-20 items-center" id="containercontact">

<h3 className="flex text-3xl text-center text-gray-200 p-2 md:text-4xl">Contact me:</h3>
    
        <ul className="flex grid grid-cols-1 p-10 border-[1px] rounded-[5px] z-0 bg-gradient-to-br from-gray-900 via-gray-500 to-gray-700 gap-2">
        
        <li className='flex items-center gap-4 p-2 animate-[pulse_3s_ease-in-out_infinite]  mb-4'>
        <Image src="/calendario.png" width={1000} height={1000} alt="calendarico" className="w-8"/>
        <a href="https://calendly.com/guido-llaurado/appointment-for-landinpage"  target='_blank' className="text-gray-200 text-2xl md:text-3xl">Free appointment.</a>
        </li>  

        
        <li className='flex items-center justify-start gap-4 p-2'>
        <Image src="/gmaili.png" width={1000} height={1000} alt="mailico" className="w-8"/>
        <a href="mailto:guido.llaurado@gmail.com"  target='_blank' className="text-gray-200 text-2xl md:text-2xl">
         Email</a>    
        </li>
          
        
        
        <li className='flex items-center gap-4 p-2 '>
        <Image src="/phonei.png" width={1000} height={1000} alt="phoneico" className="w-8"/>
        <a className="flex items-center text-gray-200 text-2xl md:text-2xl" href='https://wa.me/+' target='_blank'>
        Whatsapp</a>
        </li>

       
        <li className='flex justify-start items-center gap-4 p-2'>
        <Image src="/igblack.png" width={1000} height={1000} alt="instagramico" className="w-8"/>
        <a href="https://www.instagram.com/guidollaurado/"  target='_blank' className="text-gray-200 text-2xl md:text-2xl">
        Instagram.</a>
        </li>  
        
        </ul>
        </div>

 

<div className="relative mx-auto p-5 group" id="containerportfolio">
           
           <h3 className="text-3xl text-center text-gray-200 p-2 md:text-4xl">My work:</h3>
         
        <ul className="md:h-full flex grid grid-cols-1 p-10 border-[1px] rounded-[10px] z-0 list-disc bg-gradient-to-br from-gray-900 via-gray-500 to-gray-700">
        
            <li className='flex items-center gap-4 p-2 text-gray-200 text-l md:text-2xl'>Basic web for electronic security company:</li> 
            <a href="https://www.alarmascmm.com/" target="_blank"><h3 className="text-l text-center text-white p-2 md:text-xl text-gray-300">www.alarmascmm.com</h3></a>
    
        </ul>
        </div>
        
           
        <div id="containerfeatures" className="p-5">
           <h3 className="text-3xl text-center text-gray-200 md:text-4xl md:mt-10">Features:</h3>
         
        <ul className="md:h-full flex grid grid-cols-1 p-10 rounded-[10px] z-0 bg-gradient-to-br from-gray-900 via-gray-500 to-gray-700">
            
            
            <li className='flex items-center p-4 gap-4 text-gray-200 text-xl md:text-2xl'>
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


<footer className="flex flex-col items-center p-5 bg-gradient-to-tl from-orange-100 via-orange-100 to-orange-200  text-center">
    <h1 className="text-xl text-gray-900 md:text-3xl font-bold">Guido Llaurado</h1>
    <p className="text-sm md:text-lg text-gray-900">
        Design and Development | All rights reserved | Built with Tailwind CSS 
    </p>
    
    <div className="flex flex-col items-center mt-4">
        <p className="p-4 text-gray-900">
            Open to new opportunities. Ready to contribute to your team or company.
        </p>
        <a href="mailto:guido.llaurado@gmail.com">
            <Image className="w-8" src="/gmaili.png" width={1000} height={1000} alt="gmailicon" />
        </a>
    </div>
</footer>



        </div>
    )



}

export default Body;