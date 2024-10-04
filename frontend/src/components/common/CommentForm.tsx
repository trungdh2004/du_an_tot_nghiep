import React, { useRef } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
import { useAuth } from "@/hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";

interface CommentEditorProps {
	onSubmit: () => void;
	openComment?: boolean;
	avatar: string;
	handleClose?: () => void;
	content: string;
	handleChange: (content: string) => void;
	handleOpen?: () => void;
}

const CommentEditor: React.FC<CommentEditorProps> = ({
	onSubmit,
	openComment = false,
	avatar,
	handleClose,
	content,
	handleChange,
	handleOpen,
}) => {
	const editorRef = useRef<FroalaEditorComponent | null>(null);
	const { isLoggedIn } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	Froalaeditor.DefineIcon("insertLink", {
		NAME: "link",
		SVG_KEY: "insertLink",
	});
	Froalaeditor.RegisterCommand("insertLink", {
		title: "Nhập link",
		focus: true,
		undo: true,
		refreshAfterCallback: true,
		callback: function () {
			const url = window.prompt("Nhập link");
			if (url) {
				this.link.insert(url, url, {
					class: "link",
				});
			}
		},
	});
	const config = {
		tableStyles: {
			"no-border": "No border",
		},
		placeholderText: "Nhập bình luận mới của bạn",
		charCounterCount: false,
		toolbarButtons: ["bold", "italic", "underline", "emoticons", "insertLink"],
		lineBreaks: true,
		quickInsertButtons: false,
		selector: {
			useClasses: false,
		},
		pluginsEnabled: false,
		quickInsertTags: null,
	};
	return (
		<div className="">
			<div className="fr-body flex items-start w-full gap-1 md:gap-3">
				<div className="size-7 md:size-10 rounded-full flex items-center overflow-hidden justify-center bg-white border">
					<img src={avatar} alt="" className="w-full h-full object-cover" />
				</div>

				{openComment ? (
					<div className="flex-1">
						<FroalaEditor
							tag="textarea"
							config={config}
							model={content}
							onModelChange={handleChange}
							ref={editorRef}
						/>
						<div className="flex justify-end mt-2">
							<button
								className="mr-2 py-1 px-3 border-none rounded-sm bg-gray-100 hover:bg-gray-200 cursor-pointer text-xs sm:text-sm"
								onClick={handleClose}
							>
								HỦY
							</button>
							<button
								className="py-1 px-3 border-none rounded-sm bg-blue-500 cursor-pointer text-xs sm:text-sm text-white hover:bg-blue-600"
								onClick={onSubmit}
							>
								BÌNH LUẬN
							</button>
						</div>
					</div>
				) : (
					<div
						className="h-7 md:h-8 flex-1 rounded-sm flex items-center border-b cursor-pointer text-gray-300 px-2"
						onClick={() => {
							if (!isLoggedIn) {
								const productUrl = location.pathname;
								navigate(
									`/auth/login?product=${encodeURIComponent(productUrl)}`,
								);
								return;
							}
							if (handleOpen) {
								handleOpen();
							}
						}}
					>
						Mời bạn nhập bình luận
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentEditor;
