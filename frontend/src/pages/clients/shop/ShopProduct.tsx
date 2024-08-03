
import { useSearchParams } from "react-router-dom";
import Category from "./Category";
import Color from "./Color";
import Size from "./Size";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { pagingProduct } from "@/service/product";
import ProductDisPlay from "./ProductDisPlay";
import { SearchObjectTypeProduct } from "@/types/searchObjecTypes";

const ShopProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObject: any = Object.fromEntries(searchParams.entries());
  const [searchParamsObject, setSearchParamsObject] = useState<
		SearchObjectTypeProduct | {}
	>({});
  
  const colorcheck = paramsObject?.color?.slice(1).split(',')
  const { data: productShop, isLoading, isPending } = useQuery({
    queryKey: ['productShop'],
    queryFn: async () => {
      const { data } = await pagingProduct(searchParamsObject)
      return data
    },
    staleTime: 1000 * 60 * 15,
    refetchInterval: 1000 * 60 * 15,
    retry: 2,
  })
  console.log(productShop);
  
	console.log(colorcheck);
	console.log(paramsObject);
	return (
		<div className="padding">
			<div className="grid lg:grid-cols-12 gap-3">
				<div className="col-span-3">
					<Category setSearchParamsObject={setSearchParamsObject} />
					<Color setSearchParamsObject={setSearchParamsObject} />
					<Size setSearchParamsObject={setSearchParamsObject} />
				</div>
        <div className="col-span-9">
          <ProductDisPlay productShop={ productShop} />
        </div>
			</div>
		</div>
	);
};

export default ShopProduct;
