import { Contact } from 'lucide-react'
import React from 'react'

export const contact = () => {

  return (
    <div className="bg-white">
    <div className="bg-pink-100 py-12">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <img
                    src="/du_an_tot_nghiep/frontend/public/image.jpg"
                    alt="Profile"
                    className="rounded-full object-cover w-64 h-64 lg:w-80 lg:h-80"
                />
                <div className="w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Bạn cần hỗ trợ?</h2>
                    <p className="text-gray-600 mb-6">
                        Celah rất hân hạnh được hỗ trợ bạn, hãy để lại thông tin cho chúng tôi nhé.
                        Yêu cầu của bạn sẽ được xử lý và phản hồi trong thời gian sớm nhất.
                    </p>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Họ tên*
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Tên đầy đủ"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email*
                            </label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Địa chỉ email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tin nhắn
                            </label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded"
                                rows={4}
                                placeholder="Đừng ngại hỏi về đơn hàng của bạn"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded"
                        >
                            Gửi
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
);
};
export default contact;
