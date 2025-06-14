import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Features from './Features/Features';
import { Link } from 'react-router-dom';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import img4 from '../images/img4.jpg';
// import Login from './authentication/Login';

function Intro() {
    const images = [img1, img2, img3, img4];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true);
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
                setVisible(true);
            }, 500);
        }, 4000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="bg-black text-white min-h-screen flex flex-col overflow-hidden">
            <main className="w-screen h-screen relative">
                <div className="sticky top-0 z-50 bg-black">
                    <Header />
                </div>

                <div
                    className="absolute inset-0 bg-center bg-cover"
                    style={{
                        backgroundImage: `url(${images[currentIndex]})`,
                        opacity: visible ? 1 : 0,
                        filter: visible ? 'blur(5px)' : 'blur(20px)',
                        transition: 'opacity 1s ease-in-out, filter 1s ease-in-out',
                        zIndex: 0,
                    }}
                />
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                        Welcome
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-white/80">
                        Explore our vision and discover more
                    </p>
                    <Link to="/login">
                        <button>
                            get  started
                        </button>
                    </Link>
                </div>
            </main>
            <Features />
            <Footer />
        </div>
    );
}

export default Intro;
