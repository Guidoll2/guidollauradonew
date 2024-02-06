'use client'
import { useEffect, useState } from 'react';

const IconoFlecha = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      setShowArrow(scrollPosition > windowHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
   <a href='#nav' > <img
      src="flecha.png"
      width={1000}
      height={1000}
      className={`fixed bottom-10 right-5 w-10 z-[100] ${showArrow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 transition-opacity ease-in duration-300'}`}
      alt="Flecha"
    /></a>
  );
};

export default IconoFlecha;