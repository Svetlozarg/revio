import React, { useEffect, useState, useRef } from 'react';
import { storeFrontRequest } from '../../../utils/shopify';
import Product from './Product';
import ClipLoader from 'react-spinners/ClipLoader';

const ChatProductBox = ({ onClose, getProducts, attachedProducts }) => {
  const search = useRef('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch 9 Products On Load
  const fetchProducts = async () => {
    // Fetch first 9 products
    const products = await storeFrontRequest({
      query: `{
      products(first: 12) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  transformedSrc
                  altText
                }
              }
            }
          }
        }
      }
    }`,
      variables: {},
    });

    setTimeout(() => {
      setProducts(products.data.products.edges);

      setLoading(false);
    }, 1000);
  };

  // Search Products
  const handleSearch = async (e) => {
    e.preventDefault();

    if (search.current.value === '') fetchProducts();

    const products = await storeFrontRequest({
      query: `{
        products(first: 99, query: "title:${search.current.value}") {
          edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  transformedSrc
                  altText
                }
              }
            }
          }
        }
        }
      }`,
      variables: {},
    });

    setProducts(products.data.products.edges);
  };

  // Get selected products from <Product />
  let itemArray = [];
  const pull_data = (data) => {
    if (data?.isSelected) {
      itemArray.push(data);
    } else if (!data?.isSelected) {
      const index = itemArray.findIndex((item) => item.title === data.title);
      if (index > -1) {
        itemArray.splice(index, 1);
      }
    }
  };

  // Handle Attach Button
  const handleAttach = () => {
    getProducts(itemArray);
    onClose(document.getElementById('ProductBox'));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      id="ProductBox"
      className="chat-product-box shadow-2xl rounded-2xl px-8 pb-8 border dark:bg-gray-700"
      onClose={onClose}
    >
      {/* Close Button */}
      <div className="flex items-center justify-end">
        <button
          type="button"
          className="bg-white rounded-md p-2 mt-4 mb-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={onClose}
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
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
      {/* Search Form */}
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Search for products
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for products"
            ref={search}
            onChange={handleSearch}
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </form>
      {/* Loading */}
      {loading && (
        <div className="w-full h-full flex justify-center items-center pb-10">
          <ClipLoader size={100} loading={loading} color={'#000'} />
        </div>
      )}
      {/* Products */}
      {!loading && (
        <div className="w-4/5 h-4/5 mx-auto overflow-y-auto pb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((item, i) => {
              const product = item.node;
              const image = product.images.edges[0].node;
              return (
                <Product
                  key={i}
                  image={image.transformedSrc}
                  title={product.title}
                  price={product.priceRange.minVariantPrice.amount}
                  isSelected={pull_data}
                  alreadySelected={
                    attachedProducts !== null ? attachedProducts : null
                  }
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Attach Button */}
      {!loading && (
        <div className="w-full text-center mb-2 pt-1">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-20 py-2.5 mr-2 mb-1 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleAttach}
          >
            Attach
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatProductBox;
