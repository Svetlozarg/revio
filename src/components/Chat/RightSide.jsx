import UserTab from './Tabs/UserTab';
import OrderTab from './Tabs/OrderTab';

const RightSide = () => {
  return (
    <div className="flex flex-col py-8 pl-1 pr-1 w-80 bg-white flex-shrink-0 mr-4">
      <div className="h-full flex flex-col items-start justify-start w-full overflow-y-scroll">
        <div className="ml-2 font-bold text-2xl mb-4">Details</div>

        {/* Accordion */}
        <div id="accordion-open" data-accordion="open">
          <UserTab
            title="Henry Boys | 286 order(s)"
            createdAt="08/16/2018"
            totalSpent="7560.00"
            ordersCount="382"
            email="a@abv.bg"
            phone="0123456789"
            currency="BGN"
            tags="Bulgaria"
            defaultOpen={true}
          />
          <OrderTab
            title="Order #1891 | 20.00 USD | pending"
            createdAt="08/16/2018"
            status="Pending"
            note="-"
            orderLink="Link"
            discountCode="-"
            totalSpent="388.00"
          />
          <OrderTab
            title="Order #1891 | 20.00 USD | pending"
            createdAt="08/16/2018"
            status="Pending"
            note="-"
            orderLink="Link"
            discountCode="-"
            totalSpent="388.00"
          />
          <OrderTab
            title="Order #1891 | 20.00 USD | pending"
            createdAt="08/16/2018"
            status="Pending"
            note="-"
            orderLink="Link"
            discountCode="-"
            totalSpent="388.00"
          />
          <OrderTab
            title="Order #1891 | 20.00 USD | pending"
            createdAt="08/16/2018"
            status="Pending"
            note="-"
            orderLink="Link"
            discountCode="-"
            totalSpent="388.00"
          />
          <OrderTab
            title="Order #1891 | 20.00 USD | pending"
            createdAt="08/16/2018"
            status="Pending"
            note="-"
            orderLink="Link"
            discountCode="-"
            totalSpent="388.00"
          />
          <OrderTab
            title="Order #1891 | 20.00 USD | pending"
            createdAt="08/16/2018"
            status="Pending"
            note="-"
            orderLink="Link"
            discountCode="-"
            totalSpent="388.00"
          />
          <OrderTab
            title="Order #1891 | 20.00 USD | pending"
            createdAt="08/16/2018"
            status="Pending"
            note="-"
            orderLink="Link"
            discountCode="-"
            totalSpent="388.00"
          />
        </div>
      </div>
    </div>
  );
};

export default RightSide;
