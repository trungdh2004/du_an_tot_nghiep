import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Smile } from "lucide-react";
import ChatMessage from "./ChatMessage";

const ChatContent = () => {
	const messages = [
		{
			id: 1,
			sender: "Scarlett",
			message: "Nice to meet you 😊",
			time: "11:48PM",
			isMe: false,
		},
		{
			id: 2,
			message:
				"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
			time: "11:50PM",
			isMe: true,
		},
        {
			id: 3,
			message:
				"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
			time: "11:50PM",
			isMe: true,
		},
        {
			id: 4,
			message:
				"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
			time: "11:50PM",
			isMe: true,
		},
        {
			id: 5,
			message:
				"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
			time: "11:50PM",
			isMe: false,
		},
	];
	return (
		<div className="flex flex-col h-full">
			<header className="flex items-center justify-between w-full px-3 border-b h-[60px]">
				<div className="flex items-center gap-3">
					<div className="overflow-hidden border rounded-full size-10">
						<img src="/avatar_25.jpg" alt="" />
					</div>
					<div>
						<h2 className="font-semibold">Scarlett</h2>
						<span className="text-sm text-green-500">online</span>
					</div>
				</div>
			</header>
			<ScrollArea className="flex-1 p-4">
				{messages.map((msg) => (
					<ChatMessage key={msg.id} {...msg} />
				))}
			</ScrollArea>

			<div className="p-4 border-t">
				<div className="flex items-center gap-2">
					<Smile className="w-6 h-6 text-gray-500" />
					<Input placeholder="Type your message here..." className="flex-1" />
					<Send className="w-6 h-6 text-purple-500" />
				</div>
			</div>
		</div>
	);
};
export default ChatContent;
