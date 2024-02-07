
import Body from "./body";
import Flechaup from "./flechaup";
import Navbar from "./navbar";


export default function Home() {
  return (

   

      <main className="flex grid grid-cols-1 bg-gradient-to-tl from-orange-100 via-orange-100 to-orange-200">

        <div>
          <Flechaup />
        </div>

        <div className="flex mt-5">
          <Body />
        </div>

      </main>
  );
}