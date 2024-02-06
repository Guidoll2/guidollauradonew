export default function Home() {
    return (


      <div className="flex grid grid-cols-1 h-screen w-screen bg-gray-200" id="">

            <h3 className="text-4xl text-center font-extrabold uppercase bg-gradient-to-br from-green-400 via-sky-600 to-blue-300 dark:bg-gradient-to-r from-blue-400 via-green-200 to-purple-900 text-transparent bg-clip-text p-2 md:text-4xl">Premium web:</h3>

          <ul className="flex grid grid-cols-1 p-10 z-0 list-disc bg-gradient-to-br from-blue-600 via-sky-600 to-blue-300 md:h-full">
          <a href="/"><img src="home.png" className="w-10 absolute right-5"></img></a>
              <h3 className='flex items-center gap-4 p-2 text-gray-900 text-2xl md:text-3xl'>What's included?</h3> 
              <li className="text-l text-white p-2 md:text-xl text-gray-300">Design and develop.</li>
              <li className="text-l text-white p-2 md:text-xl text-gray-300">IA designed logo. </li>
              <li className="text-l text-white p-2 md:text-xl text-gray-300">Host and domain* (1 year runs on domains.com). </li>
              <li className="text-l text-white p-2 md:text-xl text-gray-300">Link with social media. </li>
              <li className="text-l text-white p-2 md:text-xl text-gray-300">Link with contact options. (Email, phonecall, appointments) </li>
              <li className="text-l text-white p-2 md:text-xl text-gray-300">Up to 10 sections.</li>
              <li className="text-l text-white p-2 md:text-xl text-gray-300">Payments options</li>
              <li className="text-l text-white p-2 md:text-xl text-gray-300">Bookins systems</li>
              <li className="text-l text-white p-2 md:text-xl text-gray-300">Chatbot and other IA APIS</li>

          <div className="flex items-center justify-center py-8 animate-[pulse_2s_ease-in-out_infinite]">
          <img src="calendario.png" className="w-10 p-1 md:w-10  " alt="calendarIcon" />
          <a href="https://calendly.com/guido-llaurado/appointment-for-landinpage"  target='_blank' className="text-gray-900 text-2xl md:text-3xl">Book a free appointment</a>
          </div>


          </ul>
          </div>






    );
  }