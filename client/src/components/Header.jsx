import React from 'react'

function Header() {
    return (
        <div>
            <nav className="flex justify-between items-center bg-[#0D1117] p-4 text-white">
                <div className="font-bold text-2xl pl-12 font-lexend-giga-custom text-[#C3D0E5]">EVENZA</div>
                <ul className="flex font-lexend-giga-custom text-[#C3D0E5]">
                    <li className='pr-16 font-semibold' >Home</li>
                    <li className='pr-16 font-semibold'>About</li>
                    <li className='pr-16 font-semibold'>Services</li>
                    <li className='pr-16 font-semibold'>Contact</li>
                </ul>
            </nav>
        </div>
    )
}

export default Header