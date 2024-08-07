import instance from "@/config/instance";

export const pagingCart = () => {
    const uri = `/cart/pagingCart`;
    return instance.get(uri);
}