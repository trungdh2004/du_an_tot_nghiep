import React from 'react'

const AccountIndex = () => {
  return (
    <div className='w-full bg-white px-8 '>
      <div className="py-5 border-b border-[#efedec]">
        <h3 className="text-base md:text-lg text-[#333333] font-medium">Hồ Sơ Của Tôi</h3>
        <span className="text-sm md:text-base text-gray-700">Quản lý thông tin hồ sơ để bảo mật tài khoản của bạn</span>
      </div>
      <div className="pt-8 px-10">
        <form>
          <div className="flex ">
            <div className="w-[65%] pr-24">
              <div className="flex items-center pb-10">
                <label className='w-[40%] text-right text-[rgba(85,85,85,.8)] pr-4'>Tên đăng nhập</label>
                <input type="text" className='min-w-[280px] w-full border border-gray-300 rounded-sm px-3 py-2 ' placeholder='Ducnt2323' />
              </div>
              <div className="flex items-center pb-8">
                <label className='w-[40%] text-right text-[rgba(85,85,85,.8)] pr-4'>Tên</label>
                <input type="text" className='min-w-[280px] w-full border border-gray-300 rounded-sm px-3 py-2 ' placeholder='Ducnt2323' />
              </div>
              <div className="flex items-center pb-8">
                <label className='w-[40%] text-right text-[rgba(85,85,85,.8)] pr-4'>Email</label>
                <input type="text" className='min-w-[280px] w-full border border-gray-300 rounded-sm px-3 py-2 ' placeholder='Ducnt2323' />
              </div>
              <div className="flex items-center pb-8">
                <label className='w-[40%] text-right text-[rgba(85,85,85,.8)] pr-4'>Số điện thoại</label>
                <input type="text" className='min-w-[280px] w-full border border-gray-300 rounded-sm px-3 py-2 ' placeholder='Ducnt2323' />
              </div>
              <div className="flex items-center pb-8">
                <label className='w-[40%] text-right text-[rgba(85,85,85,.8)] pr-4'>Giới tính</label>
                <div className="w-full flex items-center gap-x-2">
                  <div className="">
                    <input type="radio" name="" id="" className='' />
                    <label htmlFor="" className='px-2'>Nam</label>
                  </div>
                  <div className="">
                    <input type="radio" name="" id="" className='' />
                    <label htmlFor="" className='px-2'>Nữ</label>
                  </div>
                  <div className="">
                    <input type="radio" name="" id="" className='' />
                    <label htmlFor="" className='px-2'>Khác</label>
                  </div>
                </div>
              </div>
              <div className="flex items-center pb-8">
                <label className='w-[40%] text-right text-[rgba(85,85,85,.8)] pr-4'>Ngày sinh</label>
                <input type="text" className='min-w-[280px] w-full border border-gray-300 rounded-sm px-3 py-2 ' placeholder='Ducnt2323' />
              </div>
            </div>
            <div className="w-[35%] flex flex-col justify-center items-center border-l border-gray-200 ">
              <div className="size-[100px]">
                <img src="" className="w-full h-full rounded-full bg-gray-300" alt="" />
              </div>
              <button className='border border-gray-300 rounded-sm px-4 py-2 mt-4 mb-3'>Chọn Ảnh</button>
              <div className="flex flex-col text-[#999] text-sm md:text-base">
                <span className="">Dụng lượng file tối đa 1 MB
                </span>
                <span className=""> Định dạng:.JPEG, .PNG
                </span>
              </div>
            </div>
          </div>
          <div className="w-[50%] mx-auto">
            <button className='text-white bg-blue-500 px-5 py-2 border rounded-sm'>Lưu</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccountIndex