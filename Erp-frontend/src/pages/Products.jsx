import React , {useState, useEffect} from 'react' 

import BackButton from '../components/shared/BackButton';
import { MdDeleteForever, MdOutlineAddToDrive } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";

import { toast } from 'react-toastify'

import BottomNav from '../components/shared/BottomNav';

import { api } from '../https';


const Products = () => {
    const Button = [
        { label: 'Add Product', icon: <MdOutlineAddToDrive className='text-white' size={20} />, action: 'product' }
    ];

    const [isProductModal, setIsProductModal] = useState(false);

    const handleProductModal = (action) => {
        if (action === 'product') setIsProductModal(true)
    }

    // fetch products - any error on .map or length check next function
    const [list, setList] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await api.get('/api/products/')

            if (response.data.success) {
                setList(response.data.products)
            } else {
                toast.error(response.data.message || 'Product not found')
            }

        } catch (error) {
            // Show backend error message if present in error.response
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message)
            }
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


    // remove Products
    const removeProduct = async (id) => {

        try {

            const product = await api.post('/api/products/remove', { id },)

            if (response.data.success) {

                //Update the LIST after Remove
                toast.success(response.data.message)
                window.location.reload()

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };


    return (
       <section className='h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden'>

            <div className='flex items-center justify-between px-8 py-2'>
                <div className='flex items-center'>
                    <BackButton />
                    <h1 className='text-lg font-semibold text-[#1f1f1f]'>Products Management</h1>
                </div>

                <div className='flex items-center justify-around gap-3'>
                    {Button.map(({ label, icon, action }) => {
                        return (
                            <button
                                onClick={() => handleProductModal(action)}
                                className='shadow-lg cursor-pointer bg-[#D2B48C] hover:bg-blue-600 text-white hover:text-white
                                px-5 py-2 rounded-lg  font-semibold text-sm flex items-center gap-2'>
                                {label} {icon}
                            </button>
                        )
                    })}
                </div>

                {/* {isCategoryModalOpen && <CategoryAdd setIsCategoryModalOpen={setIsCategoryModalOpen} />} */}

            </div>


            <div className='mt-10' >

                <div className='overflow-x-auto mx-25'>
                    <table className='w-[100%] text-left text-[#1a1a1a' >
                        <thead className='bg-[#D2B48C] text-xs font-semibold text-white'>
                            <tr>
                                <th className='p-2'>Name</th>
                                <th className='p-2'>Category</th>
                                <th className='p-2'>Store</th>
                                <th className='p-2'>Quantity</th>
                                <th className='p-2'>Buy price</th>
                                <th className='p-2'>Sale price</th>

                                <th className='p-1' style={{ marginRight: '0px' }}></th>
                            </tr>
                        </thead>

                        <tbody>

                            {list.length === 0
                                ? (<p className='ml-5 mt-5 text-xs text-red-700 flex items-start justify-start'>Your products list is empty . Start adding customers !</p>)
                                : list.map((product, index) => (

                                    <tr
                                        // key ={index}
                                        className='border-b border-[#D2B48C] text-xs font-semibold'
                                    >
                                        <td className='p-2' hidden>{product._id}</td>
                                        <td className='p-2'>{product.productName}</td>
                                        <td className='p-2'>{product.productCategory}</td>
                                        <td className='p-2'>{product.productStore}</td>
                                        <td className='p-2'>{product.quantity}</td>
                                        <td className='p-2'>{product.priceBuy}</td>
                                        <td className='p-2'>{product.priceSale}</td>
                                     
                                        <td className='p-1  flex flex-wrap gap-5  justify-center bg-zinc-1' style={{ marginRight: '0px' }}>

                                            <button className={`text-red-700 cursor-pointer text-sm font-semibold `}>
                                                <LiaEditSolid size={20} className='w-5 h-5 text-sky-600 rounded-full' onClick={() => setIsItemEditModalOpen(true)} />
                                            </button>



                                            <button className={`text-red-700 cursor-pointer text-sm font-semibold`}>
                                                <MdDeleteForever onClick={() => { setSelectedProduct(product); setDeleteModalOpen(true); }} size={20} className='w-5 h-5 text-orange-600 rounded-full' />
                                            </button>

                                            
{/*                                             
                                            {detailsButton.map(({ label, icon, action }) => {

                                                return (
                                                    <button className='cursor-pointer 
                                                    py-2 rounded-lg text-green-600 font-semibold text-sm '
                                                        onClick={() => handleDetailsModal(customer._id, customer.customerName, action)}
                                                    >
                                                        {label} {icon}
                                                    </button>
                                                )
                                            })} */}


                                            {/* {paymentButton.map(({ label, icon, action }) => {

                                                return (
                                                    <button className='cursor-pointer 
                                    py-2 rounded-lg text-sky-500 text-xs font-semibold text-sm flex items-center gap-2'
                                                        onClick={() => handlePaymentModal(customer._id, customer.customerName, customer.balance, action)}
                                                    >
                                                        {label} {icon}
                                                    </button>
                                                )
                                            })} */}



                                        </td>



                                    </tr>
                                ))}


                        </tbody>
                    </table>

                </div>

                {/* {isDetailsModal && <DetailsModal setIsDetailsModal={setIsDetailsModal} />}
                {isPaymentModal && <CustomerPayment setIsPaymentModal={setIsPaymentModal} />} */}

            </div>

            <BottomNav />

            {/* Place the ConfirmModal here */}

            <ConfirmModal

                open ={deleteModalOpen}
                productName ={selectedProduct?.productName}
                onClose ={() => setDeleteModalOpen(false)}
              
                onConfirm ={() => {
                    removeProduct(selectedProduct._id);
                    setDeleteModalOpen(false);
                }}
            />


        </section>
    );
};



// You can put this at the bottom of your Services.jsx file or in a separate file
const ConfirmModal = ({ open, onClose, onConfirm, productName }) => {
  if (!open) return null;
  return (
       <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
    >
      
      <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
        {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
        <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-red-600">{productName}</span>?</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  );
};


export default Products ;