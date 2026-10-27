import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';

import { fetchFeeds } from '../../services/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.feed);

  const handleGetFeeds = (): void => {
    void dispatch(fetchFeeds());
  };

  useEffect(() => {
    handleGetFeeds();

    const interval = setInterval(() => {
      handleGetFeeds();
    }, 10000);

    return (): void => {
      clearInterval(interval);
    };
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  if (error && !orders.length) {
    return <p>Не удалось загрузить ленту заказов: {error}</p>;
  }

  if (!orders.length) {
    return <p>Заказов пока нет</p>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
