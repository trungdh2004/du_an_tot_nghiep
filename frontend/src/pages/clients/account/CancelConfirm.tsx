import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AiFillExclamationCircle } from 'react-icons/ai'
import { cancelOrder } from '@/service/order'
import { toast } from 'sonner'

const FormSchema = z.object({
  value: z.number(),
  label: z.string().min(1, { message: "Vui lòng chọn lý do hủy đơn hàng" }),
});

type Props = {
  open: boolean,
  handleClose: () => void,
  handleSubmit?: () => void,
}
const CancelConfirm = ({ open, handleClose, handleSubmit }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const ListContent = [
    {
      value: 1,
      label: "Muốn nhập/thay dổi mã Voucher"
    },
    {
      value: 2,
      label: "Muốn thay đổi sản phẩm trong đơn hàng"
    },
    {
      value: 3,
      label: "Thủ tục thanh toán quá rác rối"
    },
    {
      value: 4,
      label: "Tìm giá rẻ hơn chỗ khác"
    },
    {
      value: 5,
      label: "Đổi ý không muốn mua nữa"
    }
  ];

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const noteCancel = ListContent.find(item => item.value.toString() === data.type)?.label || "";
    const handleCancelOrder = async (open: string | boolean, noteCancel: string) => {
      try {
        const data = await cancelOrder(open, noteCancel);
        console.log("huy hang ", data)
        toast.success("Bạn đã hủy đơn hàng thành công!")

      } catch (error) {
        console.log(error)
      }
    }
    console.log("adadadad", noteCancel)
    // Gọi hàm hủy đơn hàng với lý do hủy
  }
  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chọn Lý Do Hủy</DialogTitle>
            <div className="my-2">
              <DialogDescription className='text-[#FFB22C] my-3'>
                <p className="flex "><AiFillExclamationCircle className='mr-2' size={24} /> Vui lòng chọn lý do hủy đơn hàng. Lưu ý: Thao tác này sẽ hủy tất cả sản phẩm có trong đơn hàng và không thể hoàn tác.</p>
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {ListContent.map((item: any, index: number) => {
                            return (
                              <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={item.value} />
                                </FormControl>
                                <FormLabel className="font-normal text-sm md:text-base">{item.label}</FormLabel>
                              </FormItem>
                            )
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className='w-full bg-red-500 py-3 text-sm md:text-base uppercase text-white rounded-sm' type="submit">Đồng ý</Button>
              </form>
            </Form>
          </div>

          <DialogFooter>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CancelConfirm