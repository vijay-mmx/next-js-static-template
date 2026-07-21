import Button from "@/components/global/button";
import SectionHead from "@/components/global/section-head";
import React from "react";

const Welcome = () => {
    return (
        <section className="section-padding">
            <div className="container">
                <div className="welcome">
                    <div className="d-flex justify-content-center align-content-center welcome-container">
                        <div className="col-12 col-lg-8 ">
                            <div className=" text-center">
                                <SectionHead
                                    className="welcome-tittle"
                                    subtitle={"OUR STORY"}
                                    title={
                                        <>
                                            World Largest <br/> Flower Retailer
                                        </>
                                    }
                                />
                                <div className=" mt-4">
                                    <p className="paragraph">
                                        A family-owned and operated group specializing in the cultivation, import, export, wholesale, and retail
                                        of fresh cut flowers, complemented by bespoke floral design services and indoor plant solutions.
                                    </p>
                                    <Button text="More About Us" className="mt-4" as="a" href="#" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Welcome;
