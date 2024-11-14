import React, { useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState({
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: '123 Đường ABC, Thành phố XYZ',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUser({ ...formData });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Hồ sơ cá nhân</h1>
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ và tên:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-4"
          >
            Lưu
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p><strong>Họ và tên:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Số điện thoại:</strong> {user.phone}</p>
          <p><strong>Địa chỉ:</strong> {user.address}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          >
            Chỉnh sửa
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
