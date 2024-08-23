import productEmpty from "@/assets/productEmpty.jpg"

const ProductEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={productEmpty} alt="" className="lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] w-[200px] h-[200px] object-cover" />
      <h3 className="lg:text-lg md:text-base text-sm">Không tìm thấy sản phẩm nào theo yêu cầu</h3>
    </div>
  )
}

export default ProductEmpty