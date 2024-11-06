import React, { useState } from 'react';

function Cart() {

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product Name 1', description: 'Description of the product.', price: 9999.99, quantity: 1, image: 'data:image/jpeg;base64,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' },
    { id: 2, name: 'Product Name 2', description: 'Description of the product.', price: 20000.99, quantity: 2, image: 'data:image/jpeg;base64,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' },
  ]);

 
  const increaseQuantity = (id: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };


  const decreaseQuantity = (id: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };


  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.075; 
  const total = subtotal + tax;

  return (
    <div className="m-auto w-full max-w-[1120px] p-3">

      <div className="flex pt-3 justify-between pb-10 flex-col sm:flex-row items-center">
        <div className="flex items-center gap-4">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxmDQ59_9Y1u1S8JZqMydcOpsG_v07sPiUQA&s" alt="Logo" className="w-10 h-10" />
          
        </div>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Profile</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>
        </div>
      </div>


      <h2 className="text-center font-bold text-[32px] lg:text-[48px] pt-8">Shopping Cart</h2>
      

      <div className="flex flex-col gap-8 py-8">
        {cartItems.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <img src={item.image} alt={item.name} className="w-32 h-32 rounded-lg" />
            <div className="sm:ml-8 flex flex-col w-full sm:w-auto text-center sm:text-left">
              <h3 className="font-semibold text-[20px]">{item.name}</h3>
              <p className="text-[16px] text-gray-500">{item.description}</p>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-[18px] font-bold">${item.price.toFixed(2)}</span>
                <div className="flex items-center gap-2 ml-auto">
                  <button 
                    onClick={() => decreaseQuantity(item.id)} 
                    className="bg-gray-300 w-8 h-8 flex justify-center items-center rounded-full active:bg-slate-500 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-[18px]">{item.quantity}</span>
                  <button 
                    onClick={() => increaseQuantity(item.id)} 
                    className="bg-gray-300 w-8 h-8 flex justify-center items-center rounded-full  active:bg-slate-500 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="bg-[#9900FF] h-auto lg:h-[200px] rounded-[30px] mt-10 p-8 text-white">
        <h3 className="text-[24px] font-semibold">Order Summary</h3>
        <div className="flex justify-between pt-4">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2">
          <span>Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold pt-2 text-[20px]">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="bg-white text-[#9900FF] mt-6 w-full py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;