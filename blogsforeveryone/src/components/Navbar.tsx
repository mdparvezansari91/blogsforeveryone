import Link from 'next/link';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    
    return (
        <>
            <nav className="flex justify-between items-center p-5 bg-gray-200 shadow-md relative z-20">
                <h1 className="text-2xl font-bold">Blogs for Everyone</h1>
                <div className="hidden md:flex space-x-4">
                    <Link href="/uploadblogs" className="text-gray-700 hover:text-blue-500 transition duration-200">Upload</Link>
                    <Link href="/" className="text-gray-700 hover:text-blue-500 transition duration-200">Home</Link>
                    <Link href="/blogs" className="text-gray-700 hover:text-blue-500 transition duration-200">Blogs</Link>
                    
                </div>
                <div className="md:hidden cursor-pointer" onClick={() => setNav(!nav)} aria-expanded={nav} aria-controls="mobile-menu">
                    {nav ? <FaTimes size={30} className="text-gray-700" /> : <FaBars size={30} className="text-gray-700" />}
                </div>
            </nav>

            {nav && (
                <div 
                    id="mobile-menu"
                    className="absolute top-0 left-0 w-full h-screen bg-gray-800 bg-opacity-75 flex flex-col justify-center items-center z-30 transition-opacity duration-300"
                    onClick={() => setNav(false)}
                >
                    <Link href="/uploadblogs" className="text-white text-2xl py-2" onClick={() => setNav(false)}>Upload</Link>
                    <Link href="/" className="text-white text-2xl py-2" onClick={() => setNav(false)}>Home</Link>
                    <Link href="/blogs" className="text-white text-2xl py-2" onClick={() => setNav(false)}>Blogs</Link>
                    
                </div>
            )}
        </>
    );
}

export default Navbar;