"use client"
import ImageCarousel from "@/components/ImageCarousel";
import img1 from "../../public/assets/images/img1.jpg"
// import img2 from "../../public/assets/images/img2.jpg"
// import img3 from "../../public/assets/images/img3.jpg"
import EMICalculator from "@/components/calculators/EmiCalculator";
import BMICalculator from "@/components/calculators/BMICalculator";
import SavingsCalculator from "@/components/calculators/SavingsCalculator";
import CurrencyConverter from "@/components/calculators/CurrencyConverter";
import InvestmentCalculator from "@/components/calculators/InvestmentCalculator";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";
import RetirementCalculator from "@/components/calculators/RetirementCalculator";
import TaxCalculator from "@/components/calculators/TaxCalculator";
import CarouselComponent from "@/components/CarouselComponents";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { profile } from "@/store/features/auth/authSlice";
import BestArticlesSlides from "@/components/BestArticlesSlides";
import useFetchArticles from "@/store/customhooks/useFetchArticles";



const images = [
  img1
];

export default function Home() {
  const dispatch = useAppDispatch()
  useFetchArticles(1,12)
  useEffect(()=>{
    dispatch(profile())
  },[dispatch])
  return (
    <>
      <div className="container mx-auto p-4 mt-4 bg-slate-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-4">Make Shopping And Blogging Easier</h1>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <span className="bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-slate-200">Make</span>
          <span className="bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-slate-200">Shopping</span>
          <span className="bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-slate-200">And</span>
          <span className="bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-slate-200">Blogging</span>
          <span className="bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-slate-200">Easier</span>
        </div>
      </div>
      
      <div>
        <h1 className=" p-5 text-5xl justify-center text-center">Latest Articles</h1>
        <BestArticlesSlides/>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4"></h1>
        <ImageCarousel images={images} />
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center space-y-8 sm:space-y-0 sm:space-x-8 p-4">
        <div className="max-w-xs w-full">
          <BMICalculator />
        </div>
        <div className="max-w-xs w-full">
          <CurrencyConverter />
        </div>
        <div className="max-w-xs w-full">
          <EMICalculator />
        </div>
        <div className="max-w-xs w-full">
          <InvestmentCalculator />
        </div>
        <div className="max-w-xs w-full">
          <MortgageCalculator />
        </div>
        <div className="max-w-xs w-full">
          <RetirementCalculator />
        </div>
        <div className="max-w-xs w-full">
          <SavingsCalculator />
        </div>
        <div className="max-w-xs w-full">
          <TaxCalculator />
        </div>
      </div>
      <CarouselComponent />
      
    </>
  );
}