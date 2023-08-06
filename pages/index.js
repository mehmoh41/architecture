import { client } from "@/lib/client";
import { HeroBanner, Product, FooterBanner, BlockQoute } from "@/components";

export default function Home({ products, bannerData, categories }) {
  return (
    <>
      <HeroBanner
        heroBanner={
          // Get the first object from the array
          bannerData.length && bannerData[0]
        }
      />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => {
          return (
            <Product
              key={product._id}
              product={product}
              categories={categories}
            />
          );
        })}
      </div>
      {/* <BlockQoute /> */}
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

export const getStaticProps = async () => {
  // Fetch all products and banner in the Sanity dataset
  const products = await client.fetch(`*[_type == "product"]`);
  const bannerData = await client.fetch(`*[_type == "banner"]`);
  const categories = await client.fetch(`*[_type == "category"]`);

  return {
    props: {
      products,
      bannerData,
      categories,
    },

    // TODO: Change this if the application needs to be updated more frequently or less or not at all
    // Revalidate at most once per 60 seconds
    revalidate: 60,

    // TIP: The rate of revalidation is a tradeoff between the freshness of the data and the performance of the page
  };
};
