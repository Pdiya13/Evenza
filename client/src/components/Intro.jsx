import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import img4 from '../images/img4.jpg';

function Intro() {
    const images = [img1, img2, img3, img4];
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length)
        }, 2000);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: window.innerWidth * currentIndex,
                behavior: 'smooth',
            });
        }
    }, [currentIndex]);

    return (
        <div className="bg-black text-white min-h-screen flex flex-col overflow-hidden">
            <main className="w-screen h-screen">
                <div className="sticky top-0 z-50 bg-black">
                    <Header />
                </div>

                <div
                    ref={scrollRef}
                    className="flex flex-row overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth"
                >
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="snap-start min-w-screen flex justify-center"
                        >
                            <img src={img} alt={`img${index + 1}`} className="object-contain rounded" />
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Intro;
