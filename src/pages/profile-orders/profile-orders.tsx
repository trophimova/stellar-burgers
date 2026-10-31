import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

import { getOrders } from '../../services/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { orders, isOrdersLoading, ordersError } = useSelector((state) => state.order);

  useEffect(() => {
    void dispatch(getOrders());
  }, [dispatch]);

  return (
    <ProfileOrdersUI orders={orders} isLoading={isOrdersLoading} error={ordersError} />
  );
};
