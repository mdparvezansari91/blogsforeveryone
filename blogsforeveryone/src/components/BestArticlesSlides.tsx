import { useAppSelector } from '@/store/hooks';
import React, { useEffect } from 'react';
import Image from 'next/image';

interface Article {
    _id: string;
    image: string;
    title: string;
    description: string;
    url: string;
}

function LatestArticlesSlides() {
    const articles = useAppSelector(state => state.articles.articles);
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [slides, setSlides] = React.useState<Article[]>([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    useEffect(() => {
        if (articles.length > 0) {
            // Limit the number of slides to 10
            setSlides(articles.slice(0, 10));
            setIsLoaded(true);
        }
    }, [articles]);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    if (!isLoaded) {
        return <p className="text-center text-lg">Loading articles...</p>;
    }

    return (
        <div className="relative w-full overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((article) => (
                    <div key={article._id} className="min-w-full flex flex-col items-center p-4">
                        <Image
                            src={article.image}
                            alt={article.title}
                            width={600}
                            height={400}
                            className="rounded-lg"
                        />
                        <h2 className="text-xl font-semibold mt-2">{article.title}</h2>
                        <p className="text-gray-700">{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2">
                            Read more
                        </a>
                    </div>
                ))}
            </div>
            <button 
                onClick={prevSlide} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300" 
                aria-label="Previous Slide"
            >
                &lt;
            </button>
            <button 
                onClick={nextSlide} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300" 
                aria-label="Next Slide"
            >
                &gt;
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-2 rounded-full transition duration-300 ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default LatestArticlesSlides;