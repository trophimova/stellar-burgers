import { ProfileMenu, OrdersList } from '@components';
import { Preloader } from '@ui';
import { clsx } from 'clsx';

import type { ProfileOrdersUIProps } from './type';

import styles from './profile-orders.module.css';

export const ProfileOrdersUI = ({
  orders,
  isLoading,
  error,
}: ProfileOrdersUIProps): React.JSX.Element => (
  <main className={styles.main}>
    <div className={clsx('mt-30 mr-15', styles.menu)}>
      <ProfileMenu />
    </div>
    <div
      className={clsx(
        'mt-10',
        styles.orders,
        isLoading && !orders.length && styles.ordersLoading
      )}
    >
      {isLoading && !orders.length ? (
        <Preloader />
      ) : error && !orders.length ? (
        <p>{error}</p>
      ) : (
        <OrdersList orders={orders} />
      )}
    </div>
  </main>
);
