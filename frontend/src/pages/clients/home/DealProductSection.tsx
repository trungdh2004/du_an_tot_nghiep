import React from "react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/common/func";
import Countdown from "./CoutDown";

const DealProductSection: React.FC = () => {
  const countdownDate = new Date(2024, 12, 26);
  return (
    <section className="py-12 bg-[#f6f8fa]">
      <div className="padding">
        <div className="flex flex-col items-center gap-10 lg:flex-row">
          {/* Nội dung sản phẩm */}
          <div className="flex flex-col gap-6 lg:w-1/2">
            <span className="text-sm font-medium tracking-wide text-gray-500 uppercase">
            Sản phẩm nổi bật
            </span>
            
            <h2 className="text-[#2c3f58] text-4xl font-medium leading-tight">
            Quần jean thời trang NucShop
            </h2>
            
            <p className="pr-0 text-gray-600 lg:pr-20">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi quibusdam sit enim non delectus eaque architecto, a, qui accusamus quod adipisci soluta. Earum est dignissimos et cum, tempora aspernatur ratione.
            </p>
            
            <div className="flex flex-wrap items-center gap-8 mt-2">
              <div className="flex items-center">
                <span className="text-[#2c3f58] text-4xl font-medium">{formatCurrency(800000)}</span>
                <span className="ml-4 text-xl text-gray-400 line-through">{formatCurrency(1300000)}</span>
              </div>
              
              <button className="bg-[#2c3f58] text-white px-8 py-3 rounded hover:bg-[#1f2937] transition-colors">
                Mua ngay
              </button>
            </div>
            <div className="flex flex-col items-start gap-2 countDownWrap">
              <h6 className="text-lg font-medium text-gray-500">Kết thúc vào</h6>
              <Countdown/>
            </div>
          </div>
          <div className="relative flex justify-center lg:w-1/2 lg:justify-start">
            <motion.div
              className="absolute bg-[#ddecea] rounded-full inset-x-6 inset-y-14 md:inset-y-7  md:inset-x-10"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            ></motion.div>

            <img
              src="https://toinh-ecommerce.vercel.app/images/sliders/slide-1.png"
              alt="Ulima Fashionable Jeans"
              className="relative z-10 h-auto max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealProductSection;
