"use client"
import { useState, useEffect } from 'react';
import { getHomeSlider } from '@/action/backendApi';
import Slider from 'react-slick';
import Link from 'next/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HomeSlider = () => {
    const [sliderData, setSliderData] = useState([]);

    useEffect(() => {
        const fetchSliderData = async () => {
            const data = await getHomeSlider();
            setSliderData(data);
        };

        fetchSliderData();
    }, []);

    if (!sliderData || sliderData.length === 0) {
        return (
            <div className="home-slider slider-skeleton">
                <Skeleton height={600} width="100%" />
            </div>
        );
    }

    const sliderSettings = sliderData[0];
    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,
        autoplaySpeed: 3000,
        fade: false,
        cssEase: 'ease-in-out',
        touchThreshold: 100
    };

    if (sliderSettings) {
        settings.arrows = sliderSettings.arrows === 1;
        settings.dots = sliderSettings.dots === 1;
        settings.autoplay = sliderSettings.autoplay === 1;
        settings.speed = sliderSettings.speed;
        settings.autoplaySpeed = sliderSettings.autoplay_speed;
        settings.fade = sliderSettings.fade === 1;
    }

    return (
        <>
            {sliderSettings && (
                <Slider {...settings}>
                    {sliderSettings.slides.map(slide => (
                        <div className='slide-item' key={slide.id}>
                            <img src={slide.file.path} alt={slide.caption_1} />
                            <div className='container'>
                                <div className='slider-content'>
                                    <h1>{slide.caption_1}</h1>
                                    <p>{slide.caption_2}</p>
                                    {slide.call_to_action_url && (
                                        <Link href={slide.call_to_action_url} className='btn btn-primary'>
                                            {slide.call_to_action_text}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </>
    );
};

export default HomeSlider;
