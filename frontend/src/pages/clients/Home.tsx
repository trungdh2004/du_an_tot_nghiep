import ButtonCrease from "@/components/ButtonCrease";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useStore from "@/store/home.store";
import React, { useState } from "react";

const Home = () => {
	// const [index, setIndex] = useState(1);
	const { cart } = useStore();

	return (
		<>
			{cart?.map((row) => (
				<p>
					{row.name} - {row.quantity}
				</p>
			))}
			<ButtonCrease />
		</>
	);
};

export default Home;
