import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

import { getOrders } from '../../services/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { orders, isOrdersLoading, ordersError } = useSelector((state) => state.order);

  useEffect(() => {
    void dispatch(getOrders());

    const interval = setInterval(() => {
      void dispatch(getOrders());
    }, 10000);

    return (): void => {
      clearInterval(interval);
    };
  }, [dispatch]);

  if (isOrdersLoading && !orders.length) {
    return <p>Загрузка заказов...</p>;
  }

  if (ordersError && !orders.length) {
    return <p>{ordersError}</p>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
