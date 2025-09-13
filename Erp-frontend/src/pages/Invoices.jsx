import React, { useState, useEffect, useRef, useCallback } from 'react'
import BackButton from '../components/shared/BackButton';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { LuPrinter } from "react-icons/lu";

import { api, getInvoices } from '../https';
import InvoicesDetails from '../components/invoice/InvoicesDetails';

import { toast } from 'react-toastify'


import { Select, Progress, Flex } from 'antd'
import moment from 'moment';
import ManagementReport from '../components/invoice/ManagementReport';

const Invoices = () => {

    const [allInvoices, setAllInvoices] = useState([]);

    const [frequency, setFrequency] = useState('365');
    const [type, setType] = useState('bills');
    const [invoiceType, setInvoiceType] = useState('all');
    const [invoiceStatus, setInvoiceStatus] = useState('all');
    const [customer, setCustomer] = useState('all');
    const [supplier, setSupplier] = useState('all');
    const [shift, setShift] = useState('all');

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('-createdAt');
    const [loading, setLoading] = useState(false);
  
    // fetch Invoices

    
    const fetchInvoices = useCallback(async () => {
        try {
    
            const response = await api.post('/api/invoice/fetch' , 
            {
                    type,
                    frequency,
                    invoiceType,
                    invoiceStatus,
                    customer,
                    supplier,
                    shift,

                    search,
                    sort,
                    
                    page: 1,
                    limit: 1000
                },
            );
                
                setAllInvoices(response.data)
                console.log(response.data)

            if (response.data.success) {
                setAllInvoices(response.data.data || []);
              
            } else {
                toast.error(response.data.message || 'invocies not found')
            }
    
        } catch (error) {
            // Show backend error message if present in error.response
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message)
            }
            console.log(error)
        } finally {
            setLoading(false);
         }
    });

    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            fetchInvoices();
        }
    }, [type, frequency, invoiceType, invoiceStatus, shift, search, sort]);

    

    // Percentage and count
    const totalInvoices = allInvoices.length;  

    const totalSaleInvoices = allInvoices.filter(
        (invoice) => invoice.invoiceType === "Sale invoice"
    );
    const totalBuyInvoices = allInvoices.filter(
        (invoice) => invoice.invoiceType  === "Purchase invoice" //&& invoice.invoiceStatus === "Completed" 
    );
    const totalIncomePercent = (totalSaleInvoices.length / totalInvoices) * 100 ;
    const totalExpensePercent = (totalBuyInvoices.length / totalInvoices) * 100 ;
    // Total amount 
    const totalTurnover = allInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0) ;
    const totalSaleTurnover = allInvoices.filter(invoice => invoice.invoiceType === 'Sale invoice').reduce((acc, invoice) => acc + invoice.bills.total, 0);
    
    const totalBuyTurnover = allInvoices.filter(invoice => invoice.invoiceType === 'Purchase invoice').reduce((acc, invoice) => acc + invoice.bills.total, 0);
    const totalSaleTaxTurnover = allInvoices.filter(invoice => invoice.invoiceType === 'Sale invoice').reduce((acc, invoice) => acc + invoice.bills.tax, 0);
    
    const totalWithTaxBuyTurnover = allInvoices.filter(invoice => invoice.invoiceType === 'Purchase invoice').reduce((acc, invoice) => acc + invoice.bills.totalWithTax, 0);
    const totalWithTaxSaleTurnover = allInvoices.filter(invoice => invoice.invoiceType === 'Sale invoice').reduce((acc, invoice) => acc + invoice.bills.totalWithTax, 0);

    // Percentage
    const totalSaleTurnoverPercent = (totalSaleTurnover / totalTurnover) * 100 ;
    const totalBuyTurnoverPercent = (totalBuyTurnover / totalTurnover) * 100 ;
    
    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };
    
    const conicColors = {
        '0%': '#87d068',
        '50%': '#ffe58f',
        '100%': '#ffccc7',
    };



    return (
        <section className ='flex h-[calc(100vh)] overflow-y-scroll scrollbar-hidden'>
            
            {/* <div className ='flex-[1] bg-white h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden'>
                <div className ='h-[50%] flex  flex-col items-start gap-4 justify-start p-2 px-2 bg-white overflow-y-scroll'>
                    <p className ='text-blue-600 underline text-sm font-semibold'>Sales Items :</p>
                        { list.map((serv) => {
                        //////////////  status="exception" showInfo={false}
                        const amount = allInvoices.filter((invoice) => 
                            //invoice.invoiceType === "Sale" && invoice.items.name === serv.serviceName)
                            invoice.invoiceType === "Sale invoice" && invoice.items.some(item => item.name === serv.serviceName))             
                            .reduce((acc, invoice) => acc + invoice.bills.total, 0);
                            /////////////////
                            return(
                               
                                amount > 0 && (
                                    <div className ='shadow-lg/30 bg-zinc-100 p-1 w-full'>
                                    <h5 className ='text-xs text-green-600 font-medium'>{serv.serviceName}</h5>
                                           
                                        <Flex gap="small text-green-600" vertical style={{ width: 300 }}>
                                            <Progress  type ='line'  strokeColor={twoColors} percent = {((amount/totalSaleTurnover) * 100).toFixed(0)}/>
                                        </Flex>
                                    </div>
                
                                         )
                                    )
                                                
                                })}
                </div>
                <hr className ='m-3 border-t border-zinc-200'/>
                <div className ='h-[50%] flex flex-col items-start gap-4 justify-start p-2 px-2 bg-white overflow-y-scroll'>
                    <p className ='text-blue-600 underline text-sm font-semibold'>Purchase Items :</p>
                        { list.map((serv) => {
                            //////////////  status="exception" showInfo={false}
                            const amount = allInvoices.filter((invoice) => 
                            //invoice.invoiceType === "Sale" && invoice.items.name === serv.serviceName)
                            invoice.invoiceType === "Purchase invoice" && invoice.items.some(item => item.name === serv.serviceName))             
                            
                            .reduce((acc, invoice) => acc + invoice.bills.total, 0);
                            /////////////////
                            
                            return(
                                amount > 0 && (
                                    <div className ='shadow-lg/30 bg-zinc-100 p-1 w-full'>
                                    <h5 className ='text-xs text-green-600 font-medium'>{serv.serviceName}</h5>        
                                        <Flex gap="small text-green-600" vertical style={{ width: 300 }}>
                                            <Progress  type ='line'  strokeColor={conicColors} percent = {((amount/totalBuyTurnover) * 100).toFixed(0)}/>
                                        </Flex>
                                    </div>
                                        )
                                    )      
                                })}
                </div>
            </div> */}

            
     
                     
            <div className ='flex-[3] bg-white'>
                
                <div   className ='flex items-center justify-between px-5 py-2 shadow-xl mb-2'>
                    <div className='flex items-center gap-2'>
                        <BackButton />
                        <h1 className='text-md font-semibold text-[#1a1a1a]'>Invocies Management</h1>
                    </div>
                </div>

                <div className='flex items-center justify-between px-6 py-2'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor='frequency' className='text-sm text-[#1a1a1a] font-semibold'>Frequency</label>
                        <select id='frequency' value={frequency} onChange={(e) => setFrequency(e.target.value)}
                            className='border-b border-yellow-700 rounded-sm px-2 py-1 text-sm'>
                            <option value='1'>1 Day</option>
                            <option value='7'> 7 Days</option>
                            <option value='30'> 30 Days</option>
                            <option value='90'> 90 Days</option>

                        </select>

                        <label htmlFor='orderSatus' className='text-sm text-[#1a1a1a] font-semibold'>Status</label>
                        <select id='orderStatus' value={invoiceStatus} onChange={(e) => setInvoiceStatus(e.target.value)}
                            className='border-b border-yellow-700 rounded-sm px-2 py-1 text-sm'>
                            <option value='all'>All</option>
                            <option value='In Progress'>In Progess</option>
                            <option value='Completed'>Completed</option>
                            <option value='Cancelled'>Cancelled</option>
                            <option value='Pending'>Pending</option>

                        </select>

                        <label htmlFor='shift' className='text-sm text-[#1a1a1a] font-semibold'>Shift</label>
                        <select id='shift' value={shift} onChange={(e) => setShift(e.target.value)}
                            className='border-b border-yellow-700 rounded-sm px-2 py-1 text-sm'>
                            <option value='all'>All</option>
                            <option value='Morning'>Morning</option>
                            <option value='Evening'>Evening</option>
                        </select>
                    </div>
                </div>

                {/* Search and sorting and Loading */}
                <div className="flex items-center px-15 py-2 shadow-xl">
                    <input
                        type="text"
                        placeholder="Search Customers..."
                        className="border border-yellow-700 p-1 rounded-lg w-full text-xs font-semibold"
                        // max-w-md
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* Optional: Sort dropdown */}
                    <select
                        className="ml-4 border border-yellow-700 p-1  rounded-lg text-[#1a1a1a] text-xs font-semibold]"
                        value={sort}

                        onChange={(e) => {
                            setSort(e.target.value);
                            setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page when changing sort
                        }}
                    >
                        <option value="-createdAt">Newest First</option>
                        <option value="createdAt">Oldest First</option>
                    </select>
                </div>

                {/* Loading Indicator */}
                {loading && (
                    <div className="mt-4 flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-700"></div>
                        <span className="ml-2">Loading ...</span>
                    </div>
                )}


                <div className ='mt-5 bg-white py-1 px-10'>

                    <div className='overflow-x-auto'>
                        <table className='text-left w-full'>
                            <thead className=''>
                                <tr className='bg-white border-b-2 border-yellow-700 text-[#1a1a1a] text-xs font-normal'>
                                    <th className='p-1'></th>
                                    <th className='p-1 hide-print'>Type</th>
                                    <th className='p-1 ml-0'></th>
                                    <th className='p-1'>Table</th>
                                    <th className='p-1'>Items</th>
                                    <th className='p-1'>Customer</th>
                                    <th className='p-1'>Supplier</th>
                                    <th className='p-1'>Payment</th>
                                    <th className='p-1'>Total</th>
                                    <th className='p-1'>Tax</th>
                                    <th className='p-1'>Grand Total</th>
                                    <th className='p-1'>Payed</th>
                                    <th className='p-1'>Balance</th>
                                    <th className='p-1'>Status</th>
                                    <th className='p-1'></th>
                                    <th className='p-1'></th>
                                </tr>
                            </thead>

                                 
                                <tbody>
                                    { 
                                    allInvoices.map((invoice) =>{  
                                    
                                    return (   
                                    <InvoicesDetails  id ={invoice._id} date ={invoice.date} type ={invoice.invoiceType} shift ={invoice.shift}  length ={invoice.items === null? 'N/A' : invoice.items.length} customer ={invoice.customer === null? 'N/A' : invoice.customer.customerName}
                                    supplier ={invoice.supplier === null? 'N/A' : invoice.supplier.supplierName} payment ={invoice.paymentMethod}total ={invoice.bills.total} tax={invoice.bills.tax}
                                    totalWithTax={invoice.bills.totalWithTax} payed={invoice.bills.payed} balance ={invoice.bills.balance} status={invoice.invoiceStatus} items={invoice.items}
                                    
                                    />
                                        )
                                      })
                                    }
                                </tbody> 
                            {/* <tfoot>
                                <tr className="bg-[#F1E8D9] border-t-2 border-yellow-700 text-yellow-600 text-xs font-semibold">
                                    <td className="p-2 text-[#1a1a1a]">{allInvoices.length}
                                        <span className='font-normal'>   Invoice</span></td>

                                    <td className="p-2" colSpan={3}></td>
                                    <td className="p-2"></td>
                                    <td className="p-2" colSpan={1}></td>
                                </tr>
                            </tfoot> */}
                        </table>
                        {!loading && allInvoices.length === 0 && (
                            <p className='ml-5 mt-5 text-xs text-[#be3e3f] flex items-start justify-start '>
                                {search
                                    ? `No invoice found for "${search}"`
                                    : `Your invoices list is empty . Start adding invoice !`}

                            </p>
                        )}
                                    
                    </div>
            
                </div>
                    
            </div>            

            <div className ='flex-[1] bg-white h-[calc(100vh-5rem)]'>

                <div className ='flex flex-col items-start '>
                    <p className ='text-sm text-black font-semibold ml-2 mb-2'>Seacrch by Duration , types , Status :-</p>
                
                <div className ='flex items-center justify-between gap-2'>
                    
                    <div className ='flex items-center rounded-lg p-2 px-4 bg-zinc-100 shadow-lg/30'>
                    
                        <div className ='flex flex-col gap-1'>
                            <p className ='text-xs text-blue-600'>By duration ...</p>
                            <Select className ='w-30' onChange ={(values) => setFrequency(values)} >
                            {/*value ='By duration ...' */}
                            <Select.Option value ="0">Today</Select.Option>
                                <Select.Option value ="7">Last week</Select.Option>
                                <Select.Option value ="30">Last Month</Select.Option>
                                <Select.Option value ="365">Last year</Select.Option>
                            <Select.Option value ="1000">All</Select.Option>
                        </Select>

                        </div>
                    </div>

                    <div className ='flex items-center rounded-lg p-2 px-4 bg-zinc-100 shadow-lg/30'>
                            <div className ='flex flex-col gap-1'>
                            <p className ='text-xs text-blue-600'>By Type ...</p>
                            <Select className ='w-30' onChange ={(values) => setInvoiceType(values)}>
                                <Select.Option value="Sale invoice">Sale</Select.Option>
                                <Select.Option value="Purchase invoice">Purchase</Select.Option>
                                <Select.Option value="all">All</Select.Option>
                            </Select>
                        </div>
                    </div>

                            
                    <div className ='flex items-center rounded-lg p-2 px-4 bg-zinc-100 shadow-lg/30'>
                        <div className ='flex flex-col gap-1'>
                            <p className ='text-xs text-blue-600'>By Status</p>
                            <Select className ='w-30' onChange ={(values) => setInvoiceStatus(values)}>
                                <Select.Option value ="In Progress">In Progress</Select.Option>
                                <Select.Option value ="Completed">Completed</Select.Option>
                                <Select.Option value ="all">All</Select.Option>
                            </Select>
                        </div>
                    </div>


                </div>
                </div>
                <hr className ='border-b text-zinc-200 m-5'/>
                         
             

                <div className ='flex flex-col items-start'>
                    <p className ='text-sm text-black font-semibold ml-2 mb-2'>Count of invoices :-</p>
                    <div className ='flex items-center justify-between w-full px-15'>
                        <div className ='flex items-start justify-start shadow-lg/30 rounded-lg bg-zinc-100 p-2'>
                            <p className ='font-semibold text-lg text-green-600'><span className ='text-xs font-medium text-blue-600'>Count of sales : </span>{totalSaleInvoices.length}
                            <span className = 'text-xs font-normal text-black'> invoices</span>
                            </p>
                        </div>
                        <div className ='flex items-end justify-end shadow-lg/30 rounded-lg bg-zinc-100 p-2'>
                            <p className ='font-semibold text-lg text-sky-600'><span className ='text-xs font-medium text-blue-600'>Count of purchase : </span>{totalBuyInvoices.length}
                            <span className = 'text-xs font-normal text-black'> invoices</span>
                            </p>
                        </div>
                    </div>

                </div>
                <hr className ='border-b text-zinc-200 m-5'/>

                <div className ='flex flex-col items-start gap-3'>
                    
                    <p className ='text-sm text-black font-semibold ml-2 mb-1'>Invoices total :-</p>

                    <div className ='flex items-center justify-between w-full px-1'>
                        <div className ='flex items-center justify-between shadow-lg/30 rounded-lg bg-zinc-100 p-2'>
                            <p className ='font-semibold text-lg text-orange-800'><span className ='text-xs font-normal text-blue-600'>Sales tax : </span>{totalSaleTaxTurnover.toFixed(2)}<span className ='font-normal text-xs text-black'> AED</span></p>
                        </div>
                        <div className ='flex items-end justify-end shadow-lg/30 rounded-lg bg-zinc-100 p-2 '>
                            <p className ='font-semibold text-lg text-red-600'><span className ='text-xs font-normal text-blue-600'>Sales discount : </span>0<span className ='font-normal text-xs text-black'> AED</span></p>
                        </div>
                    </div>

                    <div className ='flex items-center justify-between w-full px-1'>
                        <div className ='flex items-start justify-start shadow-lg/30 rounded-lg bg-zinc-100 p-2'>
                            <p className ='font-semibold text-lg text-green-600'><span className ='text-xs font-normal text-blue-600'>Sale total : </span>{totalSaleTurnover.toFixed(2)}<span className ='font-normal text-xs text-black'> AED</span></p>
                        </div>
                        <div className ='flex items-end justify-end shadow-lg/30 rounded-lg bg-zinc-100 p-2'>
                            <p className ='font-semibold text-lg text-sky-600'><span className ='text-xs font-normal text-blue-600'>Purchase total : </span>{totalBuyTurnover.toFixed(2)}<span className ='font-normal text-xs text-black'> AED</span></p>
                        </div>
                    </div>

                    <div className ='flex items-center justify-between w-full px-1'>
                        <div className ='flex items-start justify-start shadow-lg/30 rounded-lg bg-zinc-100 p-2'>
                            <p className ='font-semibold text-lg text-green-600'><span className ='text-xs font-normal text-blue-600'>Sale total+Tax : </span>{totalWithTaxSaleTurnover.toFixed(2)}<span className ='font-normal text-xs text-black'> AED</span></p>
                        </div>
                        <div className ='flex items-end justify-end shadow-lg/30 rounded-lg bg-zinc-100 p-2'>
                            <p className ='font-semibold text-lg text-sky-600'><span className ='text-xs font-normal text-blue-600'>Purchase total+Tax : </span>{totalWithTaxBuyTurnover.toFixed(2)}<span className ='font-normal text-xs text-black'> AED</span></p>
                        </div>
                    </div>


                </div>
                <hr className ='border-b text-zinc-200 m-5'/>

                
                <div className ='flex flex-col items-start mb-5'>
                    <p className ='text-sm text-black font-semibold ml-2 mb-1'>Invoices percentage :-</p>
                    <div className ='flex items-center justify-between w-full px-15'>
                        <div className ='flex items-start justify-start p-1'>
                            <p className ='font-semibold text-lg text-green-600'><span className ='text-xs font-medium text-blue'>Sale invoices : </span>{totalSaleTurnoverPercent.toFixed(0)} <span className = 'font-medium text-xs text-black'> %</span></p>
                        </div>

                        <div className ='flex items-start justify-start shadow-lg/30 p-1 rounded-lg bg-zinc-100'>
                            <Progress type ='circle' strokeColor={twoColors}  size={60} percent ={totalSaleTurnoverPercent.toFixed(0)} />
                        </div>

                    </div>
                </div>

                <div className ='flex flex-col items-start'>
                                 
                    <div className ='flex items-center justify-between w-full px-15'>
                     
                        <div className ='flex items-end justify-end  p-1'>
                            <p className ='font-semibold text-lg text-sky-600'><span className ='text-xs font-medium text-blue'>Purchase invoices : </span>{totalBuyTurnoverPercent.toFixed(0)} <span className = 'font-medium text-xs text-black'> %</span></p>
                        </div>
                        <div className ='flex items-end justify-end shadow-lg/30 rounded-lg bg-zinc-100 p-1'>
                            <Progress type ='circle' strokeColor={conicColors}  size={60} percent ={totalBuyTurnoverPercent.toFixed(0)} />
                        </div>
                    </div>
                
                </div>
                <hr className ='border-b text-zinc-200 m-5'/>

           
                    
                        
                        <div className ='flex flex-col gap-5 items-center'>
                            <div className ='bg-zinc-100 shadow-lg/30 p-2 roundd-lg'>
                            <p className ={`${totalSaleTurnover - totalBuyTurnover <= 0 ? 'text-red-600' : 'text-green-600'} text-center font-semibold text-xl`}><span className ='text-xs font-normal text-blue-600'>Expected Profits = </span>
                            {(totalSaleTurnover - totalBuyTurnover).toFixed(2)}
                            <span className ='font-normal text-xs text-black'> AED</span></p>

                            </div>
                            
                       
                        </div>
            </div>

        

        </section>
    );
};




export default Invoices ;