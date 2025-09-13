import React ,{ useState , useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getTotalPrice } from '../../redux/slices/buySlice';
import { removeAllItems } from '../../redux/slices/buySlice';
import { removeSupplier } from '../../redux/slices/supplierSlice';

import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { toast } from 'react-toastify'
import { addInvoice, addTransaction, api, updateSupplier } from '../../https';
import BuyInvoice from '../invoice/BuyInvoice';



const BuyBills = ({fetchServices}) => {
    // total Accounting
    const dispatch = useDispatch();
    
    // to get from slices
    const supplierData = useSelector((state) => state.supplier);
    const buyData = useSelector(state => state.buy);
    const userData = useSelector((state) => state.user);

    const total = useSelector(getTotalPrice);
    const taxRate = 0.00;

    const calculations = useMemo(() => {
        const tax = (total * taxRate) / 100;
        const totalPriceWithTax = total + tax;
        return { tax, totalPriceWithTax };
    }, [total]);

    const [payedAmount, setPayedAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showInvoice, setShowInvoice] = useState(false);
    const [buyInfo, setBuyInfo] = useState();

    const balance = (calculations.totalPriceWithTax - Number(payedAmount)).toFixed(2);
 
    const showPayed = () => {
        setPayedAmount(calculations.totalPriceWithTax.toFixed(2));
    }
   
    const cashPaymethod = () => {
        setPaymentMethod('Cash');
        showPayed();
    }

    const onlinePaymethod = () => {
        setPaymentMethod('Online');
        showPayed();
    };

    const handlePayedAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            const numericValue = value === '' ? 0 : parseFloat(value);
            setPayedAmount(numericValue > calculations.totalPriceWithTax
                ? calculations.totalPriceWithTax
                : numericValue
            );
        }
    };


    // Press placeOrder
    const handlePlaceOrder = async () => {
                
        if (!paymentMethod){
            //enqueueSnackbar('please select a payment method', {variant: "warning"});
            toast.warning('Please select payment method !')
            return;
        }
        if (supplierData.supplierName === '') {
            enqueueSnackbar('please select supplier', { variant: "warning" });
            return;
        }
        if (buyData.length === 0) {
            enqueueSnackbar('please select items', { variant: "warning" });
            return;
        }

       
             
        if (paymentMethod === "Cash" || paymentMethod === 'Online') {

            ////////////////////Start Update quantity....

            const updatedItems = buyData.map(item => ({
                id: item.id, // or item._id, depending on your schema
                quantity: item.quantity // the quantity to subtract from stock
            }));
            //console.log(id, quantity)

            // Example: Call update endpoint after placing order
            await api.post('/api/services/update-buyquantities', { items: updatedItems });

            ////////////////////End Update quantity.....
        
        
        const buyOrderData = {

            // individual : customer field -----> will use it to update customer balnce
            type :'bills',
            invoiceNumber : supplierData.buyId,
            supplier : supplierData.supplierId,
            supplierName : supplierData.supplierName,   
            beneficiary : supplierData.supplierId, 
            customer : null,  customerName :'null',
                
            // to save Status
            invoiceStatus: "In Progress",
            invoiceType : "Purchase invoice",

            // to save TOTALS   || NEEDED
            bills: {
                total: total.toFixed(2),
                tax: (calculations.tax).toFixed(2),
                totalWithTax: (calculations.totalPriceWithTax).toFixed(2),

                payed: Number(payedAmount).toFixed(2),
                balance: balance,
            },
            
            buyBills: {
                total: total.toFixed(2),
                tax: (calculations.tax).toFixed(2),
                totalWithTax: (calculations.totalPriceWithTax).toFixed(2),

                payed: Number(payedAmount).toFixed(2),
                balance: balance,
            },
        
            // to save New Items || NEEDED
            items: buyData,
            //services: cartData,
        
            //service: customerData.service.serviceId,
            paymentMethod: paymentMethod,
            user: userData._id,
    
        };
        
        setTimeout(() => {
            buyMutation.mutate(buyOrderData);
        }, 1500);
        
    }
        
    }


    const buyMutation = useMutation ({ 

    mutationFn: (reqData) => addInvoice(reqData),
                      
    onSuccess: (resData) => {
        const { data } = resData.data; // data comes from backend ... resData default on mutation
        console.log(data);

        setBuyInfo(data)  // to show details in report 
        //enqueueSnackbar('Order Placed!', {variant: "success"});
        toast.success('Purchase invoice confirm and places successfully .');

        // add Transaction 
        const transactionData = {
            transactionNumber :`${Date.now()}`,
            amount: Number(payedAmount).toFixed(2),
            type: 'Expense',
            category: 'Purchase invoice',
            refrence: '-',
            description: '-',
            date: new Date().toISOString().slice(0, 10),
            user: userData._id,
            paymentMethod: paymentMethod
        }

        setTimeout(() => {
            transactionMutation.mutate(transactionData)
        }, 1500)



        // update supplier balance 
        const previousBalance = Number(supplierData.balance) || 0;
        const numericNewBalance = previousBalance + Number(balance); // Do math with numbers
        const formattedNewBalance = numericNewBalance.toFixed(2); // Then format to 2 decimal places

        const balanceData = {
            balance:  formattedNewBalance,
            supplierId: data.supplier  // data from saving order or invoice above     
        }

        setTimeout(() => {
            supplierUpdateMutation.mutate(balanceData)
        }, 1500)



        setShowInvoice(true); // to open report 
        setPaymentMethod('')

        dispatch(removeSupplier());
        dispatch(removeAllItems());

        fetchServices({ category: 'all', page: 1 }) // to refresh services quantity
        setPayedAmount(0);
    },


        onError: (error) => {
            console.log(error);
        }
    });


    // add transaction 
    const transactionMutation = useMutation({
        mutationFn: (reqData) => addTransaction(reqData),

        onSuccess: (resData) => {
            const { data } = resData.data; // data comes from backend ... resData default on mutation
            //console.log(data);       
            toast.success('The expense was transferred to the finance department .');
        },
        onError: (error) => {
            console.log(error);
        }
    });
            

    // update Customer
    const supplierUpdateMutation = useMutation({

    mutationFn: (reqData) => updateSupplier(reqData),
    onSuccess: (resData) => {

        console.log(resData);

    },
        onError: (error) => {
            console.log(error)
        }
    });


    const cancelOrder = () => {
        dispatch(removeSupplier());
        dispatch(removeAllItems());

        fetchServices({ category: 'all', page: 1 }) // to refresh services quantity
        setPayedAmount(0);
    }

        
    return (
        <>
    
        <div className ='flex bg-[#f5f5f5] items-center justify-between shadow-lg/30 p-2 mt-15'>
            <p className ='text-xs text-[#1a1a1a] font-normal'>Items : {buyData.Object}</p>
            <p className ='text-[#1a1a1a]'><span className ='text-md font-normal'>{total.toFixed(2)}</span>
                <span className ='text-xs font-normal text-yellow-700'> AED</span>
            </p>
        </div>

        <div className ='flex bg-[#f5f5f5] items-center justify-between p-2 mt-1 shadow-lg/30'>
            <p className ='text-xs text-[#1a1a1a] font-normal'>Tax(5.25%)</p>
            <p className ='text-[#1a1a1a]'>
                <span className ='text-md font-normal'>{calculations.tax.toFixed(2)}</span>
                <span className ='text-xs font-normal text-yellow-700'> AED</span></p>
        </div>

        
        <div className ='flex bg-[#f5f5f5] items-center justify-between p-2 mt-1 shadow-lg/30'>
            <p className ='text-xs text-[#1a1a1a] font-normal'>Grand Total :</p>
            <p className ='text-yellow-700'><span className ='text-lg font-semibold'>
                {calculations.totalPriceWithTax.toFixed(2)}</span>
                <span className ='text-xs font-normal text-[#1a1a1a]'> AED</span>
            </p>
        </div>

        
        
        <div className ='flex bg-[#f5f5f5] items-center justify-between mt-1 shadow-lg/30 p-2'>
    
            <div className='flex gap-1 items-center justify-between'>
                <p className='text-xs text-[#1f1f1f] font-medium mt-2'>Payed :</p>

                <input
                    className='w-25 bg-white rounded-sm p-1 text-[#1a1a1a] text-lg font-semibold'
                    name='payedAmount'
                    type='number'
                    step='0.01'
                    min='0'
                    max={calculations.totalPriceWithTax}
                    value={payedAmount}
                    onChange={handlePayedAmountChange}
                />
                    <span className='text-xs font-normal text-zinc-500 mt-3'> AED</span>
            </div>

            <p className ='text-xs text-[#1f1f1f] font-medium mt-2'>Balance :</p>
            <p className ='ml-0  text-[#be3e3f]'>
                <span className ='text-2xl font-semibold'>{balance}</span>
                <span className ='text-xs font-normal text-zinc-500'> AED</span>
            </p>
        
        </div>

        <div className='flex items-center justify-between mt-15 bg-white p-5'>

            <div className='flex flex-col  items-center gap-3 px-5 py-2'>
                <button className={`bg-[#f5f5f5]  text-[#0ea5e9]  w-12 h-12 rounded-full  
                text-sm font-semibold cursor-pointer shadow-lg/30
                ${paymentMethod === 'Cash' ? "bg-[#f6b100] text-white" : "bg-white"}`}
                //onClick ={() => setPaymentMethod('Cash')}
                    onClick={cashPaymethod}
                    >
                    Cash
                </button>

                <button className={`bg-[#f5f5f5] w-12 h-12 rounded-full text-green-600 text-sm font-semibold 
                cursor-pointer shadow-lg/30
                ${paymentMethod === 'Online' ? "bg-[#f6b100] text-white" : "bg-white "}`}
                    // onClick ={() => setPaymentMethod('Online')}   onlinePaymethod
                    onClick={onlinePaymethod}
                    >Online
                </button>
                
            </div>

            <div className='flex flex-col items-center gap-3 px-5 py-2'>
                <button className='bg-[#0ea5e9] px-4 py-4 w-full rounded-sm text-white cursor-pointer font-semibold 
                    text-sm font-medium shadow-lg/30'
                    onClick={handlePlaceOrder}
                >
                    Confirm Invoice
                </button>
                <button className='bg-emerald-600  py-4 w-full rounded-sm cursor-pointer font-semibold text-white text-sm 
                    font-medium shadow-lg/30'>
                    Print Receipt
                </button>
                <button className='bg-[#be3e3f]/90 px-4 py-4 w-full rounded-sm text-white cursor-pointer font-semibold 
                    text-sm font-medium shadow-lg/30'
                    onClick={cancelOrder}
                >
                    Cancel
                </button>

            </div>

        </div>
        
            {showInvoice && (
                <BuyInvoice buyInfo={buyInfo} setShowInvoice={setShowInvoice} />
            )}
        
        </>
    );
}


export default BuyBills ;