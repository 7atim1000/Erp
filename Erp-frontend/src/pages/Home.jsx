import React, {useState, useEffect} from 'react'
import BottomNav from '../components/shared/BottomNav';
import Greetings from '../components/home/Greetings';
import ErpMenu from '../components/home/ErpMenu';
import HomeInvoicesList from '../components/home/HomeInvoicesList';
import { api } from '../https';

import { TbArrowsExchange2 } from "react-icons/tb";
import { TbArrowsExchange } from "react-icons/tb";
import MiniCard from '../components/home/MiniCard';
import { FaFileInvoice } from "react-icons/fa";
import { BsCashCoin } from 'react-icons/bs'
// stone-500  slate-500  [#D2B48C] bg-[#D2B48C]

const Home = () => {
    // stores
    const [exchange, setExchange] = useState([]);
    const [receipt, setReceipt] = useState([]);
    // stores and invoices frequency
    const [frequency, setFrequency] = useState('1');

    // invoices
    const [sale, setSale] = useState([]);
    const [purchase, setPurchase] = useState([]);

    const [type, setType] = useState('bills');
    const [invoiceType, setInvoiceType] = useState('all');
    const [invoiceStatus, setInvoiceStatus] = useState('all');
    const [customer, setCustomer] = useState('all');
    const [supplier, setSupplier] = useState('all');
    const [shift, setShift] = useState('all');

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('-createdAt');

    // stores
    const [storeinvoiceType, setStoreinvoiceType] = useState('');
    const [itemStore, setItemStore] = useState('all');
    const [itemName, setItemName] = useState('all');
    
   

    const fetchExchange = async () => {
        try {
            const response = await api.post('/api/storeinvoice/fetch', {

                sort: '-createdAt',
                frequency,
                storeinvoiceType: 'exchange',
                shift,
                itemStore,
                itemName
            })

            if (response.data.success) {
                setExchange(response.data.invoices)
                console.log(response.data.invoices)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };

    const fetchReceipt = async () => {
        try {
            const response = await api.post('/api/storeinvoice/fetch', {

                sort: '-createdAt',
                frequency,
                storeinvoiceType: 'receipt',
                shift,
                itemStore,
                itemName
            })

            if (response.data.success) {
                setReceipt(response.data.invoices)
                console.log(response.data.invoices)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };

    const fetchSale = async () => {
        try {
            const response = await api.post('/api/invoice/fetch' , 
             {
                    type,
                    frequency,
                    invoiceType:'Sale invoice',
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

            setSale(response.data)
            console.log(response.data)

            if (response.data.success) {
                setSale(response.data.data || []);

            } else {
                toast.error(response.data.message || 'invocies not found')
            }


        } catch (error) {
            console.log(error)
        }
    };

    const fetchPurchase = async () => {
        try {
            const response = await api.post('/api/invoice/fetch',
                {
                    type,
                    frequency,
                    invoiceType:'Purchase invoice',
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

            setPurchase(response.data)
            console.log(response.data)

            if (response.data.success) {
                setPurchase(response.data.data || []);

            } else {
                toast.error(response.data.message || 'invocies not found')
            }

        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        fetchExchange() , fetchReceipt(), fetchSale(), fetchPurchase()
    }, [frequency, storeinvoiceType, shift, itemStore, itemName, invoiceType,  invoiceStatus, shift, search, sort]);

    return (
        <section className='bg-[#f5f5f5] h-[calc(100vh-5rem)] overflow-hidden flex gap-3'>

            <div className='flex-[3]  bg-white'>

                <div className='bg-white mt-0 bg-white'>
                    <Greetings />
                </div>

                <div className='mt-1 px-5 py-2 flex justify-between flex-wrap shadow-xl bg-[#f5f5f5]'>
                    <ErpMenu />
                </div>

    
                    <div className ='flex flex-col gap-1 mt-2 px-10 bg-white'>
                        <h1 className ='text-amber-900 text-sm font-semibold mt-3'>Stores :</h1>
                        <div className='flex items-center w-full gap-3 px-8'>
                            <MiniCard title='Exchange' icon ={<TbArrowsExchange className='w-6 h-6 text-white' />} number ={exchange.reduce((acc, invoice) => acc + invoice.bills.total, 0).toFixed(2)} />
                            <MiniCard title='Receipt' icon ={<TbArrowsExchange2 className='w-6 h-6 text-white' />} number ={receipt.reduce((acc, invo) => acc + invo.bills.total, 0).toFixed(2)} />
                        </div>
                    </div>

                    <div className ='flex flex-col gap-1 mt-2 px-10 bg-white mt-3'>
                        <h1 className ='text-amber-900 text-sm font-semibold'>Invoices :</h1>
                        <div className='flex items-center w-full gap-3 px-8'>
                            <MiniCard title='Sales' icon ={<BsCashCoin className='w-6 h-6 text-white' />} number ={sale.reduce((acc, invoice) => acc + invoice.bills.total, 0).toFixed(2)} />
                            <MiniCard title='Purchase' icon ={<FaFileInvoice className='w-6 h-6 text-white' />} number ={purchase.reduce((acc, invo) => acc + invo.bills.total, 0).toFixed(2)} />
                        </div>
                    </div>

            </div>

            <div className='flex-[2] bg-white'>

                <div className='flex flex-col gap-5'>
                    <HomeInvoicesList />
                </div> 


            </div>

            <BottomNav />

        </section>
    );
};



export default Home;