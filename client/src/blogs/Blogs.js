import React from "react";
import { Link } from "react-router-dom";
import ZariDivider from "../components/ZariDivider";

// Blog Images
import SareeImg from "./images/TBS-0067_823x-1-700x385.webp";
import NailPaintImg from "./images/indian-hairstyles-for-women.webp";
import HairStyleImg from "./images/Heels_Banners_mobile-1.webp";
import HeelsImg from "./images/pink-nails-lead-art.webp";
import LipstickImg from "./images/istockphoto-1425609087-612x612-1.webp";
import WalletImage from "./images/4EE46596-BB26-48F2-8918-6AF0E32F6E68_1_201_a.webp";
import EyelinerImg from "./images/5-Common-Mistakes-You-Could-Make-Using-an-Eyeliner-Pencil-2-1-1024x576-1.webp";
import EssentialWalletImg from "./images/What-Is-a-Wallet-Essential-Features-User-Needs-and-Purchasing-Tips.webp";
import PerfectWalletImg from "./images/best-women-wallets-gucci-review-luxe-digital-780x520-1.webp";
import WalletVsClutchImg from "./images/examples-of-clutch-wallets.webp";
import StylishWalletImg from "./images/66bc5d19344d490c2308267c-styleelin-women-short-cute-3-colors-1.webp";
import FaceShapeImg from "./images/108901ae-eafc-47b4-9c6c-28d6e377d27d-1.webp";
import DayToNightImg from "./images/blog03_v03.webp";
import FoundationImg from "./images/Lotus_Makeup_Fondation.webp";
import EverydayNaturalMakeupImg from "./images/s4Lgx3SSr5U8RMVNnBrJ-1.webp";
import MakeupProductsImg from "./images/What-Are-the-Basic-Makeup-Products-for-Beginners_1024x1024-1.webp";
import ShoeStylesImg from "./images/4-1.webp";
import TrackPantImg from "./images/skd7446eaw23limgrn-3_823x-1.webp";
import TshirtImg from "./images/c21f230f-6aea-4237-8440-72920ec04b991713262064062HELLCATWomenPrintedRawEdgeT-shirt3-1.webp";
import PantImg from "./images/straightleg-ponte-pants-navy-107-Model-1.webp";

