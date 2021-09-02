/* global alert */
import { useSelector } from 'react-redux'
import Image from 'next/image'

import CheckOutProduct from '../components/CheckOutProduct'
import Header from '../components/Header'
import { selectItems, selectTotal } from '../slices/basketSlice'
import Currency from 'react-currency-formatter'
import { useSession } from 'next-auth/client'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe(process.env.stripe_public_key)

const checkout = () => {
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const [session] = useSession()
  const createCheckoutSession = async () => {
    const stripe = await stripePromise
    // Call the backend to create a checkout session..
    const checkoutSession = await axios.post('/api/createCheckoutSession',
      {
        items: items,
        email: session.user.email
      })
    // Redirect user to checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })
    if (result.error) alert(result.error.message)
  }
  return (
    <div className='bg-gray-100'>
      <Header />

      <main className='lg:flex max-w-screen-xl mx-auto'>
        {/* Left basket */}
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            src='https://links.papareact.com/ikj'
            width={1020}
            height={250}
          />
          <div className='flex flex-col space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0
                ? 'Your Basket is empty'
                : `Shopping Basket (${items.length})`}
            </h1>

            {items.map((item, i) => (
              <CheckOutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Right cost */}
        <div className='flex flex-col bg-white p-10 shadow-md'>
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap'>Subtotal ({items.length}) items:
                <span clasName='font-bold'>
                  <Currency quantity={total} />
                </span>
              </h2>
              <button
                role='link'
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </>
          )}
        </div>
        <div />
      </main>
    </div>
  )
}

export default checkout
