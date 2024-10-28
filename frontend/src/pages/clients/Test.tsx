import instance from "@/config/instance";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Select, { ActionMeta, GetOptionValue, components } from "react-select";

const listMin = Array.from({ length: 60 }, (_, i) => i);
const listHours = Array.from({ length: 24 }, (_, i) => ({
	value: i + 1,
	name: i + 1,
}));

type ActionTypes =
	| "clear"
	| "create-option"
	| "deselect-option"
	| "pop-value"
	| "remove-value"
	| "select-option"
	| "set-value";
export const customStyles = {
	control: (provided: any, state: any) => ({
		...provided,
		width: "100%", // Làm cho control phủ toàn bộ chiều rộng
		border: "1px solid #e2e8f0",
		boxShadow: state.isFocused ? "0px 0px 0px 1.2px #101010" : "none",
		"&:hover": {
			borderColor: "#e2e8f0", // Border color on hover
		},
		cursor: "pointer",
	}),
	dropdownIndicator: () => ({
		display: "none", // Ẩn con trỏ xuống
	}),
	indicatorSeparator: () => ({
		display: "none", // Ẩn đường ngăn cách
	}),
	multiValue: () => ({
		backgroundColor: "#1877f214",
		display: "flex",
		margin: "2px",
		borderRadius: "5px",
	}),
	multiValueRemove: () => ({
		borderRadius: "2px",
		padding: "0 4px",
		display: "flex",
		"&:hover": {
			backgroundColor: "transparent",
		},
		justifyContent: "center",
		alignItems: "center",
	}),
	option: () => ({
		backgroundColor: "transparent",
		padding: "8px 12px",
		fontSize: "inherit",
		cursor: "pointer",
		width: "100%",
		display: "block",
		"&:hover": {
			backgroundColor: "#1877f214",
		},
	}),
};

const TestComponent = () => {
	const [open, setOpen] = React.useState<boolean>(false);
	const [value, setValue] = React.useState<any>(null);
	const [options, setOption] = React.useState<any[]>([]);
	const [searchObject, setSearchObject] = React.useState<any>({
		pageIndex: 1,
		totalOptionPage: 0,
		totalAllOptions: 0,
		totalPage: 0,
	});
	const [t, setT] = React.useState<any>(null);
	const [keyword, setKeyword] = React.useState("");

	const fetchData = async (page: number) => {
		try {
			const { data } = await instance.post("test/pagingTest", {
				pageIndex: page,
				keyword,
			});

			if (data?.content?.length > 0) {
				// if (fillerOptions) {
				// 	newOptions = newOptions.filter(fillerOptions);
				// }
				const newOptions = [...options, ...data?.content];
				setOption(newOptions);
				setSearchObject(data);
			} else {
				setOption([]);
			}
		} catch (error) {}
	};

	React.useEffect(() => {
		if (open) {
			getData();
		}
	}, [open, keyword]);

	const getData = async () => {
		let newPage = 1;
		fetchData(newPage);
	};

	const loadPagingData = () => {
		let page = searchObject.pageIndex;
		fetchData(page + 1);
	};

	React.useEffect(() => {
		console.log("options", options);
	}, [options]);

	const handleChangeText = (value: string) => {
		if (t) {
			clearTimeout(t);
		}
		setT(
			setTimeout(() => {
				setKeyword(value);
			}, 500),
		);
	};

	const renderOptions = () => {

	}

	return (
		<div className="flex items-center justify-center w-full min-h-screen">
			<div className="w-[500px]">
				<Select
					isClearable={false}
					value={value}
					onChange={(options) => {
						setValue(options);
					}}
					menuIsOpen={open}
					onMenuOpen={() => {
						setOpen(true);
						setKeyword("");
					}}
					onMenuClose={() => {
						setOpen(false);
						setOption([]);
						setSearchObject({
							pageIndex: 1,
							totalOptionPage: 0,
							totalAllOptions: 0,
							totalPage: 0,
						});
						setKeyword("");
						setT(null);
					}}
					options={options}
					formatOptionLabel={(item) => item?.name}
					getOptionValue={(item) => item?.value}
					classNamePrefix="react-select"
					styles={customStyles}
					onMenuScrollToBottom={(e) => {
						if (searchObject.pageIndex < searchObject.totalPage) {
							loadPagingData();
						}
					}}
					components={{ Option: CustomOption }}
					onInputChange={handleChangeText}
					// placeholder={placeholder}
					// classNames={customStyles}
				/>
			</div>
		</div>
	);
};

export default TestComponent;

const CustomOption = (props: any) => {
	console.log({ props });

	return (
		<components.Option {...props}>
			<div style={{ display: "flex", alignItems: "center" }}>
				{/* Tùy chỉnh thêm icon, hình ảnh hoặc kiểu dáng cho mỗi item */}
				<img
					src={`/avatar_25.jpg`}
					alt=""
					style={{ marginRight: "8px", borderRadius: "50%" }}
				/>
				<span>{props.data.name}</span>
			</div>
		</components.Option>
	);
};
