import {
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "@/components/ui/sheet";
import { AccordionItem } from "@radix-ui/react-accordion";
import { IoMenu } from "react-icons/io5";
import { NavLink } from "react-router-dom";
const MenuMobile = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<IoMenu className="text-2xl cursor-pointer" />
			</SheetTrigger>
			<SheetContent side={"left"} className="flex flex-col gap-y-5">
				<SheetHeader>
					<div className="flex items-center gap-3">
						<div className="size-14 ">
							<img
								className="w-full h-full object-cover rounded-full"
								src="https://i.pinimg.com/564x/06/25/9f/06259fed99c906d43f691b1d1d4956cc.jpg"
								alt=""
							/>
						</div>
						<div className="">
							<p className="text-sm">Huy Tới</p>
							<span className="w-32 line-clamp-1 text-xs font-normal text-[#757575] ">
								eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGM3ZDkxY2FiYTE5NTM1NDIyZjBiMyIsImlhdCI6MTcxNzc2NzAzNSwiZXhwIjoxNzIyOTUxMDM1fQ.lj3LCrMDAQ3GAgMIWhe-zukjgT1RXHmQMt3C-XQoLV0
							</span>
						</div>
					</div>
				</SheetHeader>
				<div className=" ">
					<ul className="text-black font-medium flex flex-col items-start justify-center  *:py-4 *:px-1 *:rounded *:cursor-pointer  transition-all *:w-full ">
						<li className=" hover:bg-[#919eab14] has-[.active]:bg-[#919eab14]">
							<NavLink to={"/"} className="block">
								Trang chủ
							</NavLink>
						</li>
						<li className="py-0">
							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="item-1">
									<AccordionTrigger className="py-4 hover:bg-[#919eab14] has-[.active]:bg-[#919eab14]">
										<NavLink to={"/shop"} className="block">
											Sản phẩm
										</NavLink>
									</AccordionTrigger>
									<AccordionContent>
										<ul className=" w-full   bg-white   *:cursor-pointer  *:px-5 *:py-2 *:text-nowrap  ">
											<li className="hover:bg-[#919eab14]">Áo nike</li>
											<li className="hover:bg-[#919eab14]">Áo nike</li>
											<li className="hover:bg-[#919eab14]">Áo nike</li>
											<li className="hover:bg-[#919eab14]">Áo nike</li>
										</ul>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</li>

						<li className=" hover:bg-[#919eab14] has-[.active]:bg-[#919eab14]">
							<NavLink to={"/blogs"} className="block">
								Bài viết
							</NavLink>
						</li>
						<li className=" hover:bg-[#919eab14] has-[.active]:bg-[#919eab14]">
							<NavLink to={"/contacts"} className="block">
								Liên hệ{" "}
							</NavLink>
						</li>
						<li className=" hover:bg-[#919eab14] has-[.active]:bg-[#919eab14]">
							<NavLink to={"/introduce"} className="block">
								Giới thiệu
							</NavLink>
						</li>
						<li className=" hover:bg-[#919eab14] has-[.active]:bg-[#919eab14]">
							<NavLink to={"/auth/register"} className="block">
								Đăng ký{" "}
							</NavLink>
						</li>
						<li className=" hover:bg-[#919eab14] has-[.active]:bg-[#919eab14]">
							<NavLink to={"/auth/login"} className="block">
								Đăng nhập
							</NavLink>
						</li>
					</ul>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MenuMobile;
