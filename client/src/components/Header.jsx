import React from 'react'

function Header() {
    return (
        <div>
           
            <nav class="flex justify-between items-center bg-black p-4 text-white">
                
                <div class="font-bold text-lg">My Brand</div>
                
                <ul class="flex space-x-4">
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </div>
    )
}

export default Header