// ImageCarousel.js
import React, { useState, useEffect } from 'react';
import image1 from '../public/assets/Coffee1.jpg';
import image2 from '../public/assets/Coffee2.webp';
import image3 from '../public/assets/Coffee3.jpg';
import image4 from '../public/assets/Coffeee3.webp';
import image5 from '../public/assets/Coffee4.jpg';
import image6 from '../public/assets/Coffeee4.webp';
import image7 from '../public/assets/Coffee5.webp';
import image8 from '../public/assets/Coffee6.webp';
import image9 from '../public/assets/Coffee7.webp';
import image10 from '../public/assets/Coffee8.webp';
import image12 from '../public/assets/Coffee.png';
import image13 from '../public/assets/Coffee.webp';
import image11 from '../public/assets/Coffee.jpg';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
const productImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
];

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [currentIndex]);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? productImages.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === productImages.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };
    
    return (
        <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
            <div
                style={{ backgroundImage: `url(${productImages[currentIndex]})` }}
                className='h-full w-full rounded-2xl bg-cover bg-center duration-500'
            ></div>
            <div className='absolute left-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className='absolute right-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className='top-4 flex justify-center py-2'>
                {productImages.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`cursor-pointer text-2xl ${slideIndex === currentIndex ? 'text-blue-500' : 'text-gray-300'}`}
                    >
                        <RxDotFilled />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ImageCarousel;
