/* global fetch */
import Head from 'next/head'

import Banner from '../components/Banner/Banner'
import Header from '../components/Header'
import ProductFeed from '../components/ProductFeed'
import { getSession } from 'next-auth/client'
export default function Home ({ products }) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon</title>
      </Head>
      <Header />

      <main className='max-w-screen-xl mx-auto'>
        {/* Banner */}
        <Banner />

        {/* ProductFeed */}
        <ProductFeed products={products} />
      </main>
    </div>
  )
}

// GET >>> https://fakestoreapi.com/products/

export async function getServerSideProps (context) {
  const session = await getSession(context)
  const products = await fetch('https://fakestoreapi.com/products/').then(
    (res) => res.json()
  )

  return {
    props: {
      products,
      session
    }
  }
}