export const blogs = [
    {
        id: 1,
        image: SareeImg,
        title: "Best Saree Styles & Trends in 2025",
        date: "May 15, 2025",
        category: "Fashion",
        description:
            "Discover the latest saree trends of 2025 including Banarasi silk, pastel sarees, cape sarees, ruffle sarees, draped sarees, and sustainable fashion ideas for every occasion.",
        link: "/top-saree-styles-trends",
    },

    {
        id: 2,
        image: NailPaintImg,
        title: "Women’s Best Nail Paint Styles",
        date: "May 16, 2025",
        category: "Beauty",
        description:
            "Explore the best nail paint colors, trendy nail art designs, chrome nails, velvet nails, ombré nails, and stylish manicure ideas for women in 2025.",
        link: "/womens-best-nail-paint",
    },

    {
        id: 3,
        image: HairStyleImg,
        title: "Women’s Best Hair Styles in 2025",
        date: "May 18, 2025",
        category: "Hair",
        description:
            "Find the latest women's hairstyles including ultra-short bob, mixie cut, French bob, fairy waves, balayage colors, and celebrity hairstyle inspiration.",
        link: "/womens-best-hair-styles",
    },

    {
        id: 4,
        image: HeelsImg,
        title: "Women’s Best Heels",
        date: "May 20, 2025",
        category: "Fashion",
        description:
            "Learn about the most stylish women's heels including stilettos, wedges, platform heels, kitten heels, block heels, slingbacks, and the latest footwear trends.",
        link: "/womens-best-heels",
    },

    {
        id: 5,
        image: LipstickImg,
        title: "Top 10 Women’s Best Lipstick in 2025",
        date: "May 25, 2025",
        category: "Beauty",
        description:
            "Discover the top lipstick brands, matte lipsticks, glossy lipsticks, luxury lip colors, Indian beauty brands, and the latest lipstick trends for women in 2025.",
        link: "/womens-best-lipstick",
    },

    {
        id: 6,
        image: WalletImage,
        title: "Best Budget-Friendly Wallet Brands That Look Premium",
        date: "May 25, 2025",
        category: "Fashion",
        description:
            "Explore the best budget-friendly wallet brands that look premium in 2025. Compare Zouk, Lavie, Baggit, Caprese, Aldo, H&M, Forever 21, and Lino Perros with prices, features, and buying tips.",
        link: "/best-budget-friendly-wallet",
    },

    {
        id: 7,
        image: EyelinerImg,
        title: "Top 10 Best Eyeliners in 2025",
        date: "May 25, 2025",
        category: "Beauty",
        description:
            "Explore the best eyeliners of 2025 including waterproof liquid eyeliners, gel eyeliners, kajal pencils, matte finishes, luxury brands, and affordable Indian favorites.",
        link: "/best-eyeliners",
    },

    {
        id: 8,
        image: EssentialWalletImg,
        title: "Essential Features Every Women’s Wallet Should Have",
        date: "May 25, 2025",
        category: "Fashion",
        description:
            "Discover the essential wallet features every woman should look for in 2025, including RFID protection, multiple card slots, secure closures, premium materials, stylish designs, and smart storage options.",
        link: "/essential-features-wallet",
    },

    {
        id: 9,
        image: PerfectWalletImg,
        title: "How to Choose the Perfect Wallet for Your Lifestyle",
        date: "May 25, 2025",
        category: "Fashion",
        description:
            "Learn how to choose the perfect wallet for your lifestyle with this complete guide covering wallet types, materials, security features, travel wallets, RFID protection, and buying tips.",
        link: "/perfect-wallet-for-your-lifestyle",
    },

    {
        id: 10,
        image: WalletVsClutchImg,
        title: "Wallet vs. Clutch: What’s the Best Choice for You?",
        date: "May 25, 2025",
        category: "Fashion",
        description:
            "Compare wallets and clutches in detail, including features, materials, functionality, style, travel use, hybrid options, and find the perfect accessory for your lifestyle.",
        link: "/wallet-vs-clutch",
    },

    {
        id: 11,
        image: StylishWalletImg,
        title: "Top 7 Stylish Women’s Wallets to Buy in 2025",
        date: "May 25, 2025",
        category: "Fashion",
        description:
            "Explore the top stylish women’s wallets of 2025 featuring luxury, vegan, RFID-protected, travel-friendly, and designer wallet collections for every budget and lifestyle.",
        link: "/stylish-womens-wallets",
    },

    {
        id: 12,
        image: FaceShapeImg,
        title: "Makeup for Different Face Shapes: Tips to Enhance Your Natural Features",
        date: "May 31, 2025",
        category: "Beauty",
        description:
            "Learn how to apply makeup according to your face shape using contouring, highlighting, blush placement, and brow shaping techniques to enhance your natural beauty.",
        link: "/makeup-for-different-face-shapes-tips-to-enhance-your-natural-features",
    },

    {
        id: 13,
        image: DayToNightImg,
        title: "Day to Night Makeup Transformation: Quick Tips for Working Women",
        date: "May 25, 2025",
        category: "Beauty",
        description:
            "Learn quick day-to-night makeup transformation tips for working women. Refresh your makeup in just 10–15 minutes with simple tricks for eyes, lips, blush, brows, and a polished evening look.",
        link: "/day-to-night-makeup-transformation",
    },

    {
        id: 14,
        image: FoundationImg,
        title: "How to Choose the Right Foundation for Your Skin Tone",
        date: "May 25, 2025",
        category: "Beauty",
        description:
            "Learn how to choose the right foundation for your skin tone with this complete guide covering undertones, skin types, finishes, coverage levels, shade matching, and expert makeup tips.",
        link: "/foundation-for-your-skin-tone",
    },

    {
        id: 15,
        image: EverydayNaturalMakeupImg,
        title: "Everyday Natural Makeup Look: Step-by-Step Guide for Beginners",
        date: "May 25, 2025",
        category: "Beauty",
        description:
            "Follow this complete beginner-friendly guide to create an everyday natural makeup look with skincare prep, foundation, concealer, brows, eyes, blush, highlighter, and lips for a fresh, polished appearance.",
        link: "/everyday-natural-makeup-look-step-by-step-guide-for-beginners",
    },

    {
        id: 16,
        image: MakeupProductsImg,
        title: "Top 5 Must-Have Best Makeup Products for Every Woman in 2025",
        date: "May 25, 2025",
        category: "Beauty",
        description:
            "Discover the top 5 must-have makeup products every woman needs in 2025, including skin tints, mascara, cream blush, lip oils, brow gels, trending ingredients, and expert beauty tips.",
        link: "/makeup-products",
    },

    {
        id: 17,
        image: ShoeStylesImg,
        title: "Women’s Best Shoe Styles & Trends in 2025",
        date: "July 20, 2026",
        category: "Fashion",
        description:
            "Discover the latest women's shoe styles and footwear trends for 2025, including chunky sneakers, platform sandals, loafers, heels, ballet flats, combat boots, eco-friendly shoes, and more.",
        link: "/womens-shoe-styles-trends",
    },

    {
        id: 18,
        image: TrackPantImg,
        title: "Women’s Best Track Pant Styles & Trends in 2025",
        date: "July 20, 2026",
        category: "Fashion",
        description:
            "Discover the latest women's track pant styles and trends in 2025, including high-waisted track pants, cargo joggers, flared styles, co-ord sets, sustainable fabrics, and modern athleisure fashion.",
        link: "/best-track-pant",
    },

    {
        id: 19,
        image: TshirtImg,
        title: "Women’s Best T-Shirt Styles & Trends in 2025",
        date: "July 20, 2026",
        category: "Fashion",
        description:
            "Discover the latest women’s t-shirt styles and trends in 2025 including oversized tees, graphic t-shirts, crop tops, polo shirts, sustainable cotton tees, and modern fashion ideas.",
        link: "/best-t-shirt",
    },

    {
        id: 19,
        image: PantImg,
        title: "Women’s Best Pant Styles & Trends in 2025",
        date: "July 20, 2026",
        category: "Fashion",
        description:
            "Explore the latest women's pant styles and trends in 2025 including wide-leg pants, cargo pants, straight-leg trousers, co-ord sets, sustainable pants, and modern fashion ideas.",
        link: "/best-pant",
    },
];

