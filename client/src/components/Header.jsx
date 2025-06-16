import React from 'react'

function Header(props) {
    return (
        <div>
            <nav className="flex justify-between items-center bg-[#0D1117] p-4 text-white">
                <div className="font-bold text-2xl pl-12 font-lexend-giga-custom text-[#C3D0E5]">EVENZA</div>
                <ul className="flex font-lexend-giga-custom text-[#C3D0E5]">
                    {props.title && props.title.map((name, index) => (
                        <li key={index} className="pr-16 font-semibold">
                            {name}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Header