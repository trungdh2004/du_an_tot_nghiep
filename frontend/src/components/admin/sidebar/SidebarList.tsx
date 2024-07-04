import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { LuLayoutDashboard } from "react-icons/lu";
import sidebarConfig from "@/config/sidebarAdmin";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";

const SidebarList = () => {
	const location = useLocation();


	return (
		<div>
			{sidebarConfig?.map((item, index) => {
				if (item.children) {
					return (
						<Accordion type="multiple" className="" key={index}>
							<AccordionItem value="item-1" className="border-none pt-2">
								<AccordionTrigger className="pb-2 border-b-none h-10 w-full px-4 group py-3 gap-2 flex items-center hover:bg-[rgba(24,119,242,0.08)] rounded-md cursor-pointer">
									<p className="text-sm font-semibold text-[#4b5563] group-hover:text-blue-500 cursor-pointer">
										{item.label}
									</p>
								</AccordionTrigger>
								<AccordionContent className="pb-0 pl-4" datatype="open">
									<div className="space-y-1  mt-2 ">
										{item.children.map((row: any) => (
											<SidebarItem
												key={item.path}
												label={row.label}
												Icon={row.icon}
												path={`/admin${item.path}${row.path}`}
												isAction={
													location.pathname === `/admin${item.path}${row.path}`
												}
											/>
										))}
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					);
				}

				return (
					<SidebarItem
						key={item.path}
						label={item.label}
						Icon={item.icon}
						path={`/admin${item.path}`}
						isAction={location.pathname === `/admin${item.path}`}
						isParent
					/>
				);
			})}
		</div>
	);
};

export default SidebarList;
