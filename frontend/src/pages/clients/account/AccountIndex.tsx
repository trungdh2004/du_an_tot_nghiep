import React, { useContext, useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AuthContext } from '@/contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import instance from '@/config/instance'
import { toast } from 'sonner'
const AccountIndex = () => {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState('')
  const { authUser, setAuthUser } = useContext(AuthContext);
  const form = useForm();
  const { data } = useQuery({
    queryKey: ['profile', form.reset],
    queryFn: async () => {
      try {
        const { data } = await instance.get(`/auth/current-user`);
        console.log("data", data.data);
        setUserId(data.data.id)
        form.reset(data.data)
        return data.data;
      } catch (error) {
        console.log(error)
      }
    },
    staleTime: 5 * 60 * 60
  })
  const { mutate } = useMutation({
    mutationFn: async () => {
      const { data } = await instance.put(`/auth/changeUser/${userId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })
      toast.success("Cập nhật thông tin thành công!");
    },
    onError: (error) => {
      console.log(error)
      toast.error("Cập nhật thông tin thất bại!");
    },
  })
  const [date, setDate] = useState()
  // useEffect(() => {
  //   if (authUser) {
  //     form.setValue('full_name', authUser.full_name);
  //     form.setValue('email', authUser.email);
  //     form.setValue('avatar', authUser.avatarUrl);
  //   }
  // }, [authUser, form.setValue])
  const onSubmit = (data: any) => {
    mutate(data)
  }
  return (
    <div className='w-full bg-white px-8 '>
      <div className="py-5 border-b border-[#efedec]">
        <h3 className="text-base md:text-lg text-[#333333] font-medium">Hồ Sơ Của Tôi</h3>
        <span className="text-sm md:text-base text-gray-700">Quản lý thông tin hồ sơ để bảo mật tài khoản của bạn</span>
      </div>
      <div className="pt-8 pb-12 px-10">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="w-[65%] pr-24">
              <div className="flex items-center pb-8">
                <Label className='w-[40%] text-right text-[rgba(85,85,85,.8)] pr-4'>Tên</Label>
                <Input type="text" className=' px-3 py-2 ' placeholder='' {...form.register('full_name')} />
              </div>
              <div className="flex items-center pb-8">
                <Label className='w-[40%] text-right text-[rgba(85,85,85,.8)] pr-4'>Email</Label>
                <Input type="email" readOnly className=' px-3 py-2 ' placeholder='' {...form.register('email')} />
              </div>
              <div className="flex items-center pb-8">
                <Label className='w-[40%] text-right text-[rgba(85,85,85,.8)] pr-4'>Số điện thoại</Label>
                <Input type="text" className=' px-3 py-2 ' placeholder='' {...form.register('phone')} />
              </div>
              <div className="flex items-center pb-8">
                <Label className='w-[40%] text-right text-[rgba(85,85,85,.8)] pr-4'>Giới tính</Label>
                <div className="w-full ">
                  <RadioGroup defaultValue="option-one" className="w-full flex items-center gap-x-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Nam</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Nữ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-three" id="option-three" />
                      <Label htmlFor="option-three">Khác</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="flex items-center pb-8">
                <Label className='w-[40%] text-right text-[rgba(85,85,85,.8)] pr-4'>Ngày sinh</Label>
                <div className="w-full">
                  {/* <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 " />
                        {date ? format(date, "PPP") : <span>Chọn ngày sinh</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover> */}
                </div>
              </div>
            </div>
            <div className="w-[35%] flex flex-col justify-center items-center border-l border-gray-200 ">
              <div className="size-[100px]">
                <img src={authUser?.avatarUrl || ""} className="w-full h-full rounded-full bg-gray-300" alt="" />
              </div>
              <button className='border border-gray-300 rounded-sm px-4 py-2 mt-4 mb-3'>Chọn Ảnh</button>
              <div className="flex flex-col text-[#999] text-sm md:text-base">
                <span className="">Dụng lượng file tối đa 1 MB
                </span>
                <span className=""> Định dạng:.JPEG, .PNG
                </span>
              </div>
            </div>
          </div>
          <div className="w-[40%] flex justify-center ">
            <button type='submit' className='text-white bg-blue-500 px-5 py-2 border rounded-sm'>Lưu</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccountIndex