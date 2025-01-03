import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      {/* Header with Upload button */}
      <div className="bg-gray-800 py-2 px-4 flex mt-28 justify-between  items-center shadow-sm">
        <h2 className="font-bold text-lg text-white">All Products</h2>
        <button
          className="border-2 hover:text-white  transition-all 
          hover:bg-gray-500 border-gray-500 
          text-white font-medium py-1 px-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* All Products Grid */}
      <div
        className="flex flex-wrap gap-5 py-4 h-[calc(100vh-200px)] 
        overflow-y-scroll bg-gray-800 px-4"
      >
        {allProduct.length > 0 ? (
          allProduct.map((product, index) => (
            <AdminProductCard
              data={product}
              key={index + 'allProduct'}
              fetchdata={fetchAllProduct}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No products available.
          </p>
        )}
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
