import React from 'react'

function Header() {
    return (
        <div>
            <nav class="flex justify-between items-center bg-black p-4 text-white">
                <div class="font-bold text-2xl pl-12">EVENZA</div>
                <ul class="flex">
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