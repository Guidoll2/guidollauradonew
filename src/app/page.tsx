
import Body from "./body";
import Flechaup from "./flechaup";
import Navbar from "./navbar";


export default function Home() {
  return (
    <main className="flex grid grid-cols-1">


     <div className="fixed top-0 h-screen w-screen -z-[100] bg-gradient-to-bl from-gray-400 via-gray-200 to-gray-100"></div>

      <div>
        <Flechaup />
      </div>

      <div id="nav" className="flex bg-transparent">
        <Navbar />
      </div>

      <div className="flex mt-5">
        <Body />
      </div>

    </main>
  );
}