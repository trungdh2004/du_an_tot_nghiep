import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
const Slider = () => {
	return (
		<div className="relative overflow-hidden h-screen flex items-start gap-5 pl-4 lg:pl-10">
			<div className="space-y-5 mt-16 lg:mt-28">
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.5 }}
				>
					<h2 className="text-4xl lg:text-6xl font-bold max-w-[280px] lg:max-w-[650px] text-blue-800">
						We’re changing the way people connect
					</h2>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.5 }}
				>
					<p className="text-base lg:text-2xl text-black/50 max-w-[280px] lg:max-w-3xl">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
						saepe perspiciatis esse ipsum nostrum minus ratione corrupti
						doloribus assumenda vitae mollitia earum vero magni maiores
						voluptatum fugiat error aliquid quos.
					</p>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.5 }}
				>
					<Button className="px-5 py-3 lg:px-14 lg:py-7 capitalize text-base lg:text-xl bg-blue-500 hover:bg-blue-400">
						Mua ngay
					</Button>
				</motion.div>
			</div>
			<div className="absolute -right-5 flex items-center gap-9">
				<div className=" flex-col hidden lg:flex">
					<motion.div
						initial={{ y: -100 }}
						animate={{ y: 0 }}
						transition={{ duration: 1.5 }}
					>
						<div className="w-[185px] h-[250px]">
							<img
								className="w-full h-full object-cover rounded-2xl"
								src="slider-1.png"
								alt=""
							/>
						</div>
					</motion.div>
				</div>
				{/*  */}
				<div className="flex flex-col gap-6">
					<motion.div
						initial={{ y: -100 }}
						animate={{ y: 0 }}
						transition={{ duration: 1.5 }}
					>
						<div className="relative lg:static -right-5 lg:right-0 lg:ml-0 w-[100px] h-[150px]  lg:w-[185px] lg:h-[250px] ">
							<img
								className="w-full h-full object-cover rounded-2xl"
								src="slider-2.png"
								alt=""
							/>
						</div>
					</motion.div>
					<motion.div
						initial={{ y: 100 }}
						animate={{ y: 0 }}
						transition={{ duration: 1.5 }}
					>
						<div className="w-[100px] h-[150px]  lg:w-[185px] lg:h-[250px]">
							<img
								className="w-full h-full object-cover rounded-2xl"
								src="slider-2.png"
								alt=""
							/>
						</div>
					</motion.div>
				</div>
				{/*  */}
				<div className="hidden lg:flex flex-col gap-6 mb-12  ">
					<motion.div
						initial={{ y: -100 }}
						animate={{ y: 0 }}
						transition={{ duration: 1.5 }}
					>
						<div className="w-[180px] h-[254px]">
							<img
								className="w-full h-full object-cover rounded-2xl"
								src="slider-3.png"
								alt=""
							/>
						</div>
					</motion.div>
					<motion.div
						initial={{ y: 100 }}
						animate={{ y: 0 }}
						transition={{ duration: 1.5 }}
					>
						<div className="w-[180px] h-[254px]">
							<img
								className="w-full h-full object-cover rounded-2xl"
								src="slider-3.png"
								alt=""
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Slider;
