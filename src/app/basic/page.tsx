import Image from "next/image";

export default function Home() {
    return (
     
      <div className="flex grid grid-cols-1 h-screen w-screen bg-gradient-to-tl from-orange-400 to-orange-300" id="">
  
  <a href="/"><Image src="/flecha.png" width={1000} height={1000} alt="flechaico" className="w-10 animate-[bounce_2s_ease-in-out_infinite] absolute bottom-0 right-1 z-[100]"></Image></a>
  
  
        <div className="flex grid grid-cols-1 w-auto m-10 bg-gradient-to-tl from-gray-900 via-gray-600 to-gray-600 rounded-[5px]">
        
          <ul className="text-center">
          <p className="text-4xl text-center font-extrabold uppercase bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-transparent p-2 bg-clip-text md:text-6xl">Basic <span className="text-gray-200">Website</span></p>
      
          <p className='text-center gap-4 p-2 text-gray-300 text-3xl md:text-3xl'>What&apos;s included?</p>  
              <li className="text-l text-white p-2 md:text-xl text-gray-300">Design and develop</li>
              <li className="text-l text-white p-2 md:text-xl text-gray-300">IA designed logo </li>
              <li className="text-l text-white p-2 md:text-xl text-gray-300">Host and domain* (1 year runs on domains.com). </li>
              <li className="text-l text-white p-2 md:text-xl text-gray-300">Link with social media </li>
              <li className="text-l text-white p-2 md:text-xl text-gray-300">Link with contact options. (Email, phonecall, appointments) </li>
              <li className="text-l text-white p-2 md:text-xl text-gray-300">Up to 8 sections. Navbar and footer</li> 
              <li className="flex items-center justify-center text-xl p-8 md:text-3xl gap-2 text-gray-300 text-center bg-gradient-to-bl from-blue-800 to-cyan-400 text-transparent bg-clip-text animate-[pulse_2s_ease-in-out_infinite] ">
              <a href="https://calendly.com/guido-llaurado/appointment-for-landinpage"  target='_blank'><Image src="/calendario.png" height={1000} width={1000} className="w-12 p-1 md:w-16" alt="calendarIcon" /></a>
              Free appointment
              </li>
              </ul>
          </div>
  
  
 
          
  
  </div>
  
  
  
    );
  }