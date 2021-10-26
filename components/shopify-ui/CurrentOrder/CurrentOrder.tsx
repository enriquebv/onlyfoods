import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import { useEffect } from 'react'

export default function CurrentOrder() {
  const { data } = useCart()

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )

  useEffect(() => console.log(data, total, subTotal), [data, total, subTotal])

  return (
    <section>
      <h2>Tu pedido</h2>
    </section>
  )
}
