import Image from "next/image";

export default function Home() {
   return (
         
      <div className="flex flex-col h-screen w-screen bg-black items-center justify-center" id="">

     <Image src="/Full-no-bg.png" alt="empleargpicture" width={1000} height={1000} className="" />
    
    <div className="flex flex-col items-center">
     
     <p className="text-3xl text-white text-center ">Sitio en construcción, seguinos en Instagram!</p>
     <a href="https://www.instagram.com/emple_arg/" target="_blank">
     <Image src='/instagramgray200.png' className="w-12 h-12 mt-8" height={1000} width={1000} alt="iglogo"></Image></a>
     </div>    
      
      </div>
      
      
      
        );
      }
  


