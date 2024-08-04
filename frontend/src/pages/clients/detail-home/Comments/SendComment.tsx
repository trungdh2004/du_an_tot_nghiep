import { Button } from "@/components/ui/button";

const SendComment = () => {
	return (
		<div className="flex items-start gap-2">
			<div className="w-10 h-10 min-w-10 min-h-10 max-w-10 max-h-10 ">
				<img
					src="https://i.pinimg.com/564x/71/07/3d/71073d78daf2072dc0a785160a530439.jpg"
					alt=""
					className="w-full h-full object-cover rounded-full"
				/>
			</div>
			<div className="flex-1 flex justify-start flex-col items-end gap-3">
				<div
					className="w-full justify-self-start border-b border-gray-200  outline-none break-all"
					contentEditable
					data-placeholder={"Viết bình luận..."}
				/>
				<div className="flex items-center gap-3">
					<Button className="bg-transparent hover:bg-black/5 text-slate-500 rounded-lg px-5">
						Huỷ
					</Button>
					<Button className="bg-blue-500 text-black/70 px-5 hover:bg-blue-600">
						Bình luận
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SendComment;
