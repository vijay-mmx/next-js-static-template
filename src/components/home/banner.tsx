"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HiArrowLongDown } from "react-icons/hi2";
import type { Swiper as SwiperType } from 'swiper/types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const swiperItems = [
    {
        // img: "/assets/home-banner/swiper-1.jpg",
        // img: "/assets/home-banner/swiper-old-1.jpg",
        img: "/assets/home-banner/swiper-s-1.jpg",
        title1: (
            <>
                Crafting Spaces,<br/> Defining Lives.
            </>
        ),
    },
    {
        // img: "/assets/home-banner/swiper-2.jpg",
        img: "/assets/home-banner/swiper-s-2.jpg",
        title1:(
            <>
                Inspired Living,<br/> Timeless Design.
            </>
        ),
    }
];

const banner1 = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const paginationRef = useRef(null);
    const container = useRef(null as HTMLElement | null);

    const [swiperInstance, setSwiperInstance] = useState(null as SwiperType | null);

    function handleOnScrollDownClick() {
        gsap.to(window, {
            scrollTo: {
                y: window.innerHeight,
            }
        })
    }

    useGSAP(
        () => {
            if (!container.current) return;

            const arrows = document.querySelectorAll(".banner-arrow-circle > .banner-icon");
            gsap.set(
                arrows[1],
                {
                    yPercent: -150
                }
            );

            gsap.timeline({
                    repeat: -1,
                    repeatDelay: 0.5
                })
                .to(
                    arrows[0],
                    {
                        yPercent: 150,
                        duration: 1,
                        ease: "power3.inOut"
                    }
                )
                .to(
                    arrows[1],
                    {
                        yPercent: 0,
                        duration: 1,
                        ease: "power3.inOut"
                    },
                    0
                )
        },
        {
            scope: container
        }
    )

  return (
    <>
        <section className='hero-section' ref={container}>
            <div className="hero-bg"></div>
            <div className="hero">
                <div className="swiper-navigation-center">
                    <div className="swiper-navigation">
                        <button className="swiper-navigation-left white-icon" aria-label="Previous" ref={prevRef}>
                            <ChevronLeft strokeWidth={1} />
                        </button>
                        <button className="swiper-navigation-right white-icon" aria-label="Next" ref={nextRef}>
                            <ChevronRight strokeWidth={1} />
                        </button>
                    </div>
                    <div className="swiper-container">
                        <Swiper 
                            modules={[ Navigation, Autoplay, Pagination ]}
                            slidesPerView={1}
                            spaceBetween={30}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: true,
                            }}
                            loop={true}
                            speed={1000}
                            onSwiper={setSwiperInstance}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            pagination={{ el: paginationRef.current, clickable: true }}
                        >
                            {swiperItems.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="swiper-wrapper"> 
                                        <div className="hero-image">
                                            <img src={`${item.img}`} className={`hero-img-${index}`} alt="banner1" />
                                        </div>
                                        <div className="hero-black-overlay"></div>
                                        <h1 className="hero-title heading-h1">
                                            {item.title1}
                                        </h1>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="pagination-scrollDown">
                            <div className="swiper-pagination" ref={paginationRef}></div>
                            <button className="banner-scroll-down" onClick={handleOnScrollDownClick}>
                                <span className='little-span'>Scroll Down</span> 
                                <div className='banner-arrow-circle'>
                                    <HiArrowLongDown className='banner-icon' color='#fff'/>
                                    <HiArrowLongDown className='banner-icon' color='#fff'/>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default banner1