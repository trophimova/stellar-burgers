import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '../utils/burger-api';

import type { TOrder } from '@utils-types';

type OrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;

  orderByNumber: TOrder | null;
  isOrderLoading: boolean;
  orderError: string | null;

  orders: TOrder[];
  isOrdersLoading: boolean;
  ordersError: string | null;
};

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null,

  orderByNumber: null,
  isOrderLoading: false,
  orderError: null,

  orders: [],
  isOrdersLoading: false,
  ordersError: null,
};

export const createOrder = createAsyncThunk('order/createOrder', orderBurgerApi);
export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);
export const getOrders = createAsyncThunk('order/getOrders', getOrdersApi);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.orderModalData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message ?? 'Не удалось оформить заказ';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isOrderLoading = true;
        state.orderByNumber = null;
        state.orderError = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderByNumber = action.payload.orders[0] ?? null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.orderError = action.error.message ?? 'Не удалось загрузить заказ';
      })
      .addCase(getOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.ordersError = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.ordersError =
          action.error.message ?? 'Не удалось загрузить историю заказов';
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
