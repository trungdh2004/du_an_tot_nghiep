
import React from 'react'

const Cart = () => {
  return (
      <div className="m-auto w-full max-w-[1120px] p-3">
  <div className="flex pt-3 justify-between pb-10 flex-col sm:flex-row items-center">
    <div className="flex items-center gap-4">
    
      <span className="text-2xl font-bold">NC</span>
    </div>
    <div className="flex gap-4 mt-4 sm:mt-0">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Profile</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>
    </div>
  </div>

  <h2 className="text-center font-bold text-[32px] lg:text-[48px] pt-8">Shopping Cart</h2>
  
  <div className="flex flex-col gap-8 py-8">
    <div className="flex flex-col sm:flex-row items-center bg-gray-100 p-4 rounded-lg shadow-md">
      <img src="product-image-1.png" alt="Product 1" className="w-32 h-32 rounded-lg" />
      <div className="sm:ml-8 flex flex-col w-full sm:w-auto text-center sm:text-left">
        <h3 className="font-semibold text-[20px]">Product Name 1</h3>
        <p className="text-[16px] text-gray-500">Description of the product.</p>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-[18px] font-bold">$49.99</span>
          <div className="flex items-center gap-2 ml-auto">
            <button className="bg-gray-300 w-8 h-8 flex justify-center items-center rounded-full">-</button>
            <span className="text-[18px]">1</span>
            <button className="bg-gray-300 w-8 h-8 flex justify-center items-center rounded-full">+</button>
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row items-center bg-gray-100 p-4 rounded-lg shadow-md">
      <img src="product-image-2.png" alt="Product 2" className="w-32 h-32 rounded-lg" />
      <div className="sm:ml-8 flex flex-col w-full sm:w-auto text-center sm:text-left">
        <h3 className="font-semibold text-[20px]">Product Name 2</h3>
        <p className="text-[16px] text-gray-500">Description of the product.</p>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-[18px] font-bold">$29.99</span>
          <div className="flex items-center gap-2 ml-auto">
            <button className="bg-gray-300 w-8 h-8 flex justify-center items-center rounded-full">-</button>
            <span className="text-[18px]">2</span>
            <button className="bg-gray-300 w-8 h-8 flex justify-center items-center rounded-full">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="bg-[#9900FF] h-auto lg:h-[200px] rounded-[30px] mt-10 p-8 text-white">
    <h3 className="text-[24px] font-semibold">Order Summary</h3>
    <div className="flex justify-between pt-4">
      <span>Subtotal:</span>
      <span>$109.97</span>
    </div>
    <div className="flex justify-between pt-2">
      <span>Tax:</span>
      <span>$8.25</span>
    </div>
    <div className="flex justify-between font-bold pt-2 text-[20px]">
      <span>Total:</span>
      <span>$118.22</span>
    </div>
    <button className="bg-white text-[#9900FF] mt-6 w-full py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors">
      Proceed to Checkout
    </button>
  </div>
</div>

  )
}

export default Cart

