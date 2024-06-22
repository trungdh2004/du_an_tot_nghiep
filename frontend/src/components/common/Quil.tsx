import { useState } from "react";
import ReactQuill from "react-quill";
// value, handleValue,
const Quil = () => {
	const [value, setValue] = useState("");
	return <ReactQuill theme="snow" value={value} onChange={setValue} />;
};

export default Quil;
