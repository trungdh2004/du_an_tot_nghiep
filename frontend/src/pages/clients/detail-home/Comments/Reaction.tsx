import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { BiDislike, BiLike } from "react-icons/bi";
const Reaction = () => {
	return (
		<div className="flex items-center gap-2">
			<div className="">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								className="border-none rounded-full size-9 hover:bg-gray-200"
							>
								<BiLike size={18} />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<p>Thích</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<div className="">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								className="border-none rounded-full size-9 hover:bg-gray-200"
							>
								<BiDislike size={18} />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<p>Bỏ thích</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<div className="p-0.5 px-2 hover:bg-gray-200 cursor-pointer rounded-full">
				<span className="text-xs font-semibold">Phản hồi</span>
			</div>
		</div>
	);
};

export default Reaction;
