import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Bag } from '@components/icons'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import { useCustomer } from 'framework/local/customer'
import useOrders, { Order } from '@lib/shopify-utils'
import { useAddItem } from '@framework/cart'
import useRemoveItem from '@framework/cart/use-remove-item'
import { useState } from 'react'
import useCart from '@commerce/cart/use-cart'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}

export default function Orders() {
  const { data: customer } = useCustomer()
  const orders = useOrders(customer)
  const addItem = useAddItem()
  const removeItem = useRemoveItem()
  const { data: cart } = useCart()

  // State
  const [addingToCart, setAddingToCartt] = useState(false)

  function allOrderProductsQuantity(order: Order) {
    return order.products.reduce((acc, product) => (acc += product.quantity), 0)
  }

  async function resetCart() {
    for await (const item of cart?.lineItems || []) {
      await removeItem(item)
    }
  }

  async function handleRepeatOrder(order: Order) {
    const list = order.products.map((product) => ({
      productId: product.id,
      variantId: product.variantId,
      quantity: product.quantity,
    }))

    await resetCart()

    for await (const item of list) {
      await addItem(item)
    }
  }

  return (
    <section>
      <h1>Ultimos pedidos</h1>
      <ul>
        {orders.map((order) => (
          <li className="order" key={order.id}>
            <p className="title">
              <b>Pedido {order.name}</b> |{' '}
              <span>
                {order.price} ({allOrderProductsQuantity(order)} articulos)
              </span>
              <button
                disabled={addingToCart}
                onClick={(e) => handleRepeatOrder(order)}
              >
                Repetir pedido
              </button>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

Orders.Layout = Layout
