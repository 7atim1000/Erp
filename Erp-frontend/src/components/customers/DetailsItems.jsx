import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { api } from '../../https'

const DetailsItems = ({ setIsDetailsModal }) => {
    const customerData = useSelector((state) => state.customer)
    const customer = customerData.customerId
    
    const [customerItems, setCustomerItems] = useState([])
    
    // State for items pagination, sort and search
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState('desc')
    const [searchTerm, setSearchTerm] = useState('')
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    // Fetch customer items with pagination, sort and search
    const fetchcustomerItems = async () => {
        try {
            const response = await api.post('/api/invoice/customerItems', {
                customer,
                page: currentPage,
                limit: itemsPerPage,
                sortBy: sortBy,
                sortOrder: sortOrder,
                search: searchTerm
            })

            if (response.data.success) {
                setCustomerItems(response.data.data)
                setTotalPages(response.data.pagination.totalPages)
                setTotalItems(response.data.pagination.totalItems)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    // Helper functions for items
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
        setCurrentPage(1)
    }

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value)
        setCurrentPage(1)
    }

    useEffect(() => {
        fetchcustomerItems()
    }, [customer, currentPage, itemsPerPage, sortBy, sortOrder, searchTerm])

    // Printing
    const invoiceRef = useRef(null)
    const handlePrint = () => {
        const printContent = invoiceRef.current.innerHTML
        const WinPrint = window.open("", "", "width=900, height=650")

        WinPrint.document.write(` 
            <html>
                <head>
                    <title>Customer Items Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .receipt-container { width: 100%; border: 1px solid #ddd; padding: 10px;}
                        h2 { text-align: center; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .controls { display: none; }
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
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>

            <div className='bg-white p-4 rounded-lg shadow-lg w-[90vw] max-w-6xl md:mt-5 mt-5 h-[calc(100vh-2rem)] overflow-y-auto'>
                {/* Receipt content for printing */}
                <div ref={invoiceRef} className='p-4'>

                    {/* Receipt Header */}
                    <div className='flex justify-center mb-4'>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.0, opacity: 1 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
                            className='mt-0 w-12 h-12 border-8 border-[#0ea5e9] rounded-full flex items-center'
                        >
                            <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                                className='text-2xl'
                            ></motion.span>
                        </motion.div>
                    </div>

                    <h2 className='text-lg font-bold text-center mb-2 text-[#1a1a1a]'>Customer Items</h2>
                    <p className={`text-center text-xs font-medium text-[#0ea5e9]`}>Customer: 
                        <span className='text-sm text-blue-600 font-semibold'>{customerData.customerName}</span></p>

                    {/* Items Section with Pagination, Sort and Search */}
                    <div className='mt-5'>
                        {/* Search and Controls - hidden in print */}
                        <div className='flex flex-wrap gap-2 mb-4 controls'>
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder="Search items..."
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="border p-1 rounded text-sm"
                                />
                            </div>
                            
                            <select
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="border p-1 rounded text-sm"
                            >
                                <option value="createdAt">Date Created</option>
                                <option value="name">Item Name</option>
                                <option value="price">Price</option>
                                <option value="quantity">Quantity</option>
                            </select>
                            
                            <select 
                                value={itemsPerPage} 
                                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                                className="border p-1 rounded text-sm"
                            >
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={20}>20 per page</option>
                                <option value={50}>50 per page</option>
                            </select>
                        </div>

                        {/* Items Table */}
                        <div className='overflow-x-auto mb-4'>
                            <table className='w-full text-left text-[#1a1a1a] text-sm'>
                                <thead className='bg-[#D2B48C] font-normal'>
                                    <tr>
                                        <th className='p-2'>Name</th>
                                        <th className='p-2'>Price</th>
                                        <th className='p-2'>Quantity</th>
                                        <th className='p-2'>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerItems.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className='p-2 text-center text-xs text-[#be3e3f]'>
                                                No items found!
                                            </td>
                                        </tr>
                                    ) : (
                                        customerItems.map((item, index) => (
                                            <tr key={index} className='border-b border-zinc-200'>
                                                <td className='p-2'>{item.name}</td>
                                                <td className='p-2'>{item.price}</td>
                                                <td className='p-2'>{item.quantity}</td>
                                                <td className='p-2'>{item.category}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Items Pagination - hidden in print */}
                        <div className="pagination flex justify-between items-center mb-6 controls">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm"
                            >
                                Previous
                            </button>
                            
                            <span className="text-sm">Page {currentPage} of {totalPages} | Total Items: {totalItems}</span>
                            
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-sm"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/** Buttons */}
                <div className='flex justify-between mt-4'>
                    <button
                        onClick={handlePrint}
                        className='text-blue-700 font-semibold hover:underline text-xs px-4 py-2 rounded-lg cursor-pointer'
                    >
                        Print Items
                    </button>
                    <button
                        onClick={() => setIsDetailsModal(false)}
                        className='text-orange-600 font-semibold hover:underline text-xs px-4 py-2 rounded-lg cursor-pointer'
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetailsItems;