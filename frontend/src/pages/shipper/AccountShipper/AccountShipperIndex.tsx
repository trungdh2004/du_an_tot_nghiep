import { Input } from "@/components/ui/input";
import React from "react";

const AccountShipperIndex = () => {
	return (
		<div>
			<header className="p-2 md:px-4 md:mb-4 sticky top-0 bg-main w-full z-10">
				<h2 className="font-semibold text-xl sm:text-2xl leading-8">
					Thông tin cá nhân
				</h2>
                <p className="text-base font-normal">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
			</header>

            <div className="grid grid-cols-12 gap-4 p-4 mt-2 border-t h-auto">
                <div className="col-span-8 border-r ">
                    <table className="w-full space-y-2">
                        <tr >
                            <td className="w-1/5 px-2 text-end pb-8">Tên đăng nhập</td>
                            <td></td>
                            <td className="w-4/5 px-4 pb-8">
                                <Input readOnly/>
                            </td>
                        </tr>
                        <tr >
                            <td className="w-1/5 px-2 text-end pb-8">Tên đăng nhập</td>
                            <td></td>
                            <td className="w-4/5 px-4 pb-8">
                                <Input readOnly/>
                            </td>
                        </tr>
                        <tr >
                            <td className="w-1/5 px-2 text-end pb-8">Tên đăng nhập</td>
                            <td></td>
                            <td className="w-4/5 px-4 pb-8">
                                <Input/>
                            </td>
                        </tr>
                        <tr >
                            <td className="w-1/5 px-2 text-end pb-8">Tên đăng nhập</td>
                            <td></td>
                            <td className="w-4/5 px-4 pb-8">
                                <Input/>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="col-span-4">
                    <div className="size-20 bg-red-500 rounded-full"></div>
                </div>
            </div>
		</div>
	);
};

export default AccountShipperIndex;
