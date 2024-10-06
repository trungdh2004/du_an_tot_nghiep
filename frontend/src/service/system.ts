import instance from "@/config/instance";

const url = "system";
export const searchPopupService = ({ keyword }: { keyword: string }) => {
	const uri = `${url}/searchClient?keyword=${keyword}`;
	return instance.get(uri);
};
export const searchDetailPageService = ({
	keyword,
	type,
}: {
	keyword: string;
	type: string;
}) => {
	const uri = `${url}/searchClient?keyword=${keyword}&type=${type}`;
	return instance.get(uri);
};
