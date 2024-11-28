import Image from "next/image";
import Link from "next/link";

function Icons() {
  return (
    <div className="w-screen  md:p-8 flex grid grid-cols-5 items-center justify-center grow-from-center bg-gradient-to-tl from-blue-400 to-blue-300 ">
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          className="w-6 md:w-16 hover:w-[6vw] ease-in-out duration-700"
          src={"/diseño.png"}
          alt="icon"
          width={1000}
          height={1000}
        ></Image>
        <h2 className="text-xs md:text-xl">Design</h2>
      </div>

      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          className="w-6 md:w-16 hover:w-[6vw] ease-in-out duration-700"
          src={"/tool.png"}
          alt="icon"
          width={1000}
          height={1000}
        ></Image>
        <h2 className="text-xs md:text-xl">Development</h2>
      </div>

      <div className="flex flex-col items-center justify-center rounded-md">
        <p className="text-center text-gray-800 text-xs md:text-3xl font-bold md:mb-4">
          Book an Appointment!
        </p>
        <Link
          href="https://calendly.com/guido-llaurado/appointment-for-landinpage"
          target="_blank"
        >
          <button className="bg-gray-800 mt-1 md:mt-4 text-gray-100 text-xs md:text-xl px-1 md:py-2 md:px-4 rounded hover:bg-gray-100 hover:text-black ease-in-out duration-700">
            Schedule Now
          </button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 ml-1">
        <Image
          className="w-6 md:w-16 hover:w-[6vw] ease-in-out duration-700 mt-1"
          src={"/SEO.png"}
          alt="icon"
          width={1000}
          height={1000}
        ></Image>
        <h2 className="text-xs md:text-xl text-center">SEO Optimization</h2>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 mt-1">
        <Image
          className="w-6 md:w-16 hover:w-[6vw] ease-in-out duration-700"
          src={"/nube.png"}
          alt="icon"
          width={1000}
          height={1000}
        ></Image>
        <h2 className="text-xs md:text-xl text-center">Host and domain</h2>
      </div>
    </div>
  );
}

export default Icons;
