import { Link } from "react-router-dom";

const LatestNewsBlog = () => {
	return (
		<div className="padding my-20">
			<div className=" relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50">
				<h2 className="text-3xl md:text-4xl font-semibold">
					Những tin tức mới nhất. <span>Từ blog Ciseco</span>
				</h2>
			</div>
			<div className="grid lg:grid-cols-2 gap-6 md:gap-8">
				<div className="group relative flex flex-col h-full">
					<div className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden">
						<div className="w-full h-full ">
							<img
								src="https://ciseco-nextjs.vercel.app/_next/image?url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F6168061%2Fpexels-photo-6168061.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D2%26h%3D750%26w%3D1260&w=1080&q=75"
								alt=""
								className="object-cover w-full h-full "
							/>
						</div>
					</div>
					<div className=" mt-8 pr-10 flex flex-col">
						<h2 className="block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl capitalize">
							turpis cursus in hac habitasse platea dictumst quisque sagittis
							purus
						</h2>
						<span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
							<span className="line-clamp-2">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Obcaecati vero perspiciatis ullam ea? Nihil accusamus similique
								debitis tempore mollitia? Aperiam.
							</span>
						</span>
						<div className="inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 text-sm mt-5">
							<Link
								to={"/"}
								className="flex-shrink-0 relative flex items-center space-x-2"
							>
								<div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-7 w-7 text-sm ring-1 ring-white dark:ring-neutral-900">
									<img
										src="https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FImage-1.e0d669ee.png&w=128&q=75"
										alt=""
										className="absolute inset-0 w-full h-full object-cover rounded-full"
									/>
								</div>
								<span className="block text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
									Anthony Wyat
								</span>
							</Link>
							<span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
								·
							</span>
							<span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">
								{" "}
								20-12-2024
							</span>
						</div>
					</div>
				</div>
				<div className="grid gap-6 md:gap-8">
					<div className="flex">
						<div className="flex flex-col h-full py-2">
							<h2 className="block font-semibold text-base">
								<Link to={""} className="line-clamp-2 capitalize">
									in mollis nunc sed id semper risus in hendrerit gravida
								</Link>
							</h2>
							<span className="hidden sm:block my-3 text-slate-500 dark:text-slate-400 ">
								<span className="line-clamp-2">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Deserunt dolorem voluptatibus numquam ut pariatur officiis?
								</span>
							</span>
							<div className="mt-auto hidden sm:block">
								<div className="inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 text-sm leading-none">
									<Link
										to={""}
										className="flex-shrink-0 relative flex items-center space-x-2"
									>
										<div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-7 w-7 text-sm ring-1 ring-white dark:ring-neutral-900">
											<img
												src="https://ciseco-nextjs.vercel.app/_next/image?url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F6168061%2Fpexels-photo-6168061.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D2%26h%3D750%26w%3D1260&w=1080&q=75"
												alt=""
												className="object-cover w-full h-full rounded-3xl"
											/>
										</div>
										<span className="block text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
											Giada Mann
										</span>
									</Link>
									<span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
										·
									</span>
									<span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">
										{" "}
										20-12-2024
									</span>
								</div>
							</div>
						</div>
						<div className="block relative h-full flex-shrink-0 w-2/5 sm:w-1/3 ml-3 sm:ml-5">
							<div className="absolute inset-0">
								<img
									src="https://ciseco-nextjs.vercel.app/_next/image?url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F3579484%2Fpexels-photo-3579484.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D600%26lazy%3Dload&w=640&q=75"
									alt=""
									className="object-cover w-full h-full rounded-xl sm:rounded-3xl"
								/>
							</div>
						</div>
					</div>
					{/*  */}
					<div className="flex">
						<div className="flex flex-col h-full py-2">
							<h2 className="block font-semibold text-base">
								<Link to={""} className="line-clamp-2 capitalize">
									in mollis nunc sed id semper risus in hendrerit gravida
								</Link>
							</h2>
							<span className="hidden sm:block my-3 text-slate-500 dark:text-slate-400 ">
								<span className="line-clamp-2">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Deserunt dolorem voluptatibus numquam ut pariatur officiis?
								</span>
							</span>
							<div className="mt-auto hidden sm:block">
								<div className="inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 text-sm leading-none">
									<Link
										to={""}
										className="flex-shrink-0 relative flex items-center space-x-2"
									>
										<div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-7 w-7 text-sm ring-1 ring-white dark:ring-neutral-900">
											<img
												src="https://ciseco-nextjs.vercel.app/_next/image?url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F6168061%2Fpexels-photo-6168061.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D2%26h%3D750%26w%3D1260&w=1080&q=75"
												alt=""
												className="object-cover w-full h-full rounded-3xl"
											/>
										</div>
										<span className="block text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
											Giada Mann
										</span>
									</Link>
									<span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
										·
									</span>
									<span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">
										{" "}
										20-12-2024
									</span>
								</div>
							</div>
						</div>
						<div className="block relative h-full flex-shrink-0 w-2/5 sm:w-1/3 ml-3 sm:ml-5">
							<div className="absolute inset-0">
								<img
									src="https://ciseco-nextjs.vercel.app/_next/image?url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F3579484%2Fpexels-photo-3579484.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D600%26lazy%3Dload&w=640&q=75"
									alt=""
									className="object-cover w-full h-full rounded-xl sm:rounded-3xl"
								/>
							</div>
						</div>
					</div>
					{/*  */}
					<div className="flex">
						<div className="flex flex-col h-full py-2">
							<h2 className="block font-semibold text-base">
								<Link to={""} className="line-clamp-2 capitalize">
									in mollis nunc sed id semper risus in hendrerit gravida
								</Link>
							</h2>
							<span className="hidden sm:block my-3 text-slate-500 dark:text-slate-400 ">
								<span className="line-clamp-2">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Deserunt dolorem voluptatibus numquam ut pariatur officiis?
								</span>
							</span>
							<div className="mt-auto hidden sm:block">
								<div className="inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 text-sm leading-none">
									<Link
										to={""}
										className="flex-shrink-0 relative flex items-center space-x-2"
									>
										<div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-7 w-7 text-sm ring-1 ring-white dark:ring-neutral-900">
											<img
												src="https://ciseco-nextjs.vercel.app/_next/image?url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F6168061%2Fpexels-photo-6168061.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D2%26h%3D750%26w%3D1260&w=1080&q=75"
												alt=""
												className="object-cover w-full h-full rounded-3xl"
											/>
										</div>
										<span className="block text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
											Giada Mann
										</span>
									</Link>
									<span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
										·
									</span>
									<span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">
										{" "}
										20-12-2024
									</span>
								</div>
							</div>
						</div>
						<div className="block relative h-full flex-shrink-0 w-2/5 sm:w-1/3 ml-3 sm:ml-5">
							<div className="absolute inset-0">
								<img
									src="https://ciseco-nextjs.vercel.app/_next/image?url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F3579484%2Fpexels-photo-3579484.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D600%26lazy%3Dload&w=640&q=75"
									alt=""
									className="object-cover w-full h-full rounded-xl sm:rounded-3xl"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LatestNewsBlog;
