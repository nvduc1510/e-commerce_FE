import {createSlice } from '@reduxjs/toolkit';
import {CartState } from '@/model/request/utilRequest';
import { fetchItemFormCart, addItemToCart, updateItemInCart, removeAnItemFormCart, removeAllItemFormCart, getTotalQuantity } from './cartThunks';

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    cartTotal: 0,
    status: "idle",
    error: null,
};

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder

        //=======Fetch cart=======
        .addCase(fetchItemFormCart.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(fetchItemFormCart.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload.items;
            state.cartTotal = action.payload.cartTotal ?? 0;
        })
        .addCase(fetchItemFormCart.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Lỗi lấy giỏ hàng";
        })

        //=======Add=======
        .addCase(addItemToCart.fulfilled, (state, action) => {
            const existingIndex = state.items.findIndex((i) => i.product?.productId === action.payload.productId)
            if(existingIndex !== -1) {
                state.items[existingIndex].quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        })

        //=======Update=======
        .addCase(updateItemInCart.fulfilled, (state, action) => {
            const update= action.payload;
            const index = state.items.findIndex((i) => i?.cartId === update?.cartId)
            if (index !== -1) state.items[index] = {...update};
        })

        //=======Delete=======
        .addCase(removeAnItemFormCart.fulfilled, (state, action) => {
            const deletedProductId = action.payload.productId;
            state.items = state.items.filter((i) => i.product?.productId !== deletedProductId);
        })

        //=======Delete All=======
        .addCase(removeAllItemFormCart.fulfilled, (state) => {
            state.items = [];
        })

        //=======Total quantity=======
        .addCase(getTotalQuantity.fulfilled, (state, action) => {
            state.totalQuantity = action.payload;
        })
    }
})

export default CartSlice;