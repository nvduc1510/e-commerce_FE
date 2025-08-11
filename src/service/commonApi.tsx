import API from '@/components/utils/auth/axiosInterceptor';
import {CartRequest, formParams, paramsCategory, UserLogin} from '@/model/request/utilRequest'
const API_URL = "http://localhost:8080/api";
const URL_LOGIN = "http://localhost:8080";

export interface requestParams {
    categoryId?: number[];
    keyword?: string;
    minPrice?:number;
    maxPrice?:number;
}

export const apiAuth = {
    handleLogin: (data: UserLogin) => API.post(`${URL_LOGIN}/login`, data)
}

//========Product=======
export const apiProduct = {
    fetchProducts : async(params: formParams) => { 
        const res = await API.get(`${API_URL}/public/products`,{params}) 
        return res.data;
    },
    fetchDetailProduct: async(slug: string) => {
        const res = await API.get(`${API_URL}/public/product/detail/${slug}`)
        return res.data;
    }
}

//========Category=======
export const apiCategory = {
    fetchCategories : async (params: paramsCategory) => {
        const res = await API.get(`${API_URL}/public/categories`,{params})
        return res.data;
    },
    fetchCategoriesWithProducts: async (params: formParams) => {
        const res = await API.get(`${API_URL}/public/category/with-products`,{params: {
            ...params,
            categoryId: params.categoryId?.join(',')
        }})
        return res.data;
    },
    fetchProductsByCategoryId: async(params: paramsCategory) => {
        const res = await API.get(`${API_URL}/public/category/detail`,{params : {
            ...params,
        }})
        return res.data;
    }
}

//========Cart=======
export const apiCart = {
    getAllCart: async(userId: number) => {
        const res = await API.get(`${API_URL}/user/cart/get/${userId}`);
        return res.data.params;
    },
    addItemToCart: async(params: CartRequest) =>{
        const res = await API.post(`${API_URL}/user/cart/add`, params);
        return res.data.params;
    },
    updateItemInCart: async(params: CartRequest) =>{
        const res = await API.put(`${API_URL}/user/cart/update`, {params})
        return res.data.params;
    },
    removeAnItemFormCart: async(params: CartRequest) => {
        const res = await API.delete(`${API_URL}/user/cart/delete-item?userId=${params?.cartId}&&productId=${params?.productId}`)
        return res.data;
    },
    totalQuantity : async(params: CartRequest) =>{
        const res = await API.get(`${API_URL}/user/cart/total_quantity/${params?.userId}`)
        return res.data;
    },
    removeAllItemFormCart: async(params:CartRequest) => {
        const res = await API.delete(`${API_URL}/user/cart/delete-all-cart/${params?.userId}`)
        return res.data;
    }
}