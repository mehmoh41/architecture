import { client } from '@/lib/client'
import { HeroBanner, Product, FooterBanner } from '@/components'

export default function Home({ products, bannerData }) {
  return (
    <>
      <HeroBanner
        heroBanner={
          // Get the first object from the array
          bannerData.length && bannerData[0]
        }
      />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export const getStaticProps = async () => {
  // Fetch all products and banner in the Sanity dataset
  const products = await client.fetch(`*[_type == "product"]`)
  const bannerData = await client.fetch(`*[_type == "banner"]`)

  return {
    props: {
      products,
      bannerData,
    },
  }
}
