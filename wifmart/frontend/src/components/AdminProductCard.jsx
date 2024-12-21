import React, { useState } from 'react';
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import AdminDeleteProduct from './AdminDeleteProduct'; // Import the AdminDeleteProduct component
import displayNGNCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false); // State for managing delete modal visibility

    return (
        <div className='bg-white p-4 rounded shadow'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img
                        src={data?.productImage[0]}
                        width={120}
                        height={120}
                        className='object-fill mx-auto h-full rounded'
                        alt={data?.productName || "Product Image"}
                    />
                </div>
                <h1 className='text-ellipsis line-clamp-2 font-medium my-2'>
                    {data?.productName}
                </h1>

                <div>
                    {/* Conditionally render the price if it's greater than 0 */}
                    {data.sellingPrice > 0 && (
                        <p className='font-semibold text-black'>
                            {displayNGNCurrency(data.sellingPrice)}
                        </p>
                    )}

                    <div className='flex gap-2 mt-2'>
                        {/* Edit button to open the modal */}
                        <div
                            className='w-fit ml-auto p-2 cursor-pointer bg-red-100 hover:text-white hover:bg-red-600 rounded-full'
                            onClick={() => setEditProduct(true)}
                        >
                            <MdModeEditOutline />
                        </div>

                        {/* Delete button to open the delete modal */}
                        <div
                            className='w-fit ml-auto p-2 cursor-pointer bg-red-100 hover:text-white hover:bg-red-600 rounded-full'
                            onClick={() => setDeleteProduct(true)}
                        >
                            <MdDelete />
                        </div>
                    </div>
                </div>
            </div>

            {/* Display the edit product modal */}
            {editProduct && (
                <AdminEditProduct
                    productData={data}
                    onClose={() => setEditProduct(false)} // Close the edit modal
                    fetchdata={fetchdata}
                />
            )}

            {/* Display the delete product modal conditionally */}
            {deleteProduct && (
                <AdminDeleteProduct
                    productId={data?._id} // Use `_id` from the product schema
                    onClose={() => setDeleteProduct(false)} // Close the delete modal
                    fetchData={fetchdata}
                />
            )}
        </div>
    );
};

export default AdminProductCard;
