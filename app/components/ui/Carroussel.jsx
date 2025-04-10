"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
    "/slide1.png",
    "/slide2.png",
    "/slide3.png"
];

export function Carousel() {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="max-w-3xl mx-auto rounded-lg overflow-hidden"
        >
            {slides.map((src, index) => (
                <SwiperSlide key={index}>
                    <img src={src} alt={`Slide ${index}`} className="w-full h-110 object-cover" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
