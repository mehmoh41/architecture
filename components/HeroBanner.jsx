/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { urlFor } from "@/lib/client";
import Image from "next/image";

export default function HeroBanner({ heroBanner }) {
  const image = urlFor(heroBanner.image).url();
  return (
    <div
      className="relative "
      // style={{
      //   backgroundPosition: "50%",
      //   backgroundImage: `${image}`,
      //   height: 500,
      // }}
    >
      <Image
        className="overflow-hidden bg-cover bg-no-repeat w-full h-[550px]"
        src={image}
        width={1000}
        height={400}
        alt={heroBanner.product}
      />
      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
        <div className="flex h-full items-center justify-center">
          <div className="px-6 text-center text-white md:px-12 max-w-3xl mx-auto">
            <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
              The art of interior design is fantastic, and I love it.
              {/* We are professionals in interior design, architecture desing and
              home design. */}
            </h1>
            <Link
              className="rounded border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200"
              href={"/product"}
            >
              See Our Products
            </Link>
          </div>
        </div>
      </div>
    </div>

    // <div className="hero-banner-container">
    //   <div>
    //     <p className="beats-solo">{heroBanner.smallText}</p>
    //     <h3 className="sale-title">{heroBanner.midText}</h3>
    //     <h1>{heroBanner.largeText1}</h1>

    //     {/* TODO: change to nextjs Image component */}
    //     <Image
    //       src={image}
    //       alt="headphones"
    //       className="w-full h-auto  absolute"
    //       // style={{ width: "100%", height: "auto" }} // layout="responsive" prior to Next 13.0.0
    //       // sizes="(max-width: 800px) 100vw, 800px"
    //       // blurDataURL={mySanityData.image.asset.metadata.lqip}
    //       width={1100}
    //       height={400}
    //     />

    //     <div>
    //       {/* NOTE: Since the slug is the same as product name, we can navigate to /product/heroBanner.product which is the name of the product used on the banner */}
    //       <Link href={`/product/${heroBanner.product}`}>
    //         <button type="button">{heroBanner.buttonText}</button>
    //       </Link>
    //       <div className="desc">
    //         <h5>Description</h5>
    //         <p>{heroBanner.desc}</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
