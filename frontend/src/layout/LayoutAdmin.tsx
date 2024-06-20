import React from 'react'
import { Outlet } from "react-router-dom";
const LayoutAdmin = () => {
  return (
    <div className='px-5 grid grid-cols-12'>
      <div className='w-[250px] col-span-3'>

      </div>
      <div className='col-span-9'>
        <Outlet/>
      </div>
    </div>
  )
}

export default LayoutAdmin