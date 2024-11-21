import React, { useState } from 'react';

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [originalInfo, setOriginalInfo] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    bio: 'Lập trình viên yêu thích công nghệ và khám phá thế giới.',
  });


  const handleEditClick = () => {
 
    setIsEditing(true);
  };


  const handleSaveClick = () => {
    const errorMessage = validateInput();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    setIsEditing(false);
    alert('Thông tin đã được lưu.');
  };

  
  const handleCancelClick = () => {

    setIsEditing(false);
  };


  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };


  const validateInput = () => {
    if (!userInfo.name.trim()) return 'Tên không được để trống.';
    if (!userInfo.email.match(/^\S+@\S+\.\S+$/)) return 'Email không hợp lệ.';
    if (!userInfo.phone.match(/^\d{10}$/)) return 'Số điện thoại phải có 10 chữ số.';
    return '';
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Hồ Sơ Cá Nhân</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">Tên:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm sm:text-base"
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
                className="w-full border rounded px-3 py-2 text-sm sm:text-base"
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
                className="w-full border rounded px-3 py-2 text-sm sm:text-base"
              />
            ) : (
              <p className="text-lg">{userInfo.phone}</p>
            )}
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <label className="block text-gray-600 mb-1">Giới thiệu:</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={userInfo.bio}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm sm:text-base"
              />
            ) : (
              <p className="text-lg">{userInfo.bio}</p>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row items-center">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveClick}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mb-2 sm:mb-0 sm:mr-2"
              >
                Lưu Thay Đổi
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Hủy
              </button>
            </>
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
    </div>
  );
}

export default ProfilePage;
