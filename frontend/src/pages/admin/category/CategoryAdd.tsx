import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import instance from '@/config/instance';
import { toast } from 'sonner';

interface FormDialog {
	id?: string;
	title?: string;
  labelConfirm?: string;

}
const formSchema = z.object({
  name: z.string({
    message: "Tên danh mục không được để trống",
  }).min(6, {
		message: "Bạn nên tạo danh mục lớn hơn 6",
	}),
  description: z.string({
    message: "Mô tả danh mục không được để trống",
  }).min(6, {
		message: "Bạn nên tạo chi tiết danh mục lớn hơn 6",
	}),
});
const CategoryAdd = ({
  id,title,labelConfirm
}:FormDialog) => {
  const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
      name: "",
      description:""
		},
  })
  const [open,setOpen] = useState<boolean>()
  const onHandleUpdate = async (dataForm: any) => {
		try {
      const {data } = await instance.put(`/category/updateCate/${id}`, dataForm);
      console.log("Update category success");
      setOpen(false);
      toast.success("Bạn cập nhật danh mục thành công");
      
      
		} catch (error) {
			console.error("Error:", error);
		}
  };
  const onHandleAdd = async (dataForm: any) => {
		try {
      const { data } = await instance.post(`/category/addCate`, dataForm);
      console.log(data);
      console.log("Add category success");
      setOpen(false)
      form.reset();
      toast.success("Bạn thêm danh mục thành công")
		} catch (error) {
			console.error("Error:", error);
		}
	};
  if (id) {
    useEffect(()=> {
      (async () => {
        try {
          const { data } = await instance.get(`/category/cate/${id}`)
          console.log(data);
          form.reset(data.data)
        } catch (error) {
          console.error("Error:", error);
        }
      })()
    }, [id])
  }
  const onSubmit = (data:{name:string,description:string}) => {
    { id ? onHandleUpdate(data) : onHandleAdd(data); }
  };

  return (
		<div>
			<Dialog open={open}>
				<DialogTrigger asChild>
					<Button variant="outline" onClick={()=>setOpen(true)}>{title}</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader onClick={()=>setOpen(false)}>
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input placeholder="Description" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">{labelConfirm}</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default CategoryAdd