import React, { useState } from 'react';

function ProductPage() {
  const product = {
    id: 1,
    name: 'Sample Product',
    description: 'This is a sample product with detailed description and high-quality features.',
    price: 99.99,
    image: 'sample-product-image.png',
    variants: [
      { id: 1, type: 'Size', options: ['S', 'M', 'L', 'XL'] },
      { id: 2, type: 'Color', options: ['Red', 'Blue', 'Green', 'Black'] },
    ],
  };

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

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

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">

        <div className="w-full md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
        </div>


        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <span className="block text-2xl font-bold mb-4">${product.price.toFixed(2)}</span>


          <div className="mb-4">
            <h2 className="text-lg font-semibold">Select Size:</h2>
            <div className="flex gap-2 mt-2">
              {product.variants[0].options.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-3 py-1 rounded-lg border ${
                    selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  } hover:bg-gray-300`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Select Color:</h2>
            <div className="flex gap-2 mt-2">
              {product.variants[1].options.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`px-3 py-1 rounded-lg border ${
                    selectedColor === color ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  } hover:bg-gray-300`}
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


          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

