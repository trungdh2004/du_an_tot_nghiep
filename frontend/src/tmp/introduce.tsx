import React from "react";

const teamMembers = [
  {
    name: "Nguyen Van A",
    role: "Nhà sáng lập",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Tran Thi B",
    role: "Quản lý dự án",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Le Van C",
    role: "Kỹ sư phần mềm",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Pham Thi D",
    role: "Thiết kế UI/UX",
    image: "https://via.placeholder.com/150",
  },
];

function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="relative bg-blue-600 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
          Về Chúng Tôi
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-center max-w-3xl mx-auto">
          Chúng tôi là một nhóm đam mê công nghệ và sáng tạo, cam kết mang đến
          những sản phẩm và dịch vụ tốt nhất cho khách hàng.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-12">
        {/* Sứ Mệnh */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Sứ Mệnh
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Sứ mệnh của chúng tôi là giúp mọi người tiếp cận công nghệ một cách
            dễ dàng, tối ưu hóa các giải pháp kinh doanh và nâng cao trải nghiệm
            người dùng. Chúng tôi tin rằng công nghệ không chỉ là công cụ, mà
            còn là cầu nối đưa mọi người đến gần nhau hơn.
          </p>
        </div>

        {/* Đội Ngũ */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Đội Ngũ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full mb-4"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Giá Trị */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Giá Trị
          </h2>
          <ul className="list-disc pl-4 sm:pl-6 text-gray-600 text-base sm:text-lg">
            <li className="mb-2">
              <strong>Đổi mới:</strong> Luôn sáng tạo và tìm kiếm những giải pháp
              mới.
            </li>
            <li className="mb-2">
              <strong>Chất lượng:</strong> Cam kết mang lại sản phẩm và dịch vụ
              tốt nhất.
            </li>
            <li className="mb-2">
              <strong>Khách hàng:</strong> Đặt khách hàng làm trọng tâm trong
              mọi hoạt động.
            </li>
            <li>
              <strong>Hợp tác:</strong> Xây dựng mối quan hệ vững chắc và lâu
              dài với đối tác.
            </li>
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-12 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Hãy cùng hợp tác với chúng tôi!
        </h2>
        <p className="text-base sm:text-lg lg:text-xl mb-6">
          Nếu bạn có ý tưởng hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng
          tôi.
        </p>
        <button className="w-full sm:w-auto bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors">
          Liên Hệ Ngay
        </button>
      </div>
    </div>
  );
}

export default AboutPage;
