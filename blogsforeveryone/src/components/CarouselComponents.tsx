import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

interface CarouselItemProps {
    title: string;
    content: string;
    link: string,
    text: string,
    imagesrc: string,
    imagealt: string,
}

const CarouselItem: React.FC<CarouselItemProps> = ({ title, content, link, text, imagesrc, imagealt }) => (
    <div className="relative flex flex-col items-center justify-center h-64 p-4 bg-gray-500 rounded-lg shadow-md overflow-hidden">
        <Image 
            src={imagesrc} 
            alt={imagealt} 
            fill 
            className="absolute inset-0 object-cover" 
        />
        <div className="relative z-10 text-white text-center">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <a href={link} className="underline">{text}</a>
            <p>{content}</p>
        </div>
    </div>
);

const CarouselComponent: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="w-4/5 mx-auto mt-10">
            <Slider {...settings}>
                <CarouselItem 
                    title="Check out our blogs" 
                    content="" 
                    link='/blogs' 
                    text="Click Here" 
                    imagesrc="https://images.unsplash.com/photo-1687226013074-5d59ffeb2625?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    imagealt='image'  
                />
                <CarouselItem 
                    title="Calculate EMI, Loans and many more" 
                    content="" 
                    link='/' 
                    text="Check above" 
                    imagesrc='https://images.unsplash.com/photo-1687226013074-5d59ffeb2625?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
                    imagealt='' 
                />
            </Slider>
        </div>
    );
};

export default CarouselComponent;