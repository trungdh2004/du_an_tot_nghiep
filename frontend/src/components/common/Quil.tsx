import { uploadFileService } from "@/service/upload";
import { useProcessBarLoading } from "@/store/useSidebarAdmin";
import { AxiosError } from "axios";
import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import { toast } from "sonner";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);
const Quil = () => {
	const { setOpen, setClose } = useProcessBarLoading();
	const [value, setValue] = useState("");
	const quillRef = useRef<ReactQuill | null>(null);
	const imageHandler = (e: Event) => {
		const editor = quillRef.current && quillRef.current.getEditor();
		console.log(editor);
		if (!editor) {
			return;
		}
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		input.onchange = async () => {
			const file = input.files?.[0];
			if (file && /^image\//.test(file.type)) {
				console.log(file);
				const formData = new FormData();
				formData.append("image", file);
				try {
					setOpen();
					const { data } = await uploadFileService(formData); // upload data into server or aws or cloudinary
					const url = data.path;
					const range = editor.getSelection();
					console.log("range", range);

					if (range) {
						editor.insertEmbed(range.index, "image", url);
					}
				} catch (error) {
					if (error instanceof AxiosError) {
						toast.error(error.response?.data.message);
					}
				} finally {
					setClose();
				}
			} else {
				toast.error("Bạn chỉ có thể tải lên hình ảnh.");
			}
		};
	};
	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					[{ size: ["small", false, "large", "huge"] }], // dropdown size
					[{ header: [1, 2, 3, 4, 5, 6, false] }], // dropdown Heading
					[{ font: [] }],
					["bold", "italic", "underline", "strike"], // font weight
					["blockquote", "code-block"],
					["link", "image", "formula"], // upload ảnh link
					[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
					[{ script: "sub" }, { script: "super" }], // chỉ số trên/chỉ số dưới
					[{ indent: "-1" }, { indent: "+1" }], // thụt lề/thụt lề
					// [{ direction: "rtl" }], // văn bản chỉ đạo (position)

					[{ color: [] }, { background: [] }], // thả xuống với mặc định từ chủ đề

					[{ align: [] }],
					// ["clean"], // xoá định dạng
				],
				handlers: {
					image: imageHandler,
				},
				resize: {
					locale: {
						// change them depending on your language
						altTip: "Hold down the alt key to zoom",
						floatLeft: "Left",
						floatRight: "Right",
						center: "Center",
						restore: "Restore",
					},
				},
				imageActions: {},
				imageFormats: {},
			},
		}),
		[],
	);

	return (
		<ReactQuill
			ref={quillRef}
			theme="snow"
			value={value}
			onChange={setValue}
			modules={modules}
		/>
	);
};

export default Quil;
