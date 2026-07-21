import Hero from "@/components/home/hero";
import Quote from "@/components/home/quote";
import Verticals from "@/components/home/verticals";
import Welcome from "@/components/home/welcome";
import { Metadata } from "next";

// CHANGE THIS Metadata according to you site
export const metadata: Metadata = {
    title: {
        absolute: "meta title",
    },
    description: "meta descp",
    openGraph: {
        title: {
            absolute: "meta title",
        },
        description: "meta descp",
    }
}

export default function Home() {
    return (
        <>
            <Hero />
            <Welcome />
            <Verticals />
            <Quote />
        </>
    );
}
