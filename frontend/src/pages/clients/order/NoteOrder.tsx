import { Textarea } from "@/components/ui/textarea";
import React from "react";

const NoteOrder = () => {
	return (
		<div className="py-2 pb-4">
			<div className="lg:flex flex-col gap-3 bg-white border border-gray-200 px-4 py-2">
				<h3>Ghi chú</h3>
				<Textarea />
			</div>
		</div>
	);
};

export default NoteOrder;
