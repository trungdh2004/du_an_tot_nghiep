import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoNotificationsOutline } from "react-icons/io5";
const Notification = () => {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<div>
					<IoNotificationsOutline strokeWidth={4} size={20} />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				style={{ boxShadow: "0 -4px 32px rgba(0, 0, 0, .2)" }}
				className="max-sm:w-[300px] w-[400px] py-2 px-1 sm:px-4 *:cursor-pointer  text-[#1d2129] rounded-lg border-none"
			>
				<DropdownMenuLabel>
					<div className="flex items-center justify-between">
						<h6 className="h6 text-lg">Thông báo</h6>
						<p className="text-xs font-normal text-blue-500">Đánh dấu đã đọc</p>
					</div>
				</DropdownMenuLabel>
				<div className="max-h-[68vh] overflow-y-auto scroll-custom">
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<div className="flex items-center justify-start gap-x-2 cursor-pointer">
							<div className="min-w-12 min-h-12 max-w-12 max-h-12">
								<img
									src="https://i.pinimg.com/564x/bc/8d/09/bc8d0915de817023c79a85f26be26ea9.jpg"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
								<span className="text-xs text-gray-500">vài giờ trước</span>
							</div>
						</div>
					</DropdownMenuItem>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem className="flex justify-center font-semibold text-blue-500">
					Xem tất cả thông báo
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Notification;
