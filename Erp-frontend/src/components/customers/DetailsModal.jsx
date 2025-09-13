// import React , {useEffect, useState, useRef} from 'react'
// import { motion } from 'framer-motion'
// import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify'
// import { api } from '../../https';
// const DetailsModal = ({setIsDetailsModal}) => {
//     const customerData = useSelector((state) => state.customer);
//     const customer = customerData.customerId ;
//     console.log(customer);
//     const [customerInvoices, setCustomerInvoices] = useState([]);
//     // fetch Details
//     const fetchCustomerDetails = async() => {
//         try {
//             const res = await api.post('/api/invoice/customerDetails' , 
//             {
//                 customer
//             }   
//             );
//             setCustomerInvoices(res.data)
//             console.log(res.data)
//             } catch (error) {
//             console.log(error)
//             message.error('Fetch Issue with transaction')
//             }
//         }
//     useEffect(()=>{
//         fetchCustomerDetails()
//     },[customer])
//     // Printing
//     const invoiceRef = useRef(null);
//     const handlePrint = () => {
//         const printContent = invoiceRef.current.innerHTML;
//         const WinPrint = window.open("", "", "width=900, height=650");
//         WinPrint.document.write(` 
//                 <html>
//                     <head>
//                         <title>Order Receipt</title>
//                             <style>
//                                 body { fonst-family: Arial, sans-serif; padding: 20px; }
//                                 .receip-container { width: 300px; border: 1px solid #ddd; padding: 10px;}
//                                 h2 {text-align: center;}
//                             </style>
//                     </head>
//                     <body>
//                         ${printContent}
//                     </body>
//             </html>
//             `);
//         WinPrint.document.close();
//         WinPrint.focus();
//         setTimeout(() => {
//             WinPrint.print();
//             WinPrint.close();
//         }, 1000);
//     };
//     return (
//         <div className="fixed inset-0 flex items-center justify-center z-50" 
//         style={{ backgroundColor: 'rgba(20, 10, 10, 0.4)' }}  >
//             <div className='bg-white p-4 rounded-lg shadow-lg  w-[750px] md:mt-5 mt-5 h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden'>
//                 {/* Receipt content for printing */}
//                 <div ref={invoiceRef} className='p-4'>
//                     {/*Receipt Header*/}
//                     <div className='flex justify-center nb-4'>
//                         <motion.div
//                             initial={{ scale: 0, opacity: 0 }}
//                             animate={{ scale: 1.0, opacity: 1 }}
//                             transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
//                             className='mt-0 w-12 h-12 border-8 border-[#0ea5e9] rounded-full flex items-center'
//                         >
//                             <motion.span
//                                 initial={{ scale: 0, opacity: 0 }}
//                                 animate={{ scale: 1 }}
//                                 transition={{ delay: 0.3, duration: 0.3 }}
//                                 className='text-2xl'
//                             >
//                             </motion.span>
//                         </motion.div>
//                     </div>
//                     <h2 className='text-lg font-bold text-center mb-2 text-[#1a1a1a]'>Customers Statement</h2>
//                     <p className={`text-center text-xs font-medium text-[#0ea5e9]`}>Customer : <span className='text-sm text-blue-600 font-semibold'>{customerData.customerName}</span></p>
//                     <div className='mt-5' >
//                         <div className='overflow-x-auto px-5'>
//                             <table className='w-full text-left text-[#1a1a1a]'>
//                                 <thead className='bg-[#D2B48C] text-xs font-normal text-[#1a1a1a]'>
//                                     <tr>
//                                         <th className='p-2'></th>
//                                         <th className='p-2'>invoiceType</th>
//                                         <th className='p-2'>invoiceNumber</th>
//                                         <th className='p-2'>Total</th>
//                                         <th className='p-2'>Tax</th>
//                                         <th className='p-2'>Total with tax</th>
//                                         <th className='p-2'>Payed</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {customerInvoices.length === 0
//                                         ? (<p className='w-full mx-5 my-5 text-xs text-[#be3e3f] flex items-start justify-start'>This customer statement is empty!</p>)
//                                         : customerInvoices.map((customer, index) => (
//                                             <tr
//                                                 key={index}
//                                                 className='border-b border-zinc-200  text-xs'
//                                             >
//                                                 {/* <td className='p-2 text-xs font-normal'>{new Date(customer.date).toLocaleDateString('en-GB')}</td> */}
//                                                 <td className='p-2 font-semibold bg-zinc-100 text-xs font-normal'>{customer.date}</td>
//                                                 <td className='p-2 font-semibold bg-zinc-100 text-xs font-normal'>{customer.invoiceType}</td>
//                                                 <td className='p-2 text-xs font-normal'>{customer.invoiceNumber}</td>
//                                                 <td className='p-2 text-xs font-normal'>{customer.bills.total.toFixed(2)}</td>
//                                                 <td className='p-2 text-xs font-normal'>{customer.bills.tax.toFixed(2)}</td>
//                                                 <td className='p-2 text-xs font-normal'>{customer.bills.totalWithTax.toFixed(2)}</td>
//                                                 <td className='p-2 text-blue-600 text-xs font-normal'>{customer.bills.payed.toFixed(2)}</td>
//                                             </tr>
//                                         ))}
//                                 </tbody>
//                                 <tfoot>
//                                     <tr className="bg-[#D2B48C] font-bold text-xs">
//                                         <td className="p-2" colSpan={3}>Total</td>
//                                         <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0).toFixed(2)}</td>
//                                         <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.tax, 0).toFixed(2)}</td>
//                                         <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.totalWithTax, 0).toFixed(2)}</td>
//                                         <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.payed, 0).toFixed(2)}</td>
//                                     </tr>
//                                 </tfoot>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//                 {/** Buttons */}
//                 <div className='flex justify-between mt-4'>
//                     <button
//                         onClick={handlePrint}
//                         className='text-blue-700 font-semibold hover underline text-xs px-4 py-2 rounded-lg cursor-pointer'
//                     >
//                         Print Statement
//                     </button>
//                     <button
//                         onClick={() => setIsDetailsModal(false)}
//                         className='text-orange-600 font-semibold hover: underline text-xs px-4 py-2 rounded-lg cursor-pointer'
//                     >
//                         Close
//                     </button>

