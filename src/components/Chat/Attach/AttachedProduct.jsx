const AttachedProduct = ({ title = '', image = '', deleteProduct = '' }) => {
  return (
    <div
      className="w-34 h-24 bg-white rounded-lg border border-gray-300 shadow-md dark:bg-gray-800 dark:border-gray-700"
      title={title}
    >
      {/* Close Button */}
      <div className="flex items-center justify-end relative">
        <button
          type="button"
          className=" rounded-md inline-flex pt-6 pr-1 justify-center text-black-400 hover:text-black-500 focus:outline-none focus:ring-2 focus:ring-inset absolute"
          onClick={() => deleteProduct(title)}
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <img
        className="rounded-t-lg  w-full h-full object-cover rounded-md"
        src={image + '&width=512'}
        alt=""
      />
    </div>
  );
};

export default AttachedProduct;
