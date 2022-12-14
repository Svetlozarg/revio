import { useEffect, useState } from 'react';
import UserTab from './Tabs/UserTab';
import OrderTab from './Tabs/OrderTab';

const RightSide = ({ ordersArr }) => {
  const [ordersObj, setOrdersObj] = useState(ordersArr);

  useEffect(() => {
    setOrdersObj(ordersArr);
  }, [ordersArr]);

  return (
    <div className="flex flex-col py-8 pl-1 pr-1 w-80 bg-white flex-shrink-0 mr-4 rounded-2xl">
      <div className="h-full flex flex-col items-start justify-start w-full overflow-y-scroll">
        <div className="ml-2 font-bold text-2xl mb-4">Details</div>

        {/* Accordion */}
        <div id="accordion-open" data-accordion="open">
          {ordersObj.length !== 0 &&
            ordersObj.map((customer, i) => {
              if (i === 0) {
                return (
                  <UserTab
                    key={customer.id}
                    title={`${customer.customer.firstName} ${customer.customer.lastName} | ${customer.customer.ordersCount} order(s)`}
                    // TODO
                    createdAt={customer.customer.createdAt}
                    // TODO
                    totalSpent={customer.customer.totalSpent}
                    ordersCount={customer.customer.ordersCount}
                    email={customer.customer.email}
                    phone={customer.customer.phone}
                    currency={customer.customer.currency}
                    tags={customer.customer.tags}
                    address={customer.customer.billingAddress}
                    defaultOpen={true}
                  />
                );
              }
            })}
          {ordersObj.length !== 0 &&
            ordersObj.map((order) => (
              <OrderTab
                key={order.id}
                title={`Order #${order.id} | ${
                  order.order.total + ' ' + order.order.currency
                } | ${order.order.status}`}
                createdAt={order.order.createdAt}
                status={order.order.status}
                note={order.order.note}
                orderLink={order.order.url}
                discountCode={order.order.discountCode}
                totalSpent={order.order.total}
                items={order.order.items}
                paymentGateway={order.order.paymentGateway}
                currency={order.order.currency}
                shippingAddress={order.customer.shippingAddress}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
