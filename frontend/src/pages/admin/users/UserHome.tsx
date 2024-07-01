import User from "@/components/client/Header/User";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { DataTableDemo } from "./Users";
import SearchUser from "./SearchUser";
import { Input } from "@/components/ui/input";
import { IoFilter } from "react-icons/io5";
import UserIndex from "@/pages/admin/users/UserIndex";

const UserHome = () => {
	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-3">
				<h4 className="font-medium text-xl">Danh sách người dùng</h4>
				<div className="flex justify-between">
					<Input placeholder="Tìm kiếm người dùng" className="w-[40%]" />
					<div className="pr-5">
						<IoFilter size={20} />
					</div>
				</div>
			</div>
			<Tabs className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="user">User</TabsTrigger>
					<TabsTrigger value="userban">UserBan</TabsTrigger>
        </TabsList>
			</Tabs>
		</div>
	);
};

export default UserHome;


const Index = () => {
  // call api dùng chung

  return (
    <div>
      <h5>danh sách người dùng</h5>
      <header>
        {/* form search  truyền searchObject*/}
      </header>

      {/* tab */}
      <div></div> 


      {/* content */}
      table data 
    </div>
  )
}

