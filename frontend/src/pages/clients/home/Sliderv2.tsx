import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Sliderv2 = () => {
	return (
		<div className="bg-gradient-to-br from-[#faf8f1] to-[#f6f3ef] xl:h-[860px] lg:h-[800px] md:h-[580px] sm:h-[500px] h-[350px] max-[420px]:h-[320px] w-full">
			<div className="w-full h-full">
				<div className="relative h-full">
					<Swiper
						className="h-full"
						modules={[Pagination, Autoplay]}
						pagination={{ clickable: true }}
						autoplay={{
							delay: 4000,
							disableOnInteraction: false,
						}}
					>
						<SwiperSlide>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
								className="relative w-full h-full"
							>
								<div className="container relative flex items-center w-full h-full px-4 mx-auto">
									<motion.div
										initial={{ x: -160, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ duration: 0.8 }}
										className="w-1/2"
									>
										<motion.div
											className="text-xs font-semibold tracking-wider uppercase md:text-sm lg:text-lg"
											initial={{ x: -160, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ duration: 0.8, delay: 0.1 }}
										>
											ToinhFashion!
										</motion.div>
										<motion.div
											className="mt-2 text-2xl font-medium capitalize md:mt-5 md:text-4xl lg:text-6xl xl:text-7xl"
											initial={{ x: -160, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ duration: 1, delay: 0.2 }}
										>
											Nâng tầm phong cách của bạn
										</motion.div>
										<motion.div
											initial={{ x: -160, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ duration: 1.2, delay: 0.3 }}
										>
											<Link
												to="/shop"
												className="inline-block px-4 py-2 mt-3 text-xs font-semibold text-white uppercase transition duration-300 bg-red-500 rounded-lg md:mt-8 md:px-10 md:py-4 hover:bg-red-600 md:text-sm md:rounded-xl"
											>
												Mua Ngay
											</Link>
										</motion.div>
									</motion.div>
									<motion.div
										className="absolute bottom-0 right-0 w-3/5 sm:w-1/2 md:-right-4 xl:-right-16"
										initial={{ scale: 1.2 }}
										animate={{ scale: 1 }}
										transition={{ duration: 0.8 }}
									>
										<img
											src="https://toinh-ecommerce.vercel.app/images/sliders/slide-1.png"
											alt="bg1-1"
											className="object-cover w-full h-full"
										/>
									</motion.div>
								</div>
							</motion.div>
						</SwiperSlide>

						<SwiperSlide>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
								className="relative w-full h-full"
							>
								<div className="container relative flex items-center w-full h-full px-4 mx-auto">
									<motion.div
										initial={{ x: -160, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ duration: 0.8 }}
										className="w-1/2"
									>
										<motion.div
											className="text-xs font-semibold tracking-wider uppercase md:text-sm lg:text-lg"
											initial={{ x: -160, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ duration: 0.8, delay: 0.1 }}
										>
											ToinhFashion!
										</motion.div>
										<motion.div
											className="mt-2 text-2xl font-medium capitalize md:mt-5 md:text-4xl lg:text-6xl xl:text-7xl"
											initial={{ x: -160, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ duration: 1, delay: 0.2 }}
										>
											Nâng tầm phong cách của bạn
										</motion.div>
										<motion.div
											initial={{ x: -160, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ duration: 1.2, delay: 0.3 }}
										>
											<Link
												to="/shop"
												className="inline-block px-4 py-2 mt-3 text-xs font-semibold text-white uppercase transition duration-300 bg-red-500 rounded-lg md:mt-8 md:px-10 md:py-4 hover:bg-red-600 md:text-sm md:rounded-xl"
											>
												Mua Ngay
											</Link>
										</motion.div>
									</motion.div>
									<motion.div
										className="absolute bottom-0 right-0 w-3/5 sm:w-1/2 md:-right-4 xl:-right-16"
										initial={{ scale: 1.2 }}
										animate={{ scale: 1 }}
										transition={{ duration: 0.8 }}
									>
										<img
											src="https://toinh-ecommerce.vercel.app/images/sliders/slide-2.png"
											alt="bg1-1"
											className="object-cover w-full h-full"
										/>
									</motion.div>
								</div>
							</motion.div>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default Sliderv2;
