import { client } from "@/lib/client";
import { Product } from "@/components";

export default function ProductPage({ products, categories }) {
  return (
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
  );
}

export const getStaticProps = async () => {
  // Fetch all products and banner in the Sanity dataset
  const products = await client.fetch(`*[_type == "product"]`);
  const categories = await client.fetch(`*[_type == "category"]`);
  return {
    props: {
      products,
      categories,
    },

    // TODO: Change this if the application needs to be updated more frequently or less or not at all
    // Revalidate at most once per 60 seconds
    revalidate: 60,

    // TIP: The rate of revalidation is a tradeoff between the freshness of the data and the performance of the page
  };
};
