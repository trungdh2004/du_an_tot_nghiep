import React, { useEffect } from 'react'
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


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import instance from '@/config/instance'
import { toast } from 'sonner'
interface FormDialog {
    open: boolean | string;
    title?: "Thêm màu" | "Cập nhật";
    labelConfirm?: string;
    handleClose: () => void;
    handlePaging: () => void;
}

const formSchema = z.object({
    name: z
        .string({
            message: "Tên màu không được để trống",
        }),
    code: z
        .string({
            message: "Mã màu không được để trống",
        })
        .min(6, {
            message: "Mã màu phải có ít nhất 6 ký tự ",
        }),
});

const ColorForm = ({ open, title, labelConfirm, handleClose, handlePaging }: FormDialog) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            code: "",
        },
    });
    useEffect(() => {
        if (typeof open === "string") {
            (async () => {
                try {
                    const { data } = await instance.get(`color/byId/${open}`);
                    console.log(data)
                    form.reset(data.data)
                } catch (error) {
                    console.error(`colorEdit`, error)
                }
            })()
        }
    }, [open])

    const onHandleAdd = async (dataForm: any) => {
        try {
            const { data } = await instance.post(`color/add`, dataForm);
            console.log(data);
            handleClose();
            handlePaging();
            toast.success("Bạn đã thêm màu thành công")
        } catch (error) {
            console.error(`ErrorColorAdd`, error)
        }
    }

    const onHandleUpdate = async (dataForm: any) => {
        try {
            const { data } = await instance.put(`color/update/${open}`, dataForm);
            handleClose();
            handlePaging();
            toast.success("Bạn đã cập nhật màu thành công")
        } catch (error) {
            console.error(`ErrorColorUp`, error)
        }
    }
    const onSubmit = (data: { name: string, code: string }) => {
        if (typeof open === "string") {
            onHandleUpdate(data)
        } else {
            onHandleAdd(data)
        }
    }
    return (
        <>
            <Dialog open={!!open} onOpenChange={handleClose}>
                {/* <DialogTrigger asChild>
                    <Button variant="default">Thêm màu mới</Button>
                </DialogTrigger> */}
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{typeof open === "string" ? 'Cập nhật' : 'Thêm màu'}</DialogTitle>
                    </DialogHeader>
                    <div className="">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tên màu</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Tên màu..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mã màu</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Mã màu..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">{typeof open === "string" ? 'Cập nhật' : 'Thêm màu'} </Button>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog></>
    )
}

export default ColorForm