import React from "react";
import { motion } from "framer-motion";

const projects = [
  { id: 1, title: "Project 1", imgSrc: "https://picsum.photos/600/400" },
  { id: 2, title: "Project 2", imgSrc: "https://picsum.photos/600/400" },
  { id: 3, title: "Project 3", imgSrc: "https://picsum.photos/600/400" },
  { id: 4, title: "Project 4", imgSrc: "https://picsum.photos/600/400" },
  { id: 5, title: "Project 5", imgSrc: "https://picsum.photos/600/400" },
  { id: 6, title: "Project 6", imgSrc: "https://picsum.photos/600/400" },
  { id: 7, title: "Project 7", imgSrc: "https://picsum.photos/600/400" },
  { id: 8, title: "Project 8", imgSrc: "https://picsum.photos/600/400" },
];

const ListCoupon = () => {
  return (
    <div
      className="flex px-4 py-8 space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
      style={{ scrollBehavior: "smooth" }} // Đảm bảo cuộn mượt mà
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className="flex-none bg-white rounded-lg shadow-md w-80"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            delay: index * 0.2,
            ease: "easeOut",
          }}
        >
          <img
            src={project.imgSrc}
            alt={project.title}
            className="object-cover w-full h-48 rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="font-serif text-lg text-center uppercase">
              {project.title}
            </h2>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ListCoupon;
