import usePrice from '@commerce/product/use-price'

export interface Order {
  price: string
  subtotalPrice: string
  name: string
  status: 'PAID'
  id: string
  products: OrderProduct[]
}

export interface OrderProduct {
  id: string
  variantId: string
  title: string
  price: string
  priceWithDiscounts: string
  quantity: number
}

function extractNodes(edges: any) {
  return edges.map((n: any) => n.node)
}

function moneyFormat(formatterType: 'eur') {
  const formatters = {
    eur: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
      .format,
  }
  return (value: any) => {
    return formatters[formatterType](Number(value))
  }
}

export default function useOrders(customer?: any): Order[] {
  if (!customer) return []

  const nodes = extractNodes(customer.orders.edges)
  const moneyFormatter = moneyFormat('eur')

  return nodes.map(
    (n: any): Order => ({
      name: n.name,
      status: n.financialStatus,
      id: n.id,
      price: moneyFormatter(n.currentTotalPrice.amount),
      subtotalPrice: moneyFormatter(n.subtotalPriceV2.amount),
      products: extractNodes(n.lineItems.edges).map(
        (p: any): OrderProduct => ({
          id: p.variant.product.id,
          variantId: p.variant.id,
          title: p.title,
          price: moneyFormatter(p.originalTotalPrice.amount),
          priceWithDiscounts: moneyFormatter(p.discountedTotalPrice.amount),
          quantity: Number(p.quantity),
        })
      ),
    })
  )
}
