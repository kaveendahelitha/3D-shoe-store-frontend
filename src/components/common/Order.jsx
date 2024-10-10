import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Order() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image on the left side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-4 sm:px-6 lg:px-8">
          <div className="lg:col-span-1">
            {/* Main Product Image */}
            <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
              <img
                alt={product.images[0].alt}
                src={product.images[0].src}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product Information on the right side */}
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
            <p className="text-3xl tracking-tight text-gray-900 mt-4">{product.price}</p>

            {/* Reviews */}
            <div className="flex items-center mt-6">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                      'h-5 w-5 flex-shrink-0',
                    )}
                  />
                ))}
              </div>
              <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {reviews.totalCount} reviews
              </a>
            </div>

            {/* Product Form */}
            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <fieldset className="mt-4">
                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <Radio
                        key={color.name}
                        value={color}
                        className={classNames(
                          color.selectedClass,
                          'relative flex cursor-pointer items-center justify-center rounded-full p-0.5',
                        )}
                      >
                        <span
                          className={classNames(
                            color.class,
                            'h-8 w-8 rounded-full border border-black border-opacity-10',
                          )}
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <fieldset className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4"
                  >
                    {product.sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock ? 'cursor-pointer bg-white text-gray-900' : 'bg-gray-50 text-gray-200',
                          'relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase',
                        )}
                      >
                        <span>{size.name}</span>
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <button
                type="submit"
                className="mt-10 w-full bg-indigo-600 text-white font-medium text-base py-3 rounded-md hover:bg-indigo-700"
              >
                Add to bag
              </button>
            </form>

            {/* Description */}
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>
              <p className="mt-4 text-base text-gray-600">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
