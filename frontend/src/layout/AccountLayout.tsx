import React from 'react'
import { Outlet } from 'react-router-dom'

const AccountLayout = () => {
  return (
    <>
      <div className="padding max-md:px-0 g bg-main">
        <div className="flex w-full gap-8 py-12 px-0  ">
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