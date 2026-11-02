import { Preloader, OrderInfoUI } from '@ui';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { getOrderByNumber } from '../../services/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

import type { TIngredient } from '@utils-types';

export const OrderInfo = (): React.JSX.Element => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.feed.orders);
  const profileOrders = useSelector((state) => state.order.orders);
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const orderByNumber = useSelector((state) => state.order.orderByNumber);
  const orderError = useSelector((state) => state.order.orderError);

  const orderData =
    orders.find((order) => order.number === Number(number)) ??
    profileOrders.find((order) => order.number === Number(number)) ??
    (orderByNumber?.number === Number(number) ? orderByNumber : null);

  useEffect(() => {
    if (number && Number.isInteger(Number(number)) && !orderData) {
      void dispatch(getOrderByNumber(Number(number)));
    }
  }, [dispatch, number, orderData]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = Record<string, TIngredient & { count: number }>;

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1,
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
    };
  }, [orderData, ingredients]);

  if (!number || !Number.isInteger(Number(number))) {
    return <OrderInfoUI orderInfo={null} error="Некорректный номер заказа" />;
  }

  if (!orderData && orderError) {
    return <OrderInfoUI orderInfo={null} error={orderError} />;
  }

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
