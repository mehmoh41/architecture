/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client"; // used to build the sanity image url

export default function Product({
  product: { image, name, slug, price, category },
  categories,
}) {
  const { setQty } = useStateContext();
  // getting the specific category name from all categories matching their _ref and _id
  let result = categories?.filter((o1) =>
    category.some((o2) => o1._id === o2._ref)
  );

  return (
    <div onClick={() => setQty(1)} className="relative">
      {/* the current part is a sanity specific thing that you need to add to the slug to get the correct path */}
      <Link href={`/product/${slug.current}`}>
        <div className="product-card shadow-lg transition-shadow">
          <img
            src={urlFor(image && image[0])}
            alt="product first"
            width={250}
            height={250}
          />
          <div className="px-3 py-1 flex justify-between items-center">
            <div>
              <p className="font-semibold mt-1">{name}</p>
              <p className="product-price mt-2">${price}</p>
            </div>
            <div className="absolute top-0 left-0">
              <p className="bg-indigo-500 px-3 py-1 text-white">
                {result?.map((cat, index) => {
                  let comma = index === result.length - 1 ? "" : " | ";
                  return cat.name + comma;
                })}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
