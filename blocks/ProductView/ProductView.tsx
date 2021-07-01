/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useMemo, useState, useEffect } from 'react'
import { Themed, jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'
import Button from '../Button/Button'
import Thumbnail from '@components/common/Thumbnail'
import OptionPicker from '@components/common/OptionPicker'
import { NextSeo } from 'next-seo'
import { useUI } from '@components/ui/context'
import { useAddItemToCart } from '@lib/shopify/storefront-data-hooks'
import {
  prepareVariantsWithOptions,
  prepareVariantsImages,
  getPrice,
} from '@lib/shopify/storefront-data-hooks/src/utils/product'
import Image from 'next/image'
import NoSSR from '@components/common/NoSSR'
import { LoadingDots } from '@components/ui'
import ProductLoader from './ProductLoader'

interface Props {
  className?: string
  children?: any
  product: ShopifyBuy.Product
  renderSeo?: boolean
  description?: string
  title?: string
}

const ProductBox: React.FC<Props> = ({
  product,
  renderSeo = true,
  description = product.description,
  title = product.title,
}) => {
  const [loading, setLoading] = useState(false)
  const addItem = useAddItemToCart()
  const colors: string[] | undefined = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'color')
    ?.values?.map((op) => op.value as string)

  const sizes: string[] | undefined = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'size')
    ?.values?.map((op) => op.value as string)

  const variants = useMemo(
    () => prepareVariantsWithOptions(product?.variants),
    [product?.variants]
  )
  const images = useMemo(() => prepareVariantsImages(variants, 'color'), [
    variants,
  ])

  const { openSidebar } = useUI()
  const [peakingImage, setPeakingImage] = useState(
    null as { src: string } | null
  )

  const [variant, setVariant] = useState(variants[0] || {})
  const [color, setColor] = useState(variant.color)
  const [size, setSize] = useState(variant.size)

  useEffect(() => {
    const newVariant = variants.find((variant) => {
      return (
        (variant.size === size || !size) && (variant.color === color || !color)
      )
    })

    if (variant.id !== newVariant?.id) {
      setVariant(newVariant)
      setPeakingImage(null)
    }
  }, [size, color, variants, variant.id])

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem(variant.id, 1)
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      {renderSeo && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: 'website',
            title: title,
            description: description,
            images: [
              {
                url: product.images?.[0]?.src!,
                width: 800,
                height: 600,
                alt: title,
              },
            ],
          }}
        />
      )}
      <div sx={{ position: 'relative', height: 902 }} className="type-wrapper">
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: '20',
            position: 'absolute',
            border: '2px solid green',
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: 16,
          }}
        >
          <div>
          <h1 className="text-3xl text-white mb-0 pb-0">{title}</h1>
            <Grid  columns={2}>
              {colors?.length && (
                <OptionPicker
                  key="Color"
                  name="Color"
                  options={colors}
                  selected={color}
                  onChange={(event) => setColor(event.target.value)}
                />
              )}
              {sizes?.length && (
                <OptionPicker
                  key="Size"
                  name="Size"
                  options={sizes}
                  selected={size}
                  onChange={(event) => setSize(event.target.value)}
                />
              )}
            </Grid>
          <Button
            name="add-to-cart"
            disabled={loading}
            sx={{ margin: 2, display: 'block' }}
            onClick={addToCart}
          >
            <span className="flex flex-row justify-between mr-2">
              <span>Add to Cart {loading && <LoadingDots />}</span>
              {getPrice(variant.priceV2.amount, variant.priceV2.currencyCode)}
            </span>
          </Button>
          </div>
        </div>
        <div
          sx={{
            border: '1px solid gray',
            padding: 2,
            marginBottom: 2,
            position: 'absolute',
            zIndex: '0',
            width: '100%',
            height: '100%',
          }}
        >
          {variant.image && (
            <Image
              src={peakingImage?.src || variant.image.src}
              layout="fill"
              alt={title}
              priority
              quality={85}
              className="object-center object-cover pointer-events-none"
            />
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

const ProductView: React.FC<{
  product: string | ShopifyBuy.Product
  renderSeo?: boolean
  description?: string
  title?: string
}> = ({ product, ...props }) => {
  return (
    <ProductLoader product={product}>
      {(productObject) => <ProductBox {...props} product={productObject} />}
    </ProductLoader>
  )
}
export default ProductView
