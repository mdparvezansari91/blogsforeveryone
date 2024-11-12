import React from 'react'
import Link from "next/link";
const Footer = () => {
    return (<>
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-10">
        <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="/about"
        >
            About Us
        </Link>
        <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="/contactus"
        >
            Contact Us
        </Link>
        <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="/privacy"
        >
            Privacy Policy
        </Link>
    </footer></>

    )
}

export default Footer