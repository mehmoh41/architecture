/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "@/components";

import { useStateContext } from "@/context/StateContext";

// Import the Sanity client
import { client, urlFor } from "@/lib/client";

// -< ProductDetail >- component
export default function ProductDetail({ product, products, categories }) {
  // Get the state from the context
  const { qty, decQty, incQty, onAdd, setShowCart } = useStateContext();

  // Destructure the product object
  const { image, name, details, price, category } = product;
  // State to keep track of which image is selected
  const [index, setIndex] = useState(0);

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };
  // getting the specific category name from all categories matching their _ref and _id
  let result = categories?.filter((o1) =>
    category.some((o2) => o1._id === o2._ref)
  );
  return (
    <div>
      <div className="product-detail-container">
        <div>
          {/* Product - main image (also the image that a user has selected) */}
          <div className="image-container relative">
            <img
              src={urlFor(image && image[index])}
              alt={`${name}`}
              className="product-detail-image"
            />
            <p className="bg-indigo-500 px-3 py-1 text-white absolute top-0 left-0">
              {result?.map((cat, index) => {
                let comma = index === result.length - 1 ? "" : " | ";
                return cat.name + comma;
              })}
            </p>
          </div>

          {/* Product - all images that a user can select to view */}
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                // select image on mouse enter (hover state on desktop, click on mobile)
                onMouseEnter={() => setIndex(i)}
                alt={`${i} ${name}`}
              />
            ))}
          </div>
        </div>

        {/* Product - details */}
        <div className="product-detail-desc">
          <h1 className="text-3xl font-bold capitalize">{name}</h1>

          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4 className="font-semibold text-xl">Description: </h4>
          {/* <p>{details}</p> */}
          <p>{<PortableText value={product.description} />}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => {
                onAdd(product, qty);
              }}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* "You may also like" section - marquee of images */}
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>

        {/* TODO: Add a marquee react library for infinite scrolling */}
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -< getStaticPaths >- and -< getStaticProps >- methods
// Fetch all products from sanity to generate paths (needed for SSG below)
export const getStaticPaths = async () => {
  const products = await client.fetch(`*[_type == "product"]`);

  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,

    // ? the server will return a 404 page for any paths that are not generated at build time. This means that all possible paths for the website must be specified in the paths array returned by getStaticPaths method.
    // fallback: false,

    // ? the server will not return a 404 page for any path that is not generated at build time. Instead, Next.js will wait for the data to be generated on the server and then render the page with the new data.
    fallback: "blocking",
  };
};

// Fetch the product from sanity that matches the slug in the url
// SSG is ideal for headless CMSs like Sanity
export const getStaticProps = async ({ params: { slug } }) => {
  const product = await client.fetch(
    // This is a sanity specific query that will get the product with the slug that matches the slug in the url
    // TIP: the [0] is used so only the first result is returned
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug }
  );

  const products = await client.fetch(`*[_type == "product"]`);
  const categories = await client.fetch(`*[_type == "category"]`);

  return {
    props: {
      product,
      products,
      categories,
    },

    // TODO: Change this if the application needs to be updated more frequently or less or not at all
    // Revalidate at most once per one minute
    revalidate: 60,
  };
};
