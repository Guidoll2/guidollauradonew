"use client";

import Flechaup from "./flechaup";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Icons from "./components/icons";

export default function Home() {
  const divRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const [isVisible, setIsVisible] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      const newVisibility = divRefs.map((ref) => {
        if (!ref.current) return false;
        const rect = ref.current.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight * 1 && rect.bottom >= 0;
      });
      setIsVisible(newVisibility);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    animationFrameId = requestAnimationFrame(handleScroll); // Check initial visibility

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const iconsRef = useRef<HTMLDivElement>(null);
  const [isIconsVisible, setIsIconsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIconsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (iconsRef.current) {
      observer.observe(iconsRef.current);
    }

    return () => {
      if (iconsRef.current) {
        observer.unobserve(iconsRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow bg-gradient-to-b from-orange-100 to-pink-100 z-10">
        <Flechaup />

        <div
          id="nav"
          className="z-0 flex flex-row hover:py-4 md:justify-start md:p-0 gap-8 h-[5px] bg-gradient-to-l from-blue-600 to-blue-300 w-screen hover:h-[4vw] ease-in-out duration-700 hover:text-slate-800 text-xs hover:text-xl font-semibold md:font-bold text-transparent items-center "
        >
          <div className="flex flex-row ml-8 gap-8 w-full justify-center md:justify-start ">
            <a href="#services">
              <p className="">Services</p>
            </a>
            <Link href="#contact" className="">
              <p className="">Contact</p>
            </Link>
            <Link href="#portfolio">
              <p className="">Portfolio</p>
            </Link>
          </div>
        </div>

        <div
          id="HeroMD"
          className="flex flex-col md:flex-cols-2 w-screen gap-4 z-10 mb-24 md:mb-0"
        >
          <Image
            className="-z-[10] order-2  md:-translate-y-60 rounded-r-full shadow-2xl md:w-1/3 opacity-70"
            src={"/profesionest.jpg"}
            alt=""
            width={1000}
            height={1000}
          ></Image>

          <div className="flex flex-col p-2 md:-translate-y-24 items-start bg-gray-200 opacity-90 mt-2 md:mt-48">
            <h1 className="text-4xl md:text-6xl text-start font-normal text-gray-700">
              Custom{" "}
              <span className="text-4xl md:text-6xl text-start font-normal text-transparent bg-clip-text bg-gradient-to-l from-blue-700 to-blue-400">
                Websites{" "}
              </span>{" "}
              for unique visions
            </h1>
            <div className="fade-in-up">
              <p className="text-xl md:text-4xl ml-1 text-gray-600">
                Functional, elegant,{" "}
                <span className="text-xl md:text-4xl font- bg-gradient-to-l from-blue-700 to-blue-400 text-transparent bg-clip-text">
                  and results-driven.
                </span>
              </p>
            </div>
          </div>
        </div>

        <div
          ref={iconsRef}
          className={`transition-opacity duration-1000 ease-in-out ${
            isIconsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Icons />
        </div>

        <div
          ref={iconsRef}
          className={`transition-opacity duration-1000 ease-in-out bg-gray-100 ${
            isIconsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-2xl md:text-4xl mb-48 md:mb-12 mt-12 p-12 text-center font-normal text-transparent bg-clip-text bg-gradient-to-l from-blue-700 to-blue-400">
            From a simple landing page to a complex web application, <br></br>I
            bring your vision to life to meet your needs.
          </p>
        </div>

        <div
          ref={divRefs[3]}
          className={`hidden md:flex flex-col md:grid md:grid-cols-2 h-fit w-screen justify-center bg-gradient-to-tl from-blue-400 to-blue-300 transition-transform duration-1000 ease-in-out transform ${
            isVisible[3] ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            id="premium"
            className="flex flex-col items-center justify-center"
          >
            <h2 className="p-4 text-4xl text-gray-800 text-center">
              Premium Websites Starting at{" "}
              <span className=" text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-blue-700">
                $1500
              </span>
            </h2>
            <Accordion className="mb-2" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <p className="text-black text-2xl">
                    Comprehensive, Functional & Scalable Solutions
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-xl font-bold">
                    Customized Features: E-commerce, User/Customer Portals, and
                    More
                  </p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-xl">
                    Home Page and Up to 8 Additional Sections
                  </p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-xl">
                    Responsive Design (Adapts to All Screen Sizes)
                  </p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-xl">SEO Optimization & SSL Security</p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-xl">Hosting and Domain Included</p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-xl mb-8">
                    Social Media Integration & Contact Options
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div id="basic" className="flex flex-col items-center justify-center">
            <h2 className="p-4 text-4xl text-center text-gray-800">
              Basic Websites Starting at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-blue-700">
                $500
              </span>
            </h2>

            <Accordion className="mb-2" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <p className="text-black text-2xl">
                    Powerfull, simple & elegant.
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-xl font-bold">
                    Home Page and Up to 3 Additional Sections
                  </p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-xl">
                    Responsive Design (Adapts to All Screen Sizes)
                  </p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-xl">Hosting and Domain Included</p>
                </AccordionContent>

                <AccordionContent>
                  <p className="text-xl ">
                    Showcase text, images, and videos effortlessly.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="h-2" id="services"></div>

        <div
          id="Hook1 SM"
          className="flex flex-col -translate-y-36 mt-4 md:hidden shadow-lg bg-gradient-to-tl from-blue-400 to-blue-300"
        >
          <div id="basic" className="flex flex-col items-center justify-center">
            <h2 className="p-4 text-2xl text-center text-gray-700">
              Basic Websites Starting at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-blue-700">
                $500
              </span>
            </h2>

            <Accordion className="mb-2 text-center" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <p className="text-black text-l">
                    Powerfull, simple & elegant.
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-l font-bold">
                    Home Page and Up to 3 Additional Sections
                  </p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-l">
                    Responsive Design (Adapts to All Screen Sizes)
                  </p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-l">Hosting and Domain Included</p>
                </AccordionContent>

                <AccordionContent>
                  <p className="text-l ">
                    Showcase text, images, and videos effortlessly.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div
          id="Hook1 SM"
          className="flex flex-col gap-2 -translate-y-36 mt-4 md:hidden shadow-lg bg-gradient-to-tl from-blue-400 to-blue-300"
        >
          <div
            id="premium"
            className="flex flex-col items-center justify-center mb-4"
          >
            <h2 className="p-4 text-2xl text-center text-gray-700">
              Premium Websites Starting at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-blue-700">
                $1500
              </span>
            </h2>
            <Accordion className="mb-12 text-center" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <p className="text-black text-l">
                    Comprehensive, Functional & Scalable Solutions
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-l font-bold">
                    Customized Features: E-commerce, User/Customer Portals, and
                    More
                  </p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-l">
                    Home Page and Up to 8 Additional Sections
                  </p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-l">
                    Responsive Design (Adapts to All Screen Sizes)
                  </p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-l">SEO Optimization & SSL Security</p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-l">Hosting and Domain Included</p>
                </AccordionContent>
                <AccordionContent>
                  <p className="text-l mb-8">
                    Social Media Integration & Contact Options
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="flex flex-col -translate-y-36 md:translate-y-0 items-center justify-center rounded-md mt-12 md:mt-24 md:mb-48 w-screen z-[10]">
          <p className="text-gray-700 text-center text-3xl font-bold mb-4">
            Ready to start?
          </p>
          <Link
            href="https://calendly.com/guido-llaurado/appointment-for-landinpage"
            target="_blank"
          >
            <button className="bg-gray-700 mt-4 text-gray-100 text-xl  py-2 px-4 rounded hover:bg-gray-400">
              Schedule Now
            </button>
          </Link>
          <p className="text-gray-700 text-center text-3xl font-bold mt-8">
            Or keep scroolling to see my{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-blue-400">
              work
            </span>
          </p>
        </div>

        <div
          id="portfolio"
          className="z-[20] flex flex-col -translate-y-24 bg-gradient-to-tl from-blue-400 to-blue-300 items-center justify-center mb-12"
        >
          <p className="text-4xl p-2 text-gray-700 mb-2">Portfolio</p>

          <p className="text-3xl text-gray-700">Basics Websites</p>

          <div className="flex flex-col md:flex-row md:p-0 mb-12 mt-4 w-full justify-center gap-4">
            <div className="mr-4 ml-4 md:ml-0 md:mr-0 bg-orange-100 hover:bg-gray-100 rounded-lg shadow-2xl hover:scale-110 ease-in-out duration-700 p-2 flex flex-col items-center justify-center gap-2">
              <p className="text-2xl text-gray-700">Services provider</p>
              <Link href="http://www.alarmascmm.com" target="_blank">
                <button className="underline text-blue-700 flex flex-col justify-center items-center p-2">
                  www.alarmascmm.com
                </button>
              </Link>
              <div className="w-full h-48 overflow-hidden">
                <Image
                  src="/cmm3.png"
                  alt="logocmm"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="mr-4 ml-4 md:ml-0 md:mr-0 bg-orange-100 hover:bg-gray-100 rounded-lg shadow-2xl hover:scale-105 ease-in-out duration-500 p-2 flex flex-col gap-4">
              <div className="flex flex-col items-center text-center gap-2 p-2">
                <p className="text-2xl text-gray-700 font-semibold">
                  IT Company
                </p>
                <Link href="http://www.pidosoporte.com" target="_blank">
                  <button className="underline text-blue-700">
                    www.pidosoporte.com
                  </button>
                </Link>
              </div>
              <div className="w-full h-48 overflow-hidden">
                <Image
                  src="/soporte.png"
                  alt="logocmm"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="mr-4 ml-4 md:ml-0 md:mr-0  bg-orange-100 hover:bg-gray-100 rounded-lg shadow-2xl hover:scale-110 ease-in-out duration-700 p-2 flex flex-col items-center justify-center gap-2">
              <p className="text-2xl text-gray-700">Int. Trader company</p>
              <Link href="http://www.bscustoms.com.ar" target="_blank">
                <button className="flex flex-col justify-center items-center p-2 underline text-blue-700">
                  www.bscustoms.com.ar
                </button>
              </Link>
              <div className="w-full h-48 overflow-hidden">
                <Image
                  src="/customs.png"
                  alt="logocmm"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="mr-4 ml-4 md:ml-0 md:mr-0 bg-orange-100 hover:bg-gray-100 rounded-lg shadow-2xl hover:scale-110 ease-in-out duration-700 p-2 flex flex-col items-center justify-center gap-2">
              <p className="text-2xl text-gray-700">Proffesional</p>
              <Link href="https://laureanogh.vercel.app/" target="_blank">
                <button className="underline text-blue-700 flex flex-col justify-center items-center p-2">
                  www.laureanogherardi.org
                </button>
              </Link>
              <div className="w-full h-48 overflow-hidden">
                <Image
                  src="/lau.png"
                  alt="logocmm"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:p-0 mb-12 mt-4 w-full md:w-fit justify-center gap-4">
            <p className="text-3xl text-center text-gray-700">
              Premium Websites
            </p>

            <div className=" mt-2 mb-4 mr-4 ml-4 bg-orange-100 hover:bg-gray-100 rounded-lg shadow-2xl hover:scale-110 ease-in-out duration-700 p-2 flex flex-col items-center justify-center gap-2">
              <p className="text-2xl text-gray-700">Social Media StartUp</p>
              <Link href="http://www.emplearg.com/" target="_blank">
                <button className="flex flex-col justify-center items-center p-2 underline text-blue-700">
                  www.emplearg.com{" "}
                </button>
              </Link>
              <div className="w-full h-48 overflow-hidden">
                <Image
                  src="/emplearg.png"
                  alt="logocmm"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4  bg-gradient-to-tl from-blue-400 to-blue-300 mb-12">
          <h1 className="text-4xl text-center text-gray-700 mb-4">About me</h1>
          <p className="text-l md:text-2xl text-gray-700 p-4 ">
            I&apos;m a full-stack developer from Argentina with +3 years of
            experience in web development.
            <br></br>Drawing on my background in customer service I bring a
            unique blend of skills to my projects, to not only deliver top-notch
            websites but also to ensure seamless communication with clients.
            <br></br>I handle all aspects of web development, so don&apos;t
            hesitate and share with me your ideas, I will put it online!.
          </p>
        </div>
        <footer
          id="contact"
          className="w-full p-5 bg-gradient-to-tl from-blue-400 to-blue-300 text-center text-black"
        >
          <h1 className="text-xl text-gray-700  md:text-3xl font-bold">
            Guido Llaurado
          </h1>
          <p className="text-sm md:text-lg">
            Design and Development | All rights reserved | Built with{" "}
            <span className="bg-gradient-to-r from-gray-950 to-blue-950 text-transparent bg-clip-text">
              Tailwind CSS
            </span>
          </p>

          <div className="flex flex-col items-center mt-4">
            <p className="p-4">
              Open to new opportunities. Ready to contribute to your team or
              company.
            </p>
            <div className="flex flex-row gap-8">
              <a href="mailto:guido.llaurado@gmail.com">
                <Image
                  className="w-8"
                  src="/mail.png"
                  width={1000}
                  height={1000}
                  alt="gmailicon"
                />
              </a>
              <a href="https://wa.me/+5492226524466" target="_blank">
                <Image
                  className="w-8"
                  src="/whatsapp.png"
                  width={1000}
                  height={1000}
                  alt="wpicon"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/guido-llaurado-381316118/"
                target="_blank"
              >
                <Image
                  className="w-8"
                  src="/linkedin.png"
                  width={1000}
                  height={1000}
                  alt="linkedinicon"
                />
              </a>
            </div>
            <a
              href="https://www.flaticon.es/iconos-gratis/instagram"
              title="iconos"
              className="mt-5 text-xs"
            >
              Icons created by Freepik - Flaticon
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