//                 </div>
//             </div>
//         </div>
//     );
// }
// export default DetailsModal ;

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { api } from '../../https'
import { IoCloseCircle } from "react-icons/io5";
import { FaPrint } from "react-icons/fa";

const DetailsModal = ({ setIsDetailsModal }) => {
    const customerData = useSelector((state) => state.customer)
    const customer = customerData.customerId

    const [customerInvoices, setCustomerInvoices] = useState([])
    const [loading, setLoading] = useState(false)
    
    // State for pagination, sort and search
    const [currentPage, setCurrentPage] = useState(1)
    const [invoicesPerPage, setInvoicesPerPage] = useState(10)
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState('desc')
    const [searchTerm, setSearchTerm] = useState('')
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    // Fetch customer invoices with pagination, sort and search
    const fetchCustomerDetails = async () => {
        setLoading(true)
        try {
            const response = await api.post('/api/invoice/customerDetails', {
                customer,
                page: Number(currentPage),        // Convert to number
                limit: Number(invoicesPerPage),   // Convert to number
                sortBy: sortBy,
                sortOrder: sortOrder,
                search: searchTerm
            })

            if (response.data.success) {
                setCustomerInvoices(response.data.data)
                setTotalPages(response.data.pagination.totalPages)
                setTotalItems(response.data.pagination.totalItems)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log('Error details:', error.response?.data)
            toast.error(error.response?.data?.message || 'Error fetching invoices')
        } finally {
            setLoading(false)
        }
    };




    // Helper functions for pagination and sorting
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    const handleSortChange = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('desc')
        }
    }

    const handleSearch = (term) => {
        setSearchTerm(term)
        setCurrentPage(1) // Reset to first page when searching
    }

    const handleInvoicesPerPageChange = (value) => {
        setInvoicesPerPage(value)
        setCurrentPage(1) // Reset to first page when changing items per page
    }

    useEffect(() => {
        fetchCustomerDetails()
    }, [customer, currentPage, invoicesPerPage, sortBy, sortOrder, searchTerm])

    // Printing
    const invoiceRef = useRef(null)
    const handlePrint = () => {
        const printContent = invoiceRef.current.innerHTML
        const WinPrint = window.open("", "", "width=900, height=650")

        WinPrint.document.write(` 
            <html>
                <head>
                    <title>Customer Statement</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .receipt-container { width: 100%; }
                        h2 { text-align: center; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .controls { display: none; }
                        .pagination { display: none; }
                        .button { display: none; }
                    </style>
                </head>
                <body>
                    ${printContent}
                </body>
            </html>
        `)

        WinPrint.document.close()
        WinPrint.focus()
        setTimeout(() => {
            WinPrint.print()
            WinPrint.close()
        }, 1000)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" 
        style={{ backgroundColor: 'rgba(20, 10, 10, 0.4)' }}>

            <div className='bg-white p-2 rounded-sm shadow-lg/30 w-[50vw] max-w-6xl md:mt-1 mt-1 h-[calc(100vh)] 
            overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-hidden'>
                {/* Receipt content for printing */}
                <div ref={invoiceRef} className=''>

                    {/* Receipt Header */}
                    {/* <div className='flex justify-center mb-4'>
                        <motion.div
                    
                        >
                            <motion.span
                               
                            ></motion.span>
                        </motion.div>
                    </div> */}

                    <div className ='flex flex-col shadow-xl bg-white'>
                       
                        <div className='flex justify-between items-center p-2'>
                            <h2 className='text-md font-bold text-center mb-2 text-[#1a1a1a]'>Customers Statement</h2>

                            <div className='button flex justify-end items-center cursor-pointer gap-3'>
                                <button onClick={handlePrint} className='rounded-full text-[#0ea5e9] hover:bg-[#0ea5e9]/30 
                                cursor-pointer rounded-xs'>
                                    <FaPrint size={22} />
                                </button>
                                <button onClick={() => setIsDetailsModal(false)} className='rounded-full text-[#be3e3f] hover:bg-[#be3e3f]/30 
                                cursor-pointer rounded-xs border-b border-[#be3e3f]'>
                                    <IoCloseCircle size={22} />
                                </button>

                            </div>

                        </div>
                        
                        <div className ='flex items-center justify-between p-1'>
                            <p className={`text-center text-xs font-normal text-[#0ea5e9]`}>
                                Customer Name : <span className='text-xs text-[#1a1a1a] font-semibold'>
                                    {customerData.customerName}</span>
                            </p>
                            <p className ='text-xs font-normal text-[#0ea5e9]'>Currently Balance : 
                                <span className ='text-xs  text-[#1a1a1a] font-semibold'> {customerData.balance}</span>
                                <span className ='text-xs text-[#0ea5e9] font-normal'> AED</span>
                            </p>

                        </div>
                        
                    </div>

                 
                    {/* Search and Controls - hidden in print */}
                    <div className='flex justify-center flex-wrap gap-2 mb-4 mt-5 controls'>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search by amount..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="border border-[#d2b48c] p-1 rounded-sm text-xs"
                            />
                        </div>
                        
                        <select
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="border p-1 border-[#d2b48c] rounded-sm text-xs"
                        >
                            <option value="createdAt">Date Created</option>
                            <option value="invoiceNumber">Invoice Number</option>
                            <option value="invoiceType">Invoice Type</option>
                            <option value="bills.total">Total Amount</option>
                        </select>
                        
                        <select 
                            value={invoicesPerPage} 
                            onChange={(e) => handleInvoicesPerPageChange(Number(e.target.value))}
                            className="border border-[#d2b48c] p-1 rounded text-xs"
                        >
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={20}>20 per page</option>
                            <option value={50}>50 per page</option>
                        </select>
                    </div>

                    <div className='mt-2 overflow-x-auto'>
                        <div className='overflow-x-auto px-5'>
                            <table className='w-full text-left text-[#1a1a1a] h-[calc(100vh-30rem)]'>
                                <thead className='bg-white border-b-2 border-yellow-700 text-[#1a1a1a] text-xs font-normal'>
                                    <tr>
                                        <th className='p-2'>Date</th>
                                        <th className='p-2'>Invoice Type</th>
                                        <th className='p-2'>Invoice Number</th>
                                        <th className='p-2'>Total</th>
                                        <th className='p-2'>Tax</th>
                                        <th className='p-2'>Total with tax</th>
                                        <th className='p-2'>Payed</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="7" className='p-2 text-center'>
                                                Loading invoices...
                                            </td>
                                        </tr>
                                    ) : customerInvoices.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className='p-2 text-center text-xs text-[#be3e3f]'>
                                                No invoices found!
                                            </td>
                                        </tr>
                                    ) : (
                                        customerInvoices.map((invoice, index) => (
                                            <tr
                                                key={index}
                                                className='border-b-3 border-[#f5f5f5] text-xs font-normal text-[#1a1a1a] 
                                                    hover:bg-[#F1E8D9] cursor-pointer'
                                            >
                                                <td className='p-2 font-semibold bg-zinc-100'>{new Date(invoice.date).toLocaleDateString('en-GB')}</td>
                                                <td className='p-2 font-semibold bg-zinc-100'>{invoice.invoiceType}</td>
                                                <td className='p-2'>{invoice.invoiceNumber}</td>
                                                <td className='p-2'>{invoice.bills.total.toFixed(2)}</td>
                                                <td className='p-2'>{invoice.bills.tax.toFixed(2)}</td>
                                                <td className='p-2'>{invoice.bills.totalWithTax.toFixed(2)}</td>
                                                <td className='p-2 text-blue-600'>{invoice.bills.payed.toFixed(2)}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>

                                <tfoot> 
                                    <tr className="bg-[#F1E8D9] border-t-2 border-yellow-700 text-yellow-700 text-xs font-semibold">
                                        <td className="p-2" colSpan={3}>Total</td>
                                        <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0).toFixed(2)}</td>
                                        <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.tax, 0).toFixed(2)}</td>
                                        <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.totalWithTax, 0).toFixed(2)}</td>
                                        <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.payed, 0).toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Pagination - hidden in print */}
                    <div className="pagination flex justify-between items-center mt-4 controls">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || loading}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm"
                        >
                            Previous
                        </button>
                        
                        <span className="text-sm">
                            Page {currentPage} of {totalPages} | Total Invoices: {totalItems}
                        </span>
                        
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || loading}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default DetailsModal