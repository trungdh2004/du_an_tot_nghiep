
const PaymentIndex = () => {

  return (
    <>
      {/* // min-[600px]:col-span-6 min-[900px]:col-span-4 h-[360px] */}
      <div className="px-10" >

        <div className="grid grid-cols-12 gap-6 xl:gap-8 mt-8 ">
          <div className="border border-blue-200 bg-gray-100 rounded-[8px] px-4 py-2 col-span-12 min-[600px]:col-span-6 min-[900px]:col-span-4 ">
            <p className="">Có giao dịch thanh toán online với sốt tiên <span className="text-red-500">90.000đ</span>
              , vui long kiểm tra thông tin</p>
            <p className="text-gray-500">2 tuần</p>
          </div>
          <div className="border border-blue-200 bg-gray-100 rounded-[8px] px-4 py-2 col-span-12 min-[600px]:col-span-6 min-[900px]:col-span-4 ">
            <p className="">Có giao dịch thanh toán online với sốt tiên <span className="text-red-500">90.000đ</span>
              , vui long kiểm tra thông tin</p>
            <p className="text-gray-500">2 tuần</p>
          </div>
          <div className="border border-blue-200 bg-gray-100 rounded-[8px] px-4 py-2 col-span-12 min-[600px]:col-span-6 min-[900px]:col-span-4 ">
            <p className="">Có giao dịch thanh toán online với sốt tiên <span className="text-red-500">90.000đ</span>
              , vui long kiểm tra thông tin</p>
            <p className="text-gray-500">2 tuần</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentIndex