import React from 'react';
import Footer from './Footer';
import Features from './Features/Features';
import AnimatedImageGrid from './Features/AnimatedImageGrid';
import Intropg from './Intropg';

function Mainweb() {
    return (
        <div className="bg-[#0D1117] text-[#C3D0E5] min-h-screen flex flex-col">
            {/* Intro section with Header */}
            <section className="w-full">
                <Intropg />
            </section>

            {/* Features */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800">
                <Features />
            </section>

            {/* Animated Image Grid */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800">
                <AnimatedImageGrid />
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800">
                <Footer />
            </footer>
        </div>
    );
}

export default Mainweb;
