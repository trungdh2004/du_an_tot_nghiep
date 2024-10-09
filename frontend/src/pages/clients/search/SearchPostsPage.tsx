import { optimizeCloudinaryUrl } from "@/common/localFunction";
import { IBlogSearch } from "@/types/blogs";
import { Link } from "react-router-dom";

type Props = {
	blog:IBlogSearch
}
const SearchPostsPage = ({blog}:Props) => {
	return (
		<>
		<div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
  <div className="flex-shrink-0">
    <img
      className="object-cover w-full h-48"
      src={blog?.thumbnail_url && optimizeCloudinaryUrl(blog?.thumbnail_url, 450, 470)}
      alt=""
    />
  </div>
  <div className="flex flex-col justify-between flex-1 p-6 bg-white">
    <div className="flex-1">
      
      <Link to="#" className="block mt-2">
        <p className="text-xl font-semibold text-gray-900">
          {blog?.meta_title}
        </p>
        <p className="mt-3 text-base text-gray-500">
          {blog?.meta_description}
        </p>
      </Link>
    </div>
    <div className="flex items-center mt-6">
      <div className="flex-shrink-0">
        <a href="#">
          <span className="sr-only">Roel Aufderehar</span>
          <img
            className="w-10 h-10 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </a>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">
          <a href="#" className="hover:underline">
            Roel Aufderehar
          </a>
        </p>
        <div className="flex space-x-1 text-sm text-gray-500">
          <time dateTime="2020-03-16">Mar 16, 2020</time>
          
        </div>
      </div>
    </div>
  </div>
</div>
		</>
	);
};

export default SearchPostsPage;
