import TinyMCEEditor from '@/components/TinyMCEEditor'
import React from 'react'

function UploadPost() {
    return (
        <>
        <div className='p-5 text-center capitalize'><h1 className=' font-serif text-5xl text-slate-300'>Upload Posts</h1></div>
        <TinyMCEEditor/>
        </>    )
}

export default UploadPost