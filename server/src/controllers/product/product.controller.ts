import { Request, Response } from "express";
import STATUS from "../../utils/status";
import ProductModel from "../../models/products/Product.schema";
import CategoryModel from "../../models/products/Category.schema";
import { productValidations } from "../../validation/product.validation";
import { IAttribute, IColor, ISize } from "../../interface/product";
import AttributeModel from "../../models/products/Attribute.schema";
import { RequestModel } from "../../interface/models";
import { generateSlugs } from "../../middlewares/generateSlug";
import { Types } from "mongoose";
import { formatDataPaging } from "../../common/pagingData";
import CartItemModel from "../../models/cart/CartItem.schema";

const ObjectId = require("mongoose").Types.ObjectId;

interface RowIColor {
  colorId: string;
  colorName: string;
  list: IAttribute[];
  quantity: number;
}

class ProductController {
  async addProduct(req: Request, res: Response) {
    try {
      const { error } = productValidations.validate(req.body);

      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }

      const {
        name,
        price,
        discount,
        description,
        thumbnail,
        category,
        quantitySold,
        images,
        featured,
        attributes = [],
      } = req.body;

      const dataAttributes = await AttributeModel.create<IAttribute[]>(
        attributes
      );


      const quantity = dataAttributes.reduce((acc, item) => {
        return acc + item.quantity
      },0)

      const product = await ProductModel.create({
        name,
        price,
        discount,
        description,
        thumbnail,
        category,
        quantitySold,
        images,
        featured,
        quantity,
        attributes: dataAttributes?.map((item) => item._id),
      });

      return res.status(STATUS.OK).json({
        message: "Tạo thành công",
        data: product,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  // client
  async showProductById(req: RequestModel, res: Response) {
    try {
      const { slug } = req.params;
      if (!slug)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn sản phẩm",
        });

      const product = await ProductModel.findOne({
        slug:slug
      })
        .populate([
          {
            path: "attributes",
            populate: [
              {
                path: "color",
                model: "Color",
              },
              {
                path: "size",
                model: "Size",
              },
            ],
          },
          {
            path: "category",
            model: "Category",
            select: {
              _id: 1,
              name: 1,
              description: 1,
            },
          },
        ])
        .lean();

      const listColor = (product?.attributes as IAttribute[])?.reduce(
        (acc: RowIColor[], item) => {
          let group = acc.find(
            (g) => g.colorId === (item.color as IColor)?._id
          );

          // Nếu nhóm không tồn tại, tạo nhóm mới
          if (!group) {
            group = {
              colorId: (item.color as IColor)._id as string,
              colorName: (item.color as IColor).name as string,
              list: [item],
              quantity: item.quantity,
            };
            acc.push(group);
            return acc;
          }

          // Thêm đối tượng vào nhóm tương ứng
          group.list.push(item);
          group.quantity = group.quantity + item.quantity;
          return acc;
        },
        []
      );

      const listSize = (product?.attributes as IAttribute[])?.reduce(
        (acc: {id:string,name:string}[], item) => {
          const check = acc.find((row) => row.id === (item.size as ISize)._id);
          if (check) return acc;
          acc.push({
            id:(item.size as ISize)._id as string,
            name:(item.size as ISize).name
          });
          return acc;
        },
        []
      );

      return res.status(STATUS.OK).json({
        data: {
          ...product,
          listColor,
          listSize,
        },
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async updateById(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn sản phẩm",
        });
      const { error } = productValidations.validate(req.body);

      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }
      const {
        name,
        price,
        discount,
        description,
        thumbnail,
        category,
        quantitySold,
        images,
        attributes = [],
      } = req.body;

      const existingProduct = await ProductModel.findById(id);

      if (!existingProduct)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có sản phẩm thỏa mãn",
        });

      const listNew = attributes.filter((item: IAttribute) => !item._id);
      const listToId = attributes?.filter((item: IAttribute) => item._id);
      const listToIdDelete =
        existingProduct?.attributes?.filter((item) => {
          const check = listToId?.some(
            (row: IAttribute) => row?._id?.toString() === item?.toString()
          );
          return !check;
        }) || [];
      let dataAttributes = [...listToId.map((item: IAttribute) => item._id)];

      if (listToId.length > 0) {
        const bulkOps = listToId.map((item: IAttribute) => {
          return {
            updateOne: {
              filter: { _id: item._id },
              update: {
                $set: {
                  color: item.color,
                  size: item.size,
                  price: item.price,
                  quantity: item.quantity,
                  discount: item.discount,
                },
              },
              upsert: true,
            },
          };
        });

        await AttributeModel.bulkWrite(bulkOps);
      }

      if (listNew.length > 0) {
        const listNewAttributes = await AttributeModel.create<IAttribute[]>(
          listNew
        );
        dataAttributes = [
          ...dataAttributes,
          ...listNewAttributes?.map((item) => item._id),
        ];
      }

      if (listToIdDelete?.length > 0) {
        await AttributeModel.deleteMany({
          _id: { $in: listToIdDelete },
        });
      }
      
      const quantity = attributes.reduce((acc:number, item:IAttribute) => {
        return acc + item.quantity
      },0)
      
      const newProduct = await ProductModel.findByIdAndUpdate(
        existingProduct?._id,
        {
          name,
          price,
          discount,
          description,
          thumbnail,
          category,
          quantitySold,
          quantity,
          images,
          attributes: dataAttributes,
          slug: generateSlugs(name),
        },
        { new: true }
      ).populate([
        {
          path: "attributes",
          populate: [
            {
              path: "color",
              model: "Color",
            },
            {
              path: "size",
              model: "Size",
            },
          ],
        },
        {
          path: "category",
          model: "Category",
          select: {
            _id: 1,
            name: 1,
            description: 1,
          },
        },
      ]);

      return res.status(STATUS.OK).json({
        message: "hehe",
        data: newProduct,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }
  // admin
  async getProductById(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn sản phẩm",
        });

      const product = await ProductModel.findById(id).populate([
        {
          path: "attributes",
          populate: [
            {
              path: "color",
              model: "Color",
            },
            {
              path: "size",
              model: "Size",
            },
          ],
        },
        {
          path: "category",
          model: "Category",
          select: {
            _id: 1,
            name: 1,
            description: 1,
          },
        },
      ]);

      if (!product)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có sản phẩm",
        });

      return res.status(STATUS.OK).json({
        data: product,
        message: "Lấy sản phẩm thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async deletedProductById(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn sản phẩm",
        });

      const existingProduct = await ProductModel.findById(id);

      if (!existingProduct)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có sản phẩm nào",
        });

      await ProductModel.findByIdAndUpdate(existingProduct._id, {
        is_deleted: true,
      });

      await CartItemModel.deleteOne({
        product:existingProduct._id,
      })

      return res.status(STATUS.OK).json({
        message: "Ẩn sản phẩm thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async unDeletedProductById(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn sản phẩm",
        });

      const existingProduct = await ProductModel.findById(id);

      if (!existingProduct)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có sản phẩm nào",
        });

      await ProductModel.findByIdAndUpdate(existingProduct._id, {
        is_deleted: false,
      });

      return res.status(STATUS.OK).json({
        message: "Khôi phục sản phẩm thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async deleteMany(req: RequestModel, res: Response) {
    try {
      const { listId, type } = req.body;

      if (!listId || listId.length === 0) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn sản phẩm",
        });
      }

      await ProductModel.find({ _id: { $in: listId } }).select("_id");

      const CategoryData = await ProductModel.updateMany(
        { _id: { $in: listId } },
        { $set: { is_deleted: true } },
        { new: true }
      );

      await CartItemModel.deleteMany({
        product:{
          $in: listId
        }
      })

      return res.status(STATUS.OK).json({
        message: "Xóa thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.kind
          ? "Có một sản phẩm không có trong dữ liệu"
          : error.message,
      });
    }
  }

  async unDeleteMany(req: RequestModel, res: Response) {
    try {
      const { listId } = req.body;

      if (!listId || listId.length === 0) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn loại sản phẩm",
        });
      }

      await ProductModel.find({ _id: { $in: listId } }).select("_id");

      const CategoryData = await ProductModel.updateMany(
        { _id: { $in: listId } },
        { $set: { is_deleted: false } },
        { new: true }
      );

      return res.status(STATUS.OK).json({
        message: "Khôi phục thành công",
      });
    } catch (error: any) {
      console.log("error", error.kind);

      return res.status(STATUS.INTERNAL).json({
        message: error.kind
          ? "Có một sản phẩm không có trong dữ liệu"
          : error.message,
      });
    }
  }

  async pagingProduct(req: RequestModel, res: Response) {
    try {
      const {
        pageIndex,
        pageSize,
        keyword,
        color = [],
        size = [],
        sort = 1,
        fieldSort,
        category,
        min,
        max,
        tab
      } = req.body;

      let limit = pageSize || 10;
      let skip = (pageIndex - 1) * limit || 0;
      let queryKeyword = keyword
        ? {
            name: {
              $regex: keyword,
              $options: "i",
            },
          }
        : {};
      let queryAttribute = {};
      let querySort = {};
      let queryCategory = {};
      let queryPrice = {};
      let queryTab = {}

      if(tab === 2) {
        queryTab = {
          is_deleted:true
        }
      }else {
        queryTab = {
          is_deleted:false
        }
      }

      // attribute
      if (color.length > 0 || size.length > 0) {
        let conditions = {};

        if (color.length > 0 && size.length > 0) {
          conditions = {
            $and: [
              {
                size: {
                  $in: size,
                },
              },
              {
                color: {
                  $in: color,
                },
              },
            ],
          };
        } else if (color.length > 0) {
          conditions = { color: color };
        } else if (size.length > 0) {
          conditions = { size: size };
        }
        const listAttributeColor = await AttributeModel.find(conditions);

        const colorAttributeIds = listAttributeColor?.map((attr) => attr._id);
        queryAttribute = {
          attributes: {
            $in: colorAttributeIds,
          },
        };
      }

      // sắp xếp
      if (fieldSort) {
        querySort = {
          [fieldSort]: sort,
        };
      } else {
        querySort = {
          createdAt: sort,
        };
      }

      if (category) {
        queryCategory = {
          category,
        };
      }

      if (min || max) {
        if (min && max) {
          queryPrice = {
            $and: [
              {
                price: {
                  $lte: max,
                },
              },
              {
                price: {
                  $gte: min,
                },
              },
            ],
          };
        } else if (min) {
          queryPrice = {
            price: {
              $gte: min,
            },
          };
        } else if (max) {
          queryPrice = {
            price: {
              $lte: max,
            },
          };
        }
      }

      const listProduct = await ProductModel.find({
        ...queryKeyword,
        ...queryAttribute,
        ...queryCategory,
        ...queryPrice,
        ...queryTab
      })
        .sort(querySort)
        .skip(skip)
        .limit(limit)
        .populate([
          {
            path: "attributes",
            populate: [
              {
                path: "color",
                model: "Color",
              },
              {
                path: "size",
                model: "Size",
              },
            ],
          },
          "category"
        ])
        .exec();

      const countProduct = await ProductModel.countDocuments({
        ...queryKeyword,
        ...queryAttribute,
        ...queryCategory,
        ...queryPrice,
        ...queryTab
      });

      const result = formatDataPaging({
        limit,
        pageIndex,
        data: listProduct,
        count: countProduct,
      });
      return res.status(STATUS.OK).json(result);
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }
}

export default new ProductController();
