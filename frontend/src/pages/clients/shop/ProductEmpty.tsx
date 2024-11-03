
const ProductEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={'/no-data-search.png'} alt="" className="lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] w-[200px] h-[200px] object-cover" />
      <h3 className="text-sm lg:text-lg md:text-base">Không tìm thấy sản phẩm nào theo yêu cầu</h3>
    </div>
  )
}

export default ProductEmpty