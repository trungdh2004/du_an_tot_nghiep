import React, { useState } from 'react';

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    bio: 'Lập trình viên yêu thích công nghệ và khám phá thế giới.'
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Hồ Sơ Cá Nhân</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-600 mb-1">Tên:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            ) : (
              <p className="text-lg">{userInfo.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            ) : (
              <p className="text-lg">{userInfo.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Số điện thoại:</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            ) : (
              <p className="text-lg">{userInfo.phone}</p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-600 mb-1">Giới thiệu:</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={userInfo.bio}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            ) : (
              <p className="text-lg">{userInfo.bio}</p>
            )}
          </div>
        </div>

        {isEditing ? (
          <button
            onClick={handleSaveClick}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Lưu Thay Đổi
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Chỉnh Sửa
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
