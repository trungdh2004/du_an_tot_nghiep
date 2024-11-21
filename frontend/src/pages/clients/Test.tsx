import { Rnd } from "react-rnd";
import { useEffect, useRef, useState } from "react";
const Test = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		// Yêu cầu quyền truy cập vào camera và gán luồng video vào thẻ video
		const startVideo = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
				});
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
			} catch (error) {
				console.error("Lỗi khi truy cập camera:", error);
			}
		};

		startVideo();

		// Dọn dẹp luồng khi component bị hủy
		return () => {
			if (videoRef.current && videoRef.current.srcObject) {
				const stream = videoRef.current.srcObject;
				const tracks = stream.getTracks();
				tracks.forEach((track) => track.stop());
			}
		};
	}, []);
	return (
		<div className="w-full min-h-screen flex justify-center items-center">
			<div
				className="w-[500px] h-[500px] border relative overflow-hidden"
				//   ref={refBoxParent}
				id="boxChane"
			>
				<Rnd
					default={{
						x: 0,
						y: 0,
						width: 166,
						height: 219,
					}}
					bounds="#boxChane"
					lockAspectRatio={128 / 169}
					className="z-[2] border border-gray-50 border-opacity-40"
					minHeight={169}
					minWidth={128}
					// size={{ width: this.state.width, height: this.state.height }}
					// position={{ x: this.state.x, y: this.state.y }}
					onDragStop={(e, d) => {
						console.log("d", d);

						//   this.setState({ x: d.x, y: d.y });
					}}
					onResizeStop={(e, direction, ref, delta, position) => {
						//   this.setState({
						//     width: ref.style.width,
						//     height: ref.style.height,
						//     ...position,
						//   });

						console.log({
							direction,
							ref,
							delta,
							position,
						});
					}}
				>
					<img
						src="https://res.cloudinary.com/dundmo7q8/image/upload/v1730643972/shopApp/to6udmkh7eanwg7nudl3.png"
						alt=""
						className="w-full h-full"
					/>
					<div className="inset-0 absolute z-[2]"></div>
				</Rnd>

				<video
					className="inset-0 absolute scaleX-1"
					ref={videoRef}
					autoPlay
					style={{ transform: "scaleX(-1)" }}
					// playsInline
				></video>
			</div>
		</div>
	);
};

export default Test;
