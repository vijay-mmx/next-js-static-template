"use client";

import React, { useRef, useState } from "react";
import SectionHead from "../global/section-head";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const farms = [
    {
        title: "Deep Red Glass Vase",
        // country: "",
        image: "/assets/home/featured_products/Deep-Red-Glass-Vase.webp",
    },
    {
        title: "Lavish Love",
        // country: "Kenya",
        image: "/assets/home/featured_products/Lavish-love.webp",
    },
    {
        title: "Bold Pink Roses in Vase",
        // country: "Kenya",
        image: "/assets/home/featured_products/Bold-Pink-Roses-in-Vase.webp",
    },
    {
        title: "12 Pink Roses with Cake",
        // country: "Kenya",
        image: "/assets/home/featured_products/pink-roses-with-cake.webp",
    },
    {
        title: "Golden Bloom Vase Arrangement",
        // country: "Kenya",
        image: "/assets/home/featured_products/Golden-Bloom-Vase-Arrangement.webp",
    },
    {
        title: "Red Spray Rose in Vase",
        // country: "Kenya",
        image: "/assets/home/featured_products/Red-Spray-Rose-in-Vase.webp",
    },
  
    {
        title: "Painted Blue Roses In Vase ",
        // country: "Kenya",
        image: "/assets/home/featured_products/Painted-Blue-Roses-In-Vase.webp",
    },
 
    {
        title: "Miss You Pink & White Rose Bouquet",
        // country: "Kenya",
        image: "/assets/home/featured_products/Miss-You-Pink.webp",
    },
    {
        title: "Love in Red & White with Ferrero",
        // country: "Ethipoia",
        image: "/assets/home/featured_products/Love-in-Red.webp",
    },
]

const Featuredproducts = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const [swiperInstance, setSwiperInstance] = useState(null as SwiperType | null);

    function handleOnPrev() {
        if (swiperInstance) {
            swiperInstance.slidePrev();
        }
    }
    function handleOnNext() {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    }

    const sectionEl = useRef(null as HTMLImageElement | null);
    useGSAP(
        () => {
            if (!sectionEl.current) return false;

            gsap.set(sectionEl.current!.querySelectorAll(".farms-slide-item"), {
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl.current.querySelector(".farms-slider"),
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                    start: "top 80%",
                },
            }).fromTo(
                sectionEl.current!.querySelectorAll(".farms-slide-item"),
                {
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                },
                {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.inOut",
                }
            );
        },
        { dependencies: [], scope: sectionEl }
    );

  return (
    <section className="section-padding featured-products-sec border-top" ref={sectionEl}>
    <div className="featured-products-wrapper">
        <SectionHead
            className="text-center mb-3"
            title={
                <>
                    Exclusive  <br /> Collections 
                </>
            }
            subtitle={"Featured Products"}
          
        />
    </div>
    <div className="featured-container  mt-4">
        <Swiper
            className="featured-slider"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            loop={true}
            grabCursor={true}
            speed={1000}
            onSwiper={setSwiperInstance}
            navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
            }}
            breakpoints={{
                0: {
                    slidesPerView: 2,
                },
                480: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 5,
                },
            }}
        >
            {farms.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className="farms-slide-item">
                        <div className="ratio">
                            <img className="farms-slide-item-img" src={item.image} alt={item.title} />
                        </div>
                        <div className="farms-slide-item-content">
                            <div className="farms-slide-item-index">
                                <span>{`${`${index + 1}`.padStart(2, "0")}`}</span>
                            </div>
                            <div className="farms-slide-item-content-wrapper">
                                <p className="farms-slide-item-title">{item.title}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        <div className="swiper-navigation">
            <button className="swiper-navigation-left" aria-label="Previous" onClick={handleOnPrev}>
                <ChevronLeft strokeWidth={1} />
            </button>
            <button className="swiper-navigation-right" aria-label="Next" onClick={handleOnNext}>
                <ChevronRight strokeWidth={1} />
            </button>
        </div>
    </div>
</section>
  )
}

export default Featuredproducts;