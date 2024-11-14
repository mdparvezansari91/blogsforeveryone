"use client"
import ImageCarousel from "@/components/ImageCarousel";
import VideoList from "@/components/VideoList";
import ci from "../../public/coverpage.png"
import cv from "../../public/coverimage2.jpg"

const images = [
  ci,cv
];

export default function Home() {


  return (
    <>
      <div className="container mx-auto p-4 mt-4 bg-slate-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-4">Make Shopping And Blogging Easier</h1>
        <div className="flex flex-wrap justify-center space-x-4">
          <span className="bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-slate-200">Make</span>
          <span className="bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-slate-200">Shopping</span>
          <span className="bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-slate-200">And</span>
          <span className="bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-slate-200">Blogging</span>
          <span className="bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-slate-200">Easier</span>
        </div>
      </div>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Carousel</h1>
      <ImageCarousel images={images} />
    </div>
      <VideoList />
    </>
  );
}