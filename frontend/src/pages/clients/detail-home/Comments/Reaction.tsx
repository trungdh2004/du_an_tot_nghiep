import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import Actions from "./Actions";

interface IProps {
	handlOpenFeedback: () => void;
	isLike: boolean;
}

const Reaction = ({ handlOpenFeedback, isLike }: IProps) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<div className="">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="outline"
									className="border-none rounded-full size-9 hover:bg-gray-200"
								>
									{isLike ? (
										<AiFillLike size={20} className="text-blue-500" />
									) : (
										<BiLike size={18} />
									)}
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<p>Thích</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<div className="p-0.5 px-2 hover:bg-gray-200 cursor-pointer rounded-full">
					<span className="text-xs font-semibold" onClick={handlOpenFeedback}>
						Phản hồi
					</span>
				</div>
			</div>
			<Actions />

		</div>
	);
};

export default Reaction;
