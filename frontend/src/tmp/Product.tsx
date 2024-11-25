import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function ProductPage() {
  const product = {
    id: 1,
    name: 'Sample Product',
    description: 'This is a sample product with detailed description and high-quality features.',
    price: 99.99,
    image: 'sample-product-image.png',
    stock: 20,
    rating: 4.5,
    reviews: 12,
    variants: [
      { id: 1, type: 'Size', options: ['S', 'M', 'L', 'XL'] },
      { id: 2, type: 'Color', options: ['Red', 'Blue', 'Green', 'Black'] },
    ],
  };

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleSizeChange = (size: React.SetStateAction<string>) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color: React.SetStateAction<string>) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (type: string) => {
    if (type === 'increase') {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:space-x-6 bg-white shadow-lg rounded-lg overflow-hidden">

        <div className="w-full md:w-1/2 flex justify-center">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover md:max-h-96" />
        </div>


        <div className="w-full md:w-1/2 p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-700 mb-3">{product.description}</p>
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} className={i < product.rating ? 'text-yellow-500' : 'text-gray-300'} />
              ))}
            </div>
            <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
          </div>
          <span className="block text-xl sm:text-2xl font-bold mb-4">${product.price.toFixed(2)}</span>


          <p className="mb-4 text-green-600 font-semibold">{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</p>


          <div className="mb-4">
            <h2 className="text-lg font-semibold">Select Size:</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.variants[0].options.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-3 py-1 rounded-lg border ${
                    selectedSize === size ? 'bg-custom-500 text-white' : 'bg-gray-200'
                  } hover:bg-gray-300 transition-all`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Select Color:</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.variants[1].options.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`px-3 py-1 rounded-lg border ${
                    selectedColor === color ? 'bg-custom-500 text-white' : 'bg-gray-200'
                  } hover:bg-gray-300 transition-all`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Quantity:</h2>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleQuantityChange('decrease')}
                className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-400"
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increase')}
                className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-400"
              >
                +
              </button>
            </div>
          </div>


          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto bg-custom-500 text-white px-4 py-2 rounded-lg hover:bg-custom-600 active:bg-custom-700 transition-colors"
          >
            Add to Cart
          </button>
          {isAddedToCart && <p className="mt-2 text-green-500">Product added to cart!</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
