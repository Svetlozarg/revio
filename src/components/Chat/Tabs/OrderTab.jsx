import { useState } from 'react';
import {
  FaBan,
  FaStickyNote,
  FaClock,
  FaRegCalendarAlt,
  FaPercent,
  FaLink,
  FaMoneyBillAlt,
  FaAngleUp,
  FaAngleDown,
  FaBox,
} from 'react-icons/fa';
import { FiRotateCw } from 'react-icons/fi';

const InfoTab = ({
  title,
  createdAt,
  status,
  note,
  orderLink,
  discountCode,
  totalSpent,
  items,
  paymentGateway,
  currency,
  shippingAddress,
}) => {
  const [open, setOpen] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  return (
    <div>
      {/* Header */}
      <h2 id="accordion-open-heading-1" onClick={() => setOpen(!open)}>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-left border border-b-0 border-gray-200 rounded-t-xl dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          data-accordion-target="#accordion-open-body-1"
          aria-expanded="true"
          aria-controls="accordion-open-body-1"
        >
          {/* Title + Icon */}
          <span className="flex items-center text-sm">
            <FaBox size={15} style={{ marginRight: '1rem' }} />
            {title}
          </span>
          {!open ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
        </button>
      </h2>
      {/* Body */}
      <div
        id="accordion-open-body-1"
        style={open ? { display: 'block' } : { display: 'none' }}
        aria-labelledby="accordion-open-heading-1"
      >
        <div className="flex justify-evenly items-center border py-2">
          <button className="flex items-center justify-center gap-2 hover:text-green-700 transition-all font-bold text-sm">
            <FiRotateCw /> Refund
          </button>
          <button className="flex items-center justify-center gap-2 hover:text-red-600 transition-all font-bold text-sm">
            <FaBan />
            Cancel
          </button>
        </div>
        <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-sm">
          {/* Status */}
          <div className="flex gap-2 items-center justify-start">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex items-center justify-center gap-1">
              <FaClock />
              Status:{' '}
            </p>
            <p
              className="mb-2 text-white bg-gray-400 rounded"
              style={{ padding: '1px 4px' }}
            >
              {status}
            </p>
          </div>

          {/* Created At */}
          <div className="flex gap-2 items-center justify-start">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex items-center justify-center gap-1">
              <FaRegCalendarAlt />
              Created at:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              {createdAt.split('T')[0]} {createdAt.split('T')[1].split('+')[0]}
            </p>
          </div>

          {/* Items */}
          <div className="flex gap-2 items-center justify-start">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex items-center justify-center gap-1">
              <FaMoneyBillAlt />
              Items:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400 relative">
              <span
                className="cursor-pointer"
                onClick={() => {
                  setOpenTooltip(!openTooltip);
                }}
              >
                Show products
              </span>
              {openTooltip && (
                <span className="absolute border-2 border-gray-500 rounded p-2 left-[-70px] bottom-6 bg-white text-black w-[250px]">
                  {items.map((item) => (
                    <div key={item.id}>
                      <p>
                        {item.name} [{item.quantity}]{' '}
                        {item.total_discount !== '0.00'
                          ? `(-${item.total_discount}%)`
                          : ''}
                      </p>
                      <p>{item.variant_title}</p>
                    </div>
                  ))}
                </span>
              )}
            </p>
          </div>

          {/* Total Spent */}
          <div className="flex gap-2 items-center justify-start">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex items-center justify-center gap-1">
              <FaMoneyBillAlt />
              Total spent:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              {totalSpent} {currency}
            </p>
          </div>

          {/* Shipping Address */}
          <div className="flex gap-2 items-start justify-start">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex items-center justify-center gap-1">
              <FaMoneyBillAlt />
              Address:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              {shippingAddress.address1 +
                ', ' +
                shippingAddress.city +
                ', ' +
                shippingAddress.province +
                ', ' +
                shippingAddress.country_code +
                ', ' +
                shippingAddress.zip}
            </p>
          </div>

          {/* Payment Gateway */}
          <div className="flex gap-2 items-center justify-start">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex items-center justify-center gap-1">
              <FaMoneyBillAlt />
              Gateway:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              {paymentGateway.map((item, i) => {
                if (i + 1 !== paymentGateway.length) {
                  return <span className="capitalize">{item}, </span>;
                } else {
                  return <span className="capitalize">{item}</span>;
                }
              })}
            </p>
          </div>

          {/* Note */}
          <div className="flex gap-2 items-center justify-start">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex items-center justify-center gap-1">
              <FaStickyNote />
              Note:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              {note !== undefined ? note : '-'}
            </p>
          </div>

          {/* Discount Code */}
          <div className="flex gap-2 items-center justify-start">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex items-center justify-center gap-1">
              <FaPercent />
              Discount code:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              {discountCode}
            </p>
          </div>

          {/* Order Link */}
          <div className="flex gap-2 items-center justify-start">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex items-center justify-center gap-1">
              <FaLink />
              Order link:{' '}
            </p>
            <a
              href={orderLink}
              target="_blank"
              className="mb-2 text-blue-600 underline"
              rel="noreferrer"
            >
              Click
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoTab;
