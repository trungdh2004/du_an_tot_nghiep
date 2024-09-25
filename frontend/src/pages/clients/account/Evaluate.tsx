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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Textarea } from '@/components/ui/textarea'

const FormSchema = z.object({
  rating: z.number().min(1),
  content: z.string().min(3).max(200),
});

type Props = {
  open: string | boolean,
  handleClose: () => void,
  handleFetchOrder: () => void,
}
interface IRes {
  note: string,
  cancelBy: number,
  open: string,
}
const Evaluate = ({ open, handleClose }: Props) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })


  const { mutate } = useMutation({
    mutationFn: async ({ open, note, cancelBy = 1 }: IRes) => {
      const data = await cancelOrder(open, note, cancelBy);
    },
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ['purchase']
      })
      toast.success("Đánh giá sản phẩm thành công!");
    },
    onError: () => {
      toast.error("Đánh giá sản phẩm thất bại!");
    },
  })
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {

  }
  return (
    <>
      <Dialog open={!!open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Đánh giá sản phẩm</DialogTitle>
            {/* <div className="my-2">
              <DialogDescription className='text-[#FFB22C] my-3'>
                <p className="flex "><AiFillExclamationCircle className='mr-2' size={24} /> Vui lòng chọn lý do hủy đơn hàng. Lưu ý: Thao tác này sẽ hủy tất cả sản phẩm có trong đơn hàng và không thể hoàn tác.</p>
              </DialogDescription>
            </div> */}
          </DialogHeader>
          <div className="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Textarea placeholder="Nội dung:" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button className='w-full bg-red-500 py-3 text-sm md:text-base uppercase text-white rounded-sm' type="submit">Đồng ý</button>
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

export default Evaluate