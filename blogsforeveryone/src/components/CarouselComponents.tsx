// CarouselComponent.tsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CarouselItemProps {
    title: string;
    content: string;
    link: string,
    text:string
}

const CarouselItem: React.FC<CarouselItemProps> = ({ title, content, link, text }) => (
    <div className="flex flex-col items-center justify-center h-64 p-4 bg-gray-500 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <a href={link}>{text}</a>
        <p className="text-center">{content}</p>
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
                <CarouselItem title="Check out our blogs" content="" link='/blogs' text="Click Here" />
                <CarouselItem title="Calculate EMI, Loans and many more" content="" link='/' text="Check above" />
            </Slider>
        </div>
    );
};

export default CarouselComponent;