    'use client'
    import React, { useState, useEffect } from 'react';

    const GradientTitle = () => {
    const [gradientIndex, setGradientIndex] = useState(0);
    


        const gradients = [
        'from-green-400 from-20% to-blue-600',
        'from-emerald-400 to-blue-600 to-80%',
        'from-red-300 to-orange-500 to-40%',
        'from-purple-600 to-pink-300 to-40%',
        'from-purple-600 to-pink-300 to-40%',


    ];

    const handleGradientChange = () => {
        setGradientIndex((prevIndex) => (prevIndex + 1) % gradients.length);
    };

    useEffect(() => {
        const intervalId = setInterval(handleGradientChange, 4000); // Cambia cada 4 segundos

        return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
    }, [])

    return (

        <div id="containertitle" 
            className="flex flex-col w-screen h-screen items-center justify-center text-center hover:items-start ease-in-out duration-00">
                   <h1 className='z-10 text-[7vw] font-normal text-transparent bg-clip-text bg-gradient-to-l from-gray-900 to-gray-700'>Do what you love</h1>
              
                <p className="text-[3vw] bg-gradient-to-tl from-gray-800 from-20% to-gray-800 text-transparent bg-clip-text">
            I craft your website for you</p>
                <p className="text-[2vw] bg-gradient-to-tl from-gray-800 from-20% to-gray-800 text-transparent bg-clip-text">
            (It&apos;s what I love)</p>

      

        </div>
    
    );
    };

    export default GradientTitle;