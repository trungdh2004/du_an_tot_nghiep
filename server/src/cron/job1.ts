import OrderModel from "../models/order/Order.schema";

const updateStatusShippedToSuccess = async () => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    console.log("đang cập nhập");
    

    await OrderModel.updateMany({
      status: 4,
    },{
        status:5,
        $push:{
            statusList:5
        }
    });
    console.log("Cập nhập trạng thái đơn hàng thành công");
  } catch (error) {
    console.log("Cập nhập trạng thái đơn hàng thất bại");
    
  }
};

export default updateStatusShippedToSuccess