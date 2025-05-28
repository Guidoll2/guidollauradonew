"use client";
import { useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";

const IconoFlecha = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      setShowArrow(scrollPosition > windowHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a href="#nav">
      {" "}
      <BsArrowUp
        className={`fixed bottom-10 right-4 w-10 h-8 z-[100] ${
          showArrow
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 transition-opacity ease-in duration-300"
        }`}
      />
    </a>
  );
};

export default IconoFlecha;
