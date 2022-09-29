import { useState, useEffect } from 'react';
import {
  FaRegCalendarAlt,
  FaMoneyBillAlt,
  FaShoppingCart,
  FaEnvelope,
  FaPhone,
  FaDollarSign,
  FaTags,
  FaAngleUp,
  FaAngleDown,
  FaUserAlt,
} from 'react-icons/fa';

const InfoTab = ({
  title,
  createdAt,
  totalSpent,
  ordersCount,
  email,
  phone,
  currency,
  tags,
  defaultOpen,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (defaultOpen) {
      setOpen(true);
    }
  }, [defaultOpen]);

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
            <FaUserAlt size={15} style={{ marginRight: '1rem' }} />
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
        <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-sm">
          {/* Created At */}
          <div className="flex gap-2">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex justify-start items-center gap-1">
              <FaRegCalendarAlt />
              Created at:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">{createdAt}</p>
          </div>

          {/* Total Spent */}
          <div className="flex gap-2">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex justify-start items-center gap-1">
              <FaMoneyBillAlt />
              Total spent:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              {totalSpent}
            </p>
          </div>

          {/* Orders count */}
          <div className="flex gap-2">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex justify-start items-center gap-1">
              <FaShoppingCart />
              Orders count:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              {ordersCount}
            </p>
          </div>

          {/* Email */}
          <div className="flex gap-2">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex justify-start items-center gap-1">
              <FaEnvelope />
              Email:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">{email}</p>
          </div>

          {/* Phone */}
          <div className="flex gap-2">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex justify-start items-center gap-1">
              <FaPhone />
              Phone:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">{phone}</p>
          </div>

          {/* Currency */}
          <div className="flex gap-2">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex justify-start items-center gap-1">
              <FaDollarSign />
              Currency:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">{currency}</p>
          </div>

          {/* Tags */}
          <div className="flex gap-2">
            <p className="mb-2 text-gray-500 dark:text-gray-400 font-bold flex justify-start items-center gap-1">
              <FaTags />
              Tags:{' '}
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">{tags}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoTab;
