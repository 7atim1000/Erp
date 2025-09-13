import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '../../https';
import { toast } from 'react-toastify'
import { IoCloseCircle } from 'react-icons/io5';


const ServiceEdit = ({ item, setIsEditItemModal, fetchItems }) => {
    const handleClose = () => {
        setIsEditItemModal(false)
    };
   
    const [category, setCategory] = useState(
        item.category?._id || item.category // handles both object and string
    );
     const [unit, setUnit] = useState(
        item.unit?._id || item.unit || ""
    );

    const [serviceName, setServiceName] = useState(item.serviceName);
    const [price, setPrice] = useState(item.price);
    const [buyingPrice, setbuyingPrice] = useState(item.buyingPrice);
    const [qty, setQty] = useState(item.qty);
    const [newImage, setNewImage] = useState(null);

    // fetch categories and units
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);



    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();

            if (newImage) {
                formData.append('image', newImage);
            }

            formData.append('category', category);
            formData.append('serviceName', serviceName);
            formData.append('price', price);
            formData.append('buyingPrice', buyingPrice);
            formData.append('qty', qty);
            formData.append('unit', unit);

            const { data } = await api.put(`/api/services/${item._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (data.success) {
                toast.success(data.message);
                fetchItems();
                handleClose();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };


    // Fetch categories and units
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const categoriesResponse = await api.get('/api/category/');
                if (categoriesResponse.data.success) {
                    setCategories(categoriesResponse.data.categories);
                }

                // Fetch units
                const unitsResponse = await api.get('/api/units/');
                if (unitsResponse.data.success) {
                    setUnits(unitsResponse.data.units);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchData();
    }, []);

   

    return (

        <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center shadow-lg/30 z-50'
            style={{ backgroundColor: 'rgba(145, 143, 143, 0.4)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ durayion: 0.3, ease: 'easeInOut' }}
                className='bg-white p-2 rounded-lg shadow-lg/30 w-120 md:mt-5 mt-5 h-[calc(100vh)]'
            >


                {/*Modal Header */}
                <div className="flex justify-between items-center mb-2 shadow-xl p-2">
                    <h2 className='text-[#1a1a1a] text-md font-bold'>Update Item</h2>
                    <button onClick={handleClose} className='rounded-xs text-[#be3e3f] hover:bg-[#be3e3f]/30 cursor-pointer
                                border-b border-[#be3e3f]'>
                        <IoCloseCircle size={22} />
                    </button>
                </div>


                {/*Modal Body*/}
                <form className='mt-3 space-y-6' onSubmit={onSubmitHandler}>
                    <div className='flex items-center gap-4 mb-2'>
                        <label htmlFor='edit-service-img'>
                            <img
                                className='w-16 h-16 rounded-full cursor-pointer  p-1 border-b-3 border-sky-500 shadow-lg/30 object-cover'
                                src={newImage ? URL.createObjectURL(newImage) : item.image}
                                alt="item"
                            />
                        </label>
                        <input
                            onChange={(e) => setNewImage(e.target.files[0])}
                            type='file'
                            id='edit-service-img'
                            hidden
                        />
                        <p className='text-xs font-semibold text-[#0ea5e9] underline'>Change image</p>
                    </div>

                    <div className='mt-5 flex items-center justify-between'>
                        <label className='w-[20%] text-[#1a1a1a] block mb-2 mt-3 text-xs font-normal'>Category :</label>
                        <div className='w-[80%] flex items-center rounded-xs p-3 bg-white shadow-xl'>
                            <select className='w-full bg-zinc-100 h-8 rounded-xs text-xs font-normal    '
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}

                                required
                            >
                        
                                {categories.map((cat) => (

                                    <option key={cat._id} value={cat.categoryName}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-[#1a1a1a] block mb-2 mt-3 text-xs font-normal'>Item Name :</label>
                        <div className='w-[80%] flex items-center rounded-xs p-3  bg-white shadow-xl'>
                            <input
                                type='text'

                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}

                                placeholder='Enter Item name'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm
                                        border-b border-yellow-700'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>


                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-black block mb-2 mt-3 text-xs font-normal'>Sale Price  :</label>
                        <div className='flex w-[80%] items-center rounded-xs p-3 bg-white shadow-xl'>
                            <input
                                type='text'

                                value={price}
                                onChange={(e) => setPrice(e.target.value)}

                                placeholder='Enter sale price of unit'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm
                                        border-b border-yellow-700'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-black block mb-2 mt-3 text-xs font-normal'>Buy Price :</label>
                        <div className='flex w-[80%] items-center rounded-xs p-3 bg-white shadow-xl'>
                            <input
                                type='text'

                                value={buyingPrice}
                                onChange={(e) => setbuyingPrice(e.target.value)}

                                placeholder='Enter buy price of unit'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm
                                        border-b border-yellow-700'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between gap-5'>
                        {/* <label className='w-[20%] text-[#1a1a1a] block mb-2 mt-3 text-xs font-medium'>Quantity:</label> */}
                        <div className='w-[80%] items-center rounded-xs p-3 bg-white shadow-xl'>
                            <input
                                type='text'
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}

                                placeholder='Available Quantity'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-xs
                                        border-b border-yellow-700  w-full'
                                required
                                autoComplete='none'
                            />
                        </div>


                        <div className='flex w-full items-center rounded-xs p-2 bg-white shadow-lg/30'>
                            <select className='w-full bg-zinc-100 h-8 rounded-xs text-xs font-normal'
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                required
                            >
                                {units.map((unit) => (

                                    <option key={unit._id} value={unit.unitName}>
                                        {unit.unitName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='p-3 rounded-xs mt-3 py-3 text-sm bg-[#0ea5e9] text-white font-semibold 
                            cursor-pointer '
                    >
                        Update Item
                    </button>


                </form>

            </motion.div>
        </div>

       
    );
};


export default ServiceEdit ;