import React, { useEffect, useState } from 'react';
import Header from './Header';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
// import img4 from '../images/img4.jpg';
import { Link } from 'react-router-dom';

function Intropg() {
    const images = [img1, img2, img3];
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
        <main className="w-screen h-screen relative overflow-hidden">
            <div className="sticky top-0 z-50 bg-black">
                <Header title={["Home" , "About" , "Services" , "Contact"]}/>
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

            {/* Overlay Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <div className="backdrop-blur-md bg-black/40 p-8 h-[345px] flex flex-col justify-center items-center rounded-xl text-center max-w-xl w-full border border-white/10">
                    <h1 className="text-[34px] font-bold text-[#F1F5FF] mb-6 font-lexend-giga-custom">
                       Invite-Hire-Celebrate
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl mb-6">
                        Bring people together and craft unforgettable moments — effortlessly.
                    </p>
                    <Link to="/login">
                        <button className="font-poppins-custom mt-2 px-6 py-3 text-[#F1F5FF] border border-[#F1F5FF] rounded-lg hover:bg-[#F1F5FF] hover:text-black transition duration-300">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>


        </main>
    );
}

export default Intropg;
