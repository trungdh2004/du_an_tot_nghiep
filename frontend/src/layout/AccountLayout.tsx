import React from 'react'
import { Outlet } from 'react-router-dom'

const AccountLayout = () => {
  return (
    <>
      <div className="px-0 sm:px-[30px] md:px-[40px] bg-main">
        <div className="flex w-full gap-8 py-20 px-0 lg:px-12 ">
          <div className="hidden lg:flex w-[250px] ">
            <div className="">
              Nguyễn Tuấn Đức
            </div>
          </div>
          <div className="flex-1 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountLayout