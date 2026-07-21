"use client";
import { useRef } from "react";
import { useLoaderContext } from "@/providers/loader-provider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loader = () => {
    const { setLoaded } = useLoaderContext();
    const container = useRef(null as HTMLDivElement | null);

    useGSAP(
        () => {
                gsap.timeline({
                    onComplete: () => {
                        setLoaded(true);
                        gsap.set(".loader", {
                            pointerEvents: "none",
                            zIndex: -1
                        })
                    }
                })
                // .to(
                //     ".square",
                //     {
                //         delay: 4.7,
                //         opacity: 1,
                //         width: "15px",
                //         height: "15px",
                //         duration: .5,
                //         ease: "power3.inOut",
                //     }
                // )
                .to(
                    ".loader-logo",
                    {
                        // delay: 4.8, //Animation changes - add delay here according to your after effects video length
                        duration: 1.5,
                        x: "-100%",
                        ease: "power4.inOut",
                    },
                )
                .to(
                    ".loader-bg-accent",
                    {
                        // delay: -1,
                        duration: 1.5,
                        x: "-100%",
                        ease: "power4.inOut",
                    },
                    "<"
                )
                .to(
                    ".loader-bg-primary",
                    {
                        delay: 0.2,
                        duration: 1.5,
                        x: "-100%",
                        ease: "power4.inOut",
                    },
                    "<"
                )

        },
        { scope: container }
    );

    return (
        <div className="loader-wrapper" ref={container}>
            <div className="loader-logo">
                {/* NOTES: "Animation changes" (cmd+f - files search this double quotes) */}
                {/* <DotLottieReact
                    src="/assets/logo/Logo_Animation-after-effects.json"
                    autoplay
                    className="logo"
                /> */}
                <span className="logo">Loading</span>
            </div>
            {/* <div className="since-txt-wrapper">
                <div className="since-txt-inner">
                    <div className="square-wrapper">
                        <div className="square"></div>
                    </div>
                    <span>Since 2011</span>
                    <div className="square-wrapper">
                        <div className="square"></div>
                    </div>
                </div>
            </div> */}
            <div className="loader-bg-primary"></div>
            <div className="loader-bg-accent"></div>
        </div>
    );
};

export default Loader;
