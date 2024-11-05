import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Decentralization } from "@/service/user-admin";
import { toast } from "sonner";
interface Props {
	open: boolean | string;
	close: () => void;
}
const DiaLogDecentralization = ({ open, close }: Props) => {
	console.log(open);
	const [selectedValue, setSelectedValue] = useState<string | undefined>(
		undefined,
	);
	const handleUpdate = async () => {
		if (selectedValue === undefined) {
			toast.error("Vui lòng chọn người cập nhật");
			return;
		}
		try {
			const { data } = await Decentralization(
				open as string,
				parseInt(selectedValue),
			);
			console.log(data);
			return data;
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Dialog open={!!open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Phân quyền</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<RadioGroup
						className="mt-1"
						value={selectedValue ?? undefined}
						onValueChange={setSelectedValue}
					>
						{[2, 3]?.map((update: any, index: number) => {
							return (
								<>
									<div className="flex justify-between" key={index}>
										<div className="flex gap-3">
											<RadioGroupItem
												value={update}
												// id={`radio-${address._id}`}
												className="lg:w-4 lg:h-4 w-3 h-3"
											/>

											<div className="flex flex-col gap-2">
												<div className="flex gap-3">
													<h3 className="font-medium lg:text-base md:text-base text-sm">
														{update === 2 ? "Nhân viên" : "Admin"}
													</h3>
												</div>
											</div>
										</div>
									</div>
									<hr />
								</>
							);
						})}
					</RadioGroup>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleUpdate}>
						Lưu
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DiaLogDecentralization;
