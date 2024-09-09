import { getIo, getSocket } from ".";
import TYPENOTIFICATION from "../config/typeNotification";
import NotificationModel from "../models/Notification.schema";

export const SocketEmit = (order: any, message: string,userId:string) => {
  const socket = getSocket(userId);
  const io = getIo();
  io.to(socket).emit(`${message}`, order);
};

