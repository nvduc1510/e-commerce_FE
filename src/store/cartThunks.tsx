import { CartRequest } from "@/model/request/utilRequest";
import { apiCart } from "@/service/commonApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItemFormCart = createAsyncThunk("cart/fetchCart", async(userId: number) => {
    const res = await apiCart.getAllCart(userId);
    return res;
})

export const addItemToCart = createAsyncThunk("cart/addItemToCart", async(params:CartRequest) => {
    const res = await apiCart.addItemToCart(params);
    return res;
})

export const updateItemInCart = createAsyncThunk("cart/updateAnItemFormCart", async(params: CartRequest) => {
    const res = await apiCart.updateItemInCart(params);
    return res;
})
export const removeAnItemFormCart = createAsyncThunk("cart/removeAnItemFormCart", async (params:CartRequest) => {
    const res = await apiCart.removeAnItemFormCart(params);
    return { ...res.data, params} 
});

export const getTotalQuantity = createAsyncThunk("cart/totalQuantity", async (params: CartRequest) => {
    const res = await apiCart.totalQuantity(params);
    return res.data;
})

export const removeAllItemFormCart = createAsyncThunk("cart/clearAllCart", async (params: CartRequest) => {
    const res = await apiCart.removeAllItemFormCart(params);
    return {...res.data, params};
})