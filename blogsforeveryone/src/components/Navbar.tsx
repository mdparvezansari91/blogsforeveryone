import { signOut } from '@/store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import React, {useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state=>state.auth.user)
    const [nav, setNav] = useState(false);

    const handleLogout = ()=>{
            dispatch(signOut())
    }

    return (
        <>
            <nav className="flex justify-between items-center p-5 bg-gray-200 shadow-md relative z-20">
                <h1 className="text-2xl font-bold">Shop and Blog</h1>
                <div className="hidden md:flex space-x-4">
                    {/* <Link href="/uploadblogs" className="text-gray-700 hover:text-blue-500 transition duration-200">Upload</Link> */}
                    <Link href="/" className="text-gray-700 hover:text-blue-500 transition duration-200">Home</Link>
                    <Link href="/blogs" className="text-gray-700 hover:text-blue-500 transition duration-200">Blogs</Link>
                    <Link href="/articles" className="text-gray-700 hover:text-blue-500 transition duration-200">articles</Link>
                    <Link href="/posts" className="text-gray-700 hover:text-blue-500 transition duration-200">posts</Link>
                    {user?<button onClick={handleLogout}>Logout</button>:<Link href="/signin" className="text-gray-700 hover:text-blue-500 transition duration-200">Sign in</Link>}
                    
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
                    {/* <Link href="/uploadblogs" className="text-white text-2xl py-2" onClick={() => setNav(false)}>Upload</Link> */}
                    <Link href="/" className="text-white text-2xl py-2" onClick={() => setNav(false)}>Home</Link>
                    <Link href="/blogs" className="text-white text-2xl py-2" onClick={() => setNav(false)}>Blogs</Link>
                    <Link href="/articles" className="text-white text-2xl py-2" onClick={() => setNav(false)}>articles</Link>
                    {user?<button className="text-white text-2xl py-2" onClick={handleLogout}>Logout</button>:<Link href="/signin" className="text-white text-2xl py-2">Sign in</Link>}
                </div>
            )}
        </>
    );
}

export default Navbar;