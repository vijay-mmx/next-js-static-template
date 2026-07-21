import CTA from "@/components/home/cta";
import FarmsSlider from "@/components/home/farms-slider";
import FeaturedCategories from "@/components/home/featured-categories";
import Featuredproducts from "@/components/home/featured-products";
import Hero from "@/components/home/hero";
import Quote from "@/components/home/quote";
import Stats from "@/components/home/stats";
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
            <Featuredproducts />
            <CTA />
            <Stats />
        </>
    );
}
