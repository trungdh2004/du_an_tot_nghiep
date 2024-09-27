import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { BiLike } from "react-icons/bi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import Actions from "./Actions";
import { useState } from "react";
import { Comment } from "@/types/TypeObjectComment";
import { useAuth } from "@/hooks/auth";

interface IProps {
	handlOpenFeedback: () => void;
	handleLike: () => void;
	handleDislike: () => void;
	comment: any;
}

const Reaction = ({
	handlOpenFeedback,
	handleLike,
	handleDislike,
	comment,
}: IProps) => {
  const { authUser } = useAuth();
  console.log(comment);
  
  const checkLike = comment?.reactions.includes(authUser?._id);
  console.log(checkLike);
  
	return (
		<div className="flex items-center justify-between pt-2">
			<div className="flex items-center gap-2">
				<div className="">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								{checkLike ? (
									<AiFillLike
										size={20}
										className="text-blue-500 cursor-pointer"
										onClick={() => {
											handleDislike();
										}}
									/>
								) : (
									<AiOutlineLike
										onClick={() => {
											handleLike();
										}}
										className="cursor-pointer"
										size={20}
									/>
								)}
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
				{comment?.reactions_count > 0 && (
					<div className="flex gap-1">
						<div className="bg-white p-1 rounded-full w-6">
							<AiFillLike className="text-blue-400" />
						</div>
						<span className="text-sm">{comment?.reactions_count}</span>
					</div>
				)}
			</div>

			<Actions />
		</div>
	);
};

export default Reaction;
