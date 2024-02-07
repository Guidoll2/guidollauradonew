import Image from "next/image";

export default function Home() {
   return (
         
      <div className="flex grid grid-cols-1 h-screen w-screen bg-orange-100" id="">
      
      <a href="/"><Image src="/flecha.png" width={1000} height={1000} alt="flechaico" className="w-10 animate-[bounce_2s_ease-in-out_infinite] absolute bottom-0 right-1 z-[100]"></Image></a>
      
      <h3 className="text-4xl text-center font-extrabold uppercase bg-gradient-to-tl from-blue-800 via-cyan-400 to-blue-800 text-transparent p-2 bg-clip-text md:text-6xl">Premium Website</h3>
      
            <div className="flex grid grid-cols-1 w-auto m-10 md:m-20 md:-translate-y-20 -translate-y-10  bg-gradient-to-tl from-gray-900 via-gray-600 to-gray-600 rounded-[5px]">
            
              <ul className="p-5">
              
                  <h3 className='flex items-center gap-4 p-2 text-gray-300 text-2xl md:text-3xl'>What&apos;s included?</h3> 
                  <li className="text-l text-white p-2 md:text-xl text-gray-300">Design and develop.</li>
                  <li className="text-l text-white p-2 md:text-xl text-gray-300">IA designed logo. </li>
                  <li className="text-l text-white p-2 md:text-xl text-gray-300">Host and domain* (1 year runs on domains.com). </li>
                  <li className="text-l text-white p-2 md:text-xl text-gray-300">Link with social media. </li>
                  <li className="text-l text-white p-2 md:text-xl text-gray-300">Link with contact options.</li>
                  <li className="text-l text-white p-2 md:text-xl text-gray-300">Up to 10 sections.</li> 
                  <li className="text-l text-white p-2 md:text-xl text-gray-300">Payments options</li>
                  <li className="text-l text-white p-2 md:text-xl text-gray-300">Bookins systems</li>
                  <li className="text-l text-white p-2 md:text-xl text-gray-300">Chatbot and other IA APIS</li>
                  <li className="flex items-center justify-center text-xl p-4 md:text-3xl gap-2 text-gray-300 text-center bg-gradient-to-bl from-blue-800 to-cyan-400 text-transparent bg-clip-text animate-[pulse_2s_ease-in-out_infinite] ">
                  <a href="https://calendly.com/guido-llaurado/appointment-for-landinpage"  target='_blank'><Image src="/calendario.png" width={1000} height={1000} className="w-12 p-1 md:w-16" alt="calendarIcon" /></a>
                  Free appointment
                  </li>
                  </ul>
              </div>
      
      
     
              
      
      </div>
      
      
      
        );
      }
  


