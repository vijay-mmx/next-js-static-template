import FarmsSlider from "@/components/home/farms-slider";
import FeaturedCategories from "@/components/home/featured-categories";
import Hero from "@/components/home/hero";
import Quote from "@/components/home/quote";
import Testimonials from "@/components/home/testimonials";
import Verticals from "@/components/home/verticals";
import Welcome from "@/components/home/welcome";

export default function Home() {
    return (
        <>
            <Hero />
            <Welcome />
            <Verticals />
            <Quote />
            <FarmsSlider />
            <Testimonials />
            <FeaturedCategories />
        </>
    );
}