function Blogs() {
    return (
        <>
            <title>Fashion & Beauty Blogs | Fashion Freude</title>
            <meta name="title" content="Fashion & Beauty Blogs | Fashion Freude" />
            <meta
                name="description"
                content="Explore the latest articles on women's fashion, beauty tips, hair styles, footwear trends, nail art inspiration, and makeup guides at Fashion Freude."
            />
            <meta
                name="keywords"
                content="fashion blog, beauty trends, makeup guides, women hairstyles, footwear trends, Fashion Freude blogs"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="canonical" href="https://fashionfreude.com/blogs" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://fashionfreude.com/blogs" />
            <meta property="og:title" content="Fashion & Beauty Blogs | Fashion Freude" />
            <meta
                property="og:description"
                content="Explore the latest articles on women's fashion, beauty tips, hair styles, footwear trends, nail art inspiration, and makeup guides."
            />
            <meta property="og:image" content="https://fashionfreude.com/logo.png" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content="https://fashionfreude.com/blogs" />
            <meta name="twitter:title" content="Fashion & Beauty Blogs | Fashion Freude" />
            <meta
                name="twitter:description"
                content="Explore the latest articles on women's fashion, beauty tips, hair styles, footwear trends, nail art inspiration, and makeup guides."
            />
            <meta name="twitter:image" content="https://fashionfreude.com/logo.png" />

            <main className="bg-ivory">
                <header className="border-b border-sand bg-cream">
                    <div className="container-luxe py-16 text-center sm:py-20">
                        <p className="eyebrow">The Journal</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
                            Latest Fashion &amp; Beauty Articles
                        </h1>
                        <ZariDivider className="mt-6" />
                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                            Stay updated with the latest women's fashion, beauty tips, hairstyles,
                            footwear trends, nail art inspiration, and styling ideas.
                        </p>
                    </div>
                </header>

                <section className="container-luxe py-16 sm:py-20">
                    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog) => (
                            <Link
                                to={blog.link}
                                key={blog.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="overflow-hidden">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        loading="lazy"
                                        className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <p className="eyebrow text-gold">{blog.category}</p>
                                    <h3 className="mt-3 font-display text-2xl leading-snug text-ink transition-colors group-hover:text-maroon">
                                        {blog.title}
                                    </h3>
                                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                                        {blog.description}
                                    </p>
                                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium tracking-wide text-gold">
                                        Continue reading
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

export default Blogs;
