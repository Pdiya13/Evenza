import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Features from './Features/Features';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import img4 from '../images/img4.jpg';
import Login from './authentication/Login';

function Intro() {
    const images = [img1, img2, img3, img4];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center max-w-3xl mx-auto">
                    <div className="absolute inset-0 bg-opacity-40 rounded-lg -z-10" />
                    <h1 className="font-lexend-giga-custom text-6xl md:text-8xl font-extrabold text-white mb-6">
                        Welcome
                    </h1>
                    <p className="mt-4 max-w-lg text-lg md:text-2xl text-white/90 italic tracking-wide leading-relaxed drop-shadow-md">
                        Explore our vision and discover more
                    </p>
                    <button onClick={() => setIsModalOpen(!isModalOpen)}>
                        Get Started
                    </button>

                </div>

                {isModalOpen && <Login  isModalOpen = {isModalOpen} setIsModalOpen={setIsModalOpen}/>}
            </main>
        </div>
    );
}

export default Intro;
