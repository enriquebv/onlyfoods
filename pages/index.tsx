import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import commerce from '@lib/api/commerce'

// Components
import { Layout } from '@components/common'
import SidebarCollections from '@components/shopify-ui/SidebarCollections/SidebarCollections'
import CurrentOrder from '@components/shopify-ui/CurrentOrder/CurrentOrder'
import SearchBar from '@components/shopify-ui/SearchBar/SearchBar'
import LastOrdersModal from '@components/shopify-ui/LastOrdersModal/LastOrdersModal'

export async function getServerSideProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  return (
    <>
      <SearchBar />
      <SidebarCollections />
      <CurrentOrder />
    </>
  )
}

Home.Layout = Layout
