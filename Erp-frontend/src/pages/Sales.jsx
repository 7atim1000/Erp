import React, { useState, useEffect } from 'react'
import BackButton from '../components/shared/BackButton'
import { useSelector } from 'react-redux'
import { FaCircleUser } from "react-icons/fa6";
import { IoMdArrowDropright } from "react-icons/io";
import { ImUserPlus } from "react-icons/im";
import SelectCustomer from '../components/sales/SelectCustomer';

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { getBgColor } from '../utils'
import { GrRadialSelected } from 'react-icons/gr';
import { getCategories, getServices } from '../https';
import CustomerInfo from '../components/sales/CustomerInfo';
import CartInfo from '../components/sales/CartInfo';
import Bills from '../components/sales/Bills';
import { BsFillCartCheckFill } from "react-icons/bs";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { IoMdArrowDropdownCircle } from "react-icons/io";

import {useDispatch} from 'react-redux';
import { addItems} from '../redux/slices/saleSlice';
import { updateService } from '../redux/slices/customerSlice';
import { toast } from 'react-toastify';
import CustomerAdd from '../components/customers/CustomerAdd';


// import CustomerAdd from '../components/sales/CustomerAdd'; // Assuming this is the correct import

const Sales = () => {
    const saleBtn = [{ label: "Select Customer", action: 'sale'}];

    const [isSelectCustomerModalOpen, setIsSelectCustomerModalOpen] = useState(false);
    const handleSaleModalOpen = (action) => {
        if (action === 'sale') setIsSelectCustomerModalOpen(true)
    }

    // Add new customer
    const addcstButton = [
        { label: '', icon: <ImUserPlus className='text-[#0ea5e9]' size={20} />, action: 'customer' }
    ];

    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
    const handleOpenModal = (action) => {
        if (action === 'customer') setIsCustomerModalOpen(true);
    };

    // Menu container 
    // fetch categories from DB :-
    const { data: responseData, IsError } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            return await getCategories();
        },
        placeholderData: keepPreviousData,
    });
    
    if (IsError) {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }

    
    const [services, setServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [pagination, setPagination] = useState({});

    const fetchServices = async (filters = {}) => {
        try {
            const response = await getServices({
                category: filters.category || 'all',
                search: filters.search || '',
                sort: filters.sort || '-createdAt',
                page: filters.page || 1,
                limit: filters.limit || 10
            });
            setServices(response.data.data || response.data.services);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch services when category changes
    useEffect(() => {
        fetchServices({
            category: selectedCategory === 'all' ? '' : selectedCategory,
            page: 1 // Reset to first page when category changes
        });
    }, [selectedCategory]);

    // to fetch customer name from customer Modal  bg-[#D2B48C]
    const customerData = useSelector(state => state.customer);

    // State to track quantities for each service by their _id
    // Increment and decrement functions
    const [selectedService, setSelectedService] = useState(null);
    const [quantities, setQuantities] = useState({});

    const increment = () => {
        if (!selectedService) return;

        setQuantities(prev => ({
            ...prev,
            [selectedService._id]: (prev[selectedService._id] || 0) + 1
        }));
    }

    const decrement = () => {
        if (!selectedService || !quantities[selectedService._id] || quantities[selectedService._id] <= 0) return;

        setQuantities(prev => ({
            ...prev,
            [selectedService._id]: prev[selectedService._id] - 1
        }));
    }

    const handleServiceChange = (e) => {
        const selectedServiceName = e.target.value;
        const service = services.find(s => s.serviceName === selectedServiceName);
        setSelectedService(service || null);
    }

    const getCurrentQuantity = () => {
        if (!selectedService) return 0;
        return quantities[selectedService._id] || 1;
    };


    // handle add to cart
    
    const dispatch = useDispatch();
    const handleAddToCard = (item) => {
        const { id, name, price, qty, unit } = item ;
        const getCurrentQuantity = quantities[item.id] || 1;
        if (getCurrentQuantity === 0) {
            toast.warning('Please specify the required quantity.');
            return;
        }
        if (qty < 0 ) {
            toast.error ('Sorry item does not have balance') ;
            return;
        }
        if (qty < getCurrentQuantity) {
            toast.error('Sorry the balance is not enough the procedure.');
            return;
        }
        if (getCurrentQuantity > 0 && getCurrentQuantity <= qty) {
            // slice item for sale send ID versiaal ID
            const service = {serviceId: id}
            // editing service or ItemId from this method to itemId = id means id from {id, name, price, qty, unit, cat}
            const newObj = { id: id, name, pricePerQuantity: price, quantity: getCurrentQuantity, price: price * getCurrentQuantity }
            // send data to saleInfo
            // store data in sale Slice
            dispatch(addItems(newObj));
            // slice item
            dispatch(updateService({service}))
            setQuantities(prev => ({
                ...prev, [item.id] : 0
            }))

            setSelectedService(null);
            fetchServices({ category: selectedCategory === 'all' ? '' : selectedCategory, page: 1 })
        }

            return;
     }

 
    return (
       <section className='h-[calc(100vh)] overflow-y-scroll scrollbar-hidden flex gap-2 bg-[#f5f5f5] shadow-xl'>
            <div className='flex-[3] bg-white shadow-xl rounded-lg pt-0'>
                
                <div className='flex items-center justify-between px-4 py-2 shadow-xl mb-2 bg-white rounded-t-lg'>
                    <div className='flex flex-wrap gap-0 items-center cursor-pointer'>
                        <BackButton />
                        <h1 className='text-[#1a1a1a] text-md font-bold tracking-wide'>Sale Invoice</h1>
                    </div>
        
                    <div className='flex items-center justify-content gap-4 shadow-xl px-1 h-8 bg-[#f5f5f5] rounded-sm'>
                        <div className='flex items-center gap-3 cursor-pointer '>
                            <div className='p-2 mb-4 flex justify-center cursor-pointer'>
                                {saleBtn.map(({ label, action }) => {
                                    return (
                                        <button onClick={() => handleSaleModalOpen(action)} 
                                            className='flex gap-1 items-center cursor-pointer'>
                                            <p className='text-xs mt-3 underline text-zinc-600 font-semibold'>{label}</p>
                                            <IoMdArrowDropright className='inline mt-4 text-[#0ea5e9]' size={20}/>
                                        </button>
                                    );
                                })}
                            </div>

                            <FaCircleUser className='h-5 w-5 text-yellow-700'/>
                            <div className='flex items-center gap-1'>
                                <p className='text-xs font-normal text-[#1a1a1a]'>
                                    Customer :
                                </p>
                                <p className='text-xs font-medium text-yellow-700'>
                                    {customerData.customerName || 'Customer name'}
                                </p>
                            </div>
                            
                            <div className='flex items-center gap-1'>
                                <p className='text-xs font-normal text-[#1a1a1a]'>
                                    Balance :
                                </p>
                               
                                <p className={`${customerData.balance === 0 ? 'text-[#0ea5e9]' : 'text-[#be3e3f]'} 
                                    text-xs font-medium`}>
                                    {(Number(customerData.balance) || 0).toFixed(2)}
                                    <span className='text-xs text-[#1a1a1a] font-normal'> AED</span>
                                </p>  
                            </div>

                            <div className='flex items-center justify-around gap-3'>
                                {addcstButton.map(({ label, icon, action }) => {
                                    return (
                                        <button
                                            onClick={() => handleOpenModal(action)}
                                            className='cursor-pointer px-2 py-2 font-semibold text-sm 
                                            flex items-center gap-2'>
                                            {label} {icon}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                
               
                
                <div className='flex w-full gap-1 justify-start items-start p-1'>
                    {/* Categories Sidebar */}
                    <div className='flex-col justify-between p-2 w-[16%] bg-white shadow-xl/30 rounded-sm h-[calc(90vh)]'>
                        <button
                            className='w-[100%] grid grid-cols-1 p-1 items-center mb-3 rounded-sm h-[45px] cursor-pointer shadow-lg/30'
                            style={{ backgroundColor: selectedCategory === 'all' ? getBgColor() : '#f3f4f6' }}
                            onClick={() => setSelectedCategory('all')}
                        >
                            <div className='flex items-center justify-between w-full shadow-lg/30'>
                                <h1 className='text-xs font-semibold' style={{ color: selectedCategory === 'all' ? 'white' : 'black' }}>
                                    All Categories
                                </h1>
                                {selectedCategory === 'all' && <GrRadialSelected className='text-[#e6e6e6]' size={20} />}
                            </div>
                        </button>

                        {responseData?.data.data.map(category => (
                            <button
                                key={category._id}
                                className='w-[100%] grid grid-cols-1 p-1 items-center mb-3 rounded-sm h-[45px] 
                                    cursor-pointer shadow-lg/30 '
                                style={{ backgroundColor: selectedCategory === category.categoryName ? getBgColor() : '#f3f4f6' }}
                                onClick={() => setSelectedCategory(category.categoryName)}
                            >
                                <div className='flex items-center justify-between w-full shadow-lg/30'>
                                    <h1
                                        className='text-xs font-semibold'
                                        style={{ color: selectedCategory === category.categoryName ? 'white' : 'black' }}
                                    >
                                        {category.categoryName}
                                    </h1>
                                    {selectedCategory === category.categoryName && <GrRadialSelected className='text-[#e6e6e6]' size={20} />}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Services */}
                    <div className='flex flex-col w-full px-5 gap-5'>
                        <div className='flex items-center'>
                            <label className='w-[10%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Item Name :</label>
                            <div className='flex w-[90%] items-center p-3 bg-white shadow-xl'>
                                <select
                                    className='w-full bg-[#f5f5f5] h-8 rounded-sm w-[500px] text-xs font-normal border-b-1 border-yellow-700'
                                    required
                                    onChange={handleServiceChange}
                                    value={selectedService?.serviceName || ''}
                                >
                                    <option value="">Select a service</option>
                                    {services.map((service, index) => (
                                        <option 
                                            key={index} 
                                            value={service.serviceName} 
                                            className='text-xs font-normal'>
                                            {service.serviceName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {selectedService && (
                            <div className='flex items-center justify-between p-2 bg-white shadow-lg/30 rounded-sm'>
                                <div className='flex-1'>
                                    <h3 className='text-sm font-semibold text-[#0ea5e9]'>{selectedService.serviceName}</h3>
                                    <p>
                                        <span className ='text-xs text-gray-600 font-normal'>Selling price : </span>
                                        <span className='text-sm font-semibold text-[#0ea5e9]'>{selectedService.price}</span> 
                                        <span className ='text-xs text-gray-600'> AED</span>
                                    </p>
                                    
                                    <p>
                                        <span className ='text-xs text-gray-600 font-normal'>Available Quantity : </span>
                                        <span className='text-sm font-semibold text-[#0ea5e9]'>{selectedService.qty}</span> 
                                        <span className ='text-xs text-gray-600'> {selectedService.unit}</span></p>
                                </div>

                                <div className='flex gap-3 items-center justify-between shadow-xl
                                    px-4 py-1 rounded-sm mr-0 bg-[#f5f5f5]'>
                                    <button
                                        onClick={decrement}
                                        className='text-emerald-600 text-md cursor-pointer'
                                    >
                                        <IoMdArrowDropdownCircle className ='w-5 h-5'/>
                                    </button>

                                    <span className={`${getCurrentQuantity() > 9 ? "text-lg" : "text-xl"} text-[#0ea5e9] flex flex-wrap gap-2 font-semibold`}>
                                        {getCurrentQuantity()}
                                    </span>

                                    <button
                                        onClick={increment}
                                        className='text-[#0ea5e9] text-md cursor-pointer'
                                    >
                                        <IoMdArrowDropupCircle className ='w-5 h-5'/>
                                    </button>
                                </div>
                                <div className='ml-3'>
                                    {/* disabled={getCurrentQuantity() === 0}  */}
                                    <button onClick={() => handleAddToCard({
                                        id: selectedService._id,
                                        name: selectedService.serviceName, 
                                        price: selectedService.price, 
                                        qty: selectedService.qty, 
                                        unit: selectedService.unit,
                                        cat: selectedService.category
                                    })}
                                        className='cursor-pointer mt-0'>
                                        <BsFillCartCheckFill className='text-[#0ea5e9] rounded-lg flex justify-end items-end' size={25} />
                                    </button>
                                </div>
                            </div>
                        )}

                        <CartInfo />  
                    </div>
                     
                </div>

            </div>
            
            <div className='flex-[1] bg-white h-[100vh] rounded-lg shadow-lg pt-2'>
                <CustomerInfo  />
                <Bills 
                fetchServices={fetchServices} selectedCategory={selectedCategory}
                /> 
                 {/* <CartInfo /> 
                <hr className='border-white b-t-2'/>  */}
                 
            </div>

            {isSelectCustomerModalOpen && 
            <SelectCustomer 
            setIsSelectCustomerModalOpen={setIsSelectCustomerModalOpen}/>}
            
            {isCustomerModalOpen &&
                <CustomerAdd
                    setIsCustomerModalOpen={setIsCustomerModalOpen}
                />} 
       
       
       </section>
    );
};

export default Sales;


// Solution: Update Counter Logic to Use Service IDs
// I'll help you modify your Sales component to use service._id instead of the generic id variable. Here's the updated code with the necessary changes:

// Key Changes Made:
// Replaced the single quantity state with a quantities object that tracks quantities for each service by their _id

// Updated the increment and decrement functions to work with service IDs

// Added a helper function getQuantity(serviceId) to retrieve the quantity for a specific service

// Modified the counter display to use service._id instead of a generic id

// Adjusted the font size from "text-5xl" to "text-2xl" for better UI consistency

// Added proper service display with names and descriptions

// This implementation now correctly uses service._id for matching instead of a generic itemId, which was your main requirement. The quantities are now tracked per service rather than globally.

///////////////////////////////////////////
///////////////////////////////////////////
// The error occurs because you're trying to stringify an object that contains circular references (like Window objects). This often happens when you include React components or browser objects in your data.

// Looking at your code, the most likely culprit is that you're including React components or DOM elements in your saleData which is being sent to the server.

// Here's the fixed version of your handlePlaceOrder function:
// const handlePlaceOrder = async () => {
//     if (!paymentMethod){
//         enqueueSnackbar('please select a payment method', {variant: "warning"});
//         return;
//     }
//     if (customerData.customerName === '') {
//         enqueueSnackbar('please select customer', { variant: "warning" });
//         return;
//     }
//     if (saleData.length === 0) {
//         enqueueSnackbar('please select items', { variant: "warning" });
//         return;
//     }

//     // Clean saleData to remove any circular references or non-serializable data
//     const cleanSaleData = saleData.map(item => ({
//         // Only include the properties you actually need on the server
//         id: item.id,
//         name: item.name,
//         price: item.price,
//         pricePerQuantity: item.pricePerQuantity,
//         quantity: item.quantity,
//         // Add other properties you need, but avoid React components or functions
//     }));

//     if (paymentMethod === "Cash" || paymentMethod === 'Online') {
//         // Update quantity
//         const updatedItems = cleanSaleData.map(item => ({
//             id: item.id,
//             quantity: item.quantity
//         }));

//         try {
//             await api.post('/api/services/update-salequantities', { items: updatedItems });
//         } catch (error) {
//             console.error('Error updating quantities:', error);
//             enqueueSnackbar('Error updating item quantities', { variant: "error" });
//             return;
//         }
        
//         const saleOrderData = {
//             type: 'bills',
//             invoiceNumber: customerData.saleId,
//             customer: customerData.customerId, 
//             supplier: null, 
//             beneficiary: customerData.customerId, 
//             invoiceStatus: "In Progress",
//             invoiceType: "Sale invoice",
//             saleBills: {
//                 total: total,
//                 tax: tax,
//                 totalWithTax: totalPriceWithTax,
//                 payed: payedAmount,
//                 balance: balance
//             },
//             bills: {
//                 total: total,
//                 tax: tax,
//                 totalWithTax: totalPriceWithTax,
//                 payed: payedAmount,
//                 balance: balance
//             },
//             // Use the cleaned data instead of the original saleData
//             items: cleanSaleData,
//             paymentMethod: paymentMethod,
//             user: userData._id,
//         };
        
//         // Add a simple delay instead of setTimeout
//         await new Promise(resolve => setTimeout(resolve, 1500));
//         saleMutation.mutate(saleOrderData);
//     }
// }

// Additional Debugging Steps
// If the above doesn't solve the issue, add this debugging code to identify what's causing the circular reference:

// // Add this function to help debug circular references
// const checkForCircularReferences = (obj, seen = new WeakSet()) => {
//     if (typeof obj === 'object' && obj !== null) {
//         if (seen.has(obj)) {
//             return true; // Circular reference found
//         }
//         seen.add(obj);
        
//         for (let key in obj) {
//             if (obj.hasOwnProperty(key) && checkForCircularReferences(obj[key], seen)) {
//                 console.log('Circular reference found in property:', key);
//                 return true;
//             }
//         }
//     }
//     return false;
// };

// // Use it before sending data
// console.log('Checking saleData for circular references:', checkForCircularReferences(saleData));

// Alternative Approach: Deep Clone with Circular Reference Handling
// You can also use a utility function to safely clone objects with circular references:

// Add this function to safely clone objects
// const safeClone = (obj) => {
//     const seen = new WeakSet();
//     return JSON.parse(JSON.stringify(obj, (key, value) => {
//         if (typeof value === 'object' && value !== null) {
//             if (seen.has(value)) {
//                 return; // Remove circular references
//             }
//             seen.add(value);
//         }
//         // Remove functions and React components
//         if (typeof value === 'function' || 
//             (value && value.$$typeof === Symbol.for('react.element'))) {
//             return;
//         }
//         return value;
//     }));
// };

// // Then use it in your handlePlaceOrder
// const cleanSaleData = safeClone(saleData);
 