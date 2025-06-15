import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Features from './Features/Features';

import AnimatedImageGrid from './Features/AnimatedImageGrid';
import Intropg from './Intropg';

function Mainweb() {
    return (
        <div className="bg-[#0D1117] text-white min-h-screen flex flex-col overflow-hidden text-[#C3D0E5]">
            <Intropg />
            <div className="border-t border-dashed border-gray-400 my-6"></div>
            <Features />
            <div className="border-t border-dashed border-gray-400 my-6"></div>
            <AnimatedImageGrid />
            <Footer />
        </div>
    );
}

export default Mainweb;
