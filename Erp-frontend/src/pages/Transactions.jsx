// import React, { useState, useEffect } from 'react'
// import BackButton from '../components/shared/BackButton';

// import { MdDeleteForever, MdFormatListBulletedAdd } from 'react-icons/md';
// import { BiSolidEditAlt } from 'react-icons/bi';

// import TransactionAdd from '../components/transactions/TransactionAdd';

// import moment from 'moment';
// import { toast } from 'react-toastify'

// import { Select, Progress,   Flex } from 'antd'
// import { api } from '../https';

// const Transactions = () => {

//     // Modal
//     const Button = [
//         { label : 'Add New' , icon : <MdFormatListBulletedAdd className ='text-white' size={20} />, action :'transaction' }
//     ]

//     const [ isTransactionModalOpen, setIsTransactionModalOpen ] = useState(false);
   
//     const handleOpenModal = (action) => {
//         if(action === 'transaction') setIsTransactionModalOpen(true);
//     };

//     // fetch 
//     const [allTransaction, setAllTransaction] = useState([]);
//     // filter by date
//     const [frequency, setFrequency] = useState('365');
//     // filter by type 
//     const [type, setType] = useState('all');

//     const [shift, setShift] = useState('all');

//     useEffect(() => {

//     const getTransactions = async () => {
//         try {

//             const res = await api.post('/api/transactions/get-transactions' , 
//             {
//                 frequency,
//                 type,
                
//                 shift
//             });
            
//             setAllTransaction(res.data)
//             console.log(res.data)
         

//         } catch (error) {
//             console.log(error)
//             message.error('Fetch Issue with transaction')
            
//         }
//     };

//         getTransactions();
//     }, [frequency, type]); 


//     // Percentage and count
//     const totalTransaction = allTransaction.length;

//     const totalIncomeTransactions = allTransaction.filter(
//         (transaction) => transaction.type === "Income"
//     );
//     const totalExpenseTransactions = allTransaction.filter(
//         (transaction) => transaction.type === "Expense"
//     );
//     const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100 ;
//     const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100 ;

//     // Total amount 
//     const totalTurnover = allTransaction.reduce((acc, transaction) => acc + transaction.amount, 0) ;
//     const totalIncomeTurnover = allTransaction.filter(transaction => transaction.type === 'Income').reduce((acc, transaction) => acc + transaction.amount, 0);
//     const totalExpenseTurnover = allTransaction.filter(transaction => transaction.type === 'Expense').reduce((acc, transaction) => acc + transaction.amount, 0);
    
//     const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100 ;
//     const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100 ;

    
//     // by category 
//     //const amount = allTransaction.filter((transaction) => transaction.type === "Income"
//     //const amountIncome = allTransaction.filter((transaction) => transaction.type == 'Income')
  
//     const [list , setList] = useState([]) ;

//     const fetchList = async () => {
//         try {
//             const response = await api.get('/api/expenses/') 
//             if (response.data.success){
//               setList(response.data.expenses);
//             }
//             else{
//               toast.error(response.data.message)
//             }
          
        
//           } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//           }
//         };

        
//     useEffect(()=>{
//         fetchList() ;
//     },[])


//     // Remove
//     const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//     const [selectedTransaction, setSelectedTransaction] = useState(null);
        
    
//     const removeTransaction = async (id) => {
          
//         try {
//             const response = await axios.post(backendUrl + '/api/transactions/remove', { id }, )
        
//             if (response.data.success){
//               toast.success(response.data.message)
           
//             //Update the LIST after Remove
//             fetchList()
            
//             } else{
//               toast.error(response.data.message)
//             }
        
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }



//     const twoColors = {
//         '0%': '#108ee9',
//         '100%': '#87d068',
//     };
    
//     const conicColors = {
//         '0%': '#87d068',
//         '50%': '#ffe58f',
//         '100%': '#ffccc7',
//     };
        


  
    


//     return (
//         <section className ='h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden flex gap-3 bg-zinc-300'>
//             <div className ='flex-[3] bg-white h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden'>

//                 <div className ='flex justify-between items-center px-5 py-2'>
//                 <div className ='flex justify-between items-center'>
//                     <BackButton />
//                     <div className ='flex items-center gap-5'>
//                         <h1 className ='text-lg font-semibold text-[#1f1f1f]'>Transactions Management</h1>
//                     </div>
//                 </div>

//                 <div className ='flex items-center gap-3 justify-around'>
//                     {Button.map(({label, icon, action}) => {
//                         return(
//                             <button className ='shadow-lg cursor-pointer bg-[#D2B48C]  hover:bg-blue-600 text-white hover:text-white
//                                 px-5 py-2 rounded-lg text-white font-semibold text-sm flex items-center gap-2'
//                                 onClick = {() => handleOpenModal(action)}
//                             >
//                                 {label} {icon}
//                             </button>                            
//                             )
//                         })}
            
//                 </div>

//             </div>


//             <div className ='mt-3' >
                      
//                 <div className ='overflow-x-auto px-5'>
//                     <table className ='w-full text-left text-[#1a1a1a]'>
//                         <thead className ='bg-[#D2B48C] text-xs font-semibold text-[#1a1a1a]'>
//                             <tr>
//                                 <th className ='p-2'></th>
//                                 <th className ='p-2'>Type</th>
//                                 <th className ='p-2'></th>

//                                 <th className ='p-2'>Amount</th>
//                                 <th className ='p-2'></th> 
//                                 <th className ='p-2'>Refrence</th>
//                                 <th className ='p-2'>Description</th>
//                                 <th className ='p-2'></th>  
//                             </tr>
//                         </thead>
                        
//                         <tbody>
                                        
//                         {allTransaction.length === 0 
//                         ? (<p className ='ml-5 mt-5 text-xs text-red-700 flex items-start justify-start'>Your tranactions list is empty . Start adding transactions !</p>) 
                                
//                             :allTransaction.map((transaction, index) => (
//                             <tr
//                                 key ={index}
//                                 className ='border-b border-[#D2B48C]  text-xs'
//                             >
                                    
//                                 <td className ='p-2 text-xs font-semibold' hidden>{transaction._id}</td>
//                                 {/* <td className ='p-2 text-xs font-semibold'>{new Date(transaction.date).toLocaleDateString('en-GB')}</td> */}
//                                 <td className ='p-2 text-xs font-semibold' >{transaction.date}</td>
//                                 <td className ={`p-2 text-xs font-semibold ${transaction.type === 'Expense' ? 'text-red-600' : 'text-green-700'}`}>{transaction.type}</td>
//                                 <td className ='p-2 text-xs font-semibold' >{transaction.shift}</td>
//                                 <td className ={`p-2 text-xs font-semibold ${transaction.type === 'Expense' ? 'text-red-600' : 'text-green-700'}`}>{transaction.amount.toFixed(2)}</td>
//                                 <td className ='p-2 underline text-xs font-semibold text-sky-500'>{transaction.category}</td>
//                                 <td className ='p-2 text-xs font-semibold'>{transaction.refrence}</td> 
//                                 <td className ='p-2 text-xs font-semibold'>{transaction.description}</td>
                                 
                                                       
//                                 <td className ='p-2 text-center flex gap-4'>
//                                     <button>
//                                         <BiSolidEditAlt size ={20} className ='w-6 h-6 text-sky-600 rounded-full shadow-lg/30 flex justify-end cursor-pointer'/>
//                                     </button>
//                                     <button >
//                                         <MdDeleteForever onClick={()=> {setSelectedTransaction(transaction); setDeleteModalOpen(true); }}
//                                         size ={20} className ='w-6 h-6 text-orange-600 rounded-full shadow-lg/30 cursor-pointer'/> 
//                                     </button>
//                                 </td>
//                             </tr>
//                             ))}
//                         </tbody>
//                     </table>
                        
//                 </div>

//             </div>
             

//                 {isTransactionModalOpen && <TransactionAdd setIsTransactionModalOpen={setIsTransactionModalOpen} />}

//             </div>



//             <div className ='flex-[1] bg-white px-2 py-3'>

//                 <div className ='flex flex-col items-start '>
//                     <p className ='text-xs text-blue-600 font-semibold ml-2 mb-2'>Seacrch by duration and type :-</p>
                
//                     <div className ='w-full flex items-center justify-between rounded-lg p-2 px-4 bg-zinc-100 shadow-lg/30'>
                    
                 

//                         <div className='flex flex-col gap-1'>
//                             <p className='text-xs text-blue-600'>By type ...</p>
//                             <Select className='w-30' onChange={(values) => setType(values)} >
//                                 {/*value ='By duration ...' */}
//                                 <Select.Option value="Income">Income</Select.Option>
//                                 <Select.Option value="Expense">Expense</Select.Option>
//                                 <Select.Option value="all">All</Select.Option>
//                             </Select>

//                         </div>

                       
                        
                   
//                     {/** value ='Select by duration ...'   */}
//                         <div className='flex flex-col gap-1'>
//                             <p className='text-xs text-blue-600'>By duration ...</p>
//                             <Select className='w-30' onChange={(values) => setFrequency(values)} >
//                                 {/*value ='By duration ...' */}
//                                 <Select.Option value="0">Today</Select.Option>
//                                 <Select.Option value="7">Last week</Select.Option>
//                                 <Select.Option value="30">Last Month</Select.Option>
//                                 <Select.Option value="365">Last year</Select.Option>
//                                 <Select.Option value="1000">All</Select.Option>
//                             </Select>

//                         </div>


//                     </div>
//                 </div>

//                 <hr className ='border-b text-zinc-200 m-5'/>
                         
             

//                 <div className ='flex flex-col items-start'>
//                     <p className ='text-xs text-blue-600 font-semibold ml-2 mb-2'>Count of transactions :-</p>
//                     <div className ='flex items-center justify-between w-full px-15'>
//                         <div className ='flex  items-center justify-center gap-3'>
//                             <span className ='text-xs font-medium text-black bg-white '>Incomes : </span>
//                             <p className ='font-semibold text-lg text-green-600 bg-zinc-100 p-1 shadow-lg/30 
//                             rounded-full bg-zinc-100'>{totalIncomeTransactions.length}</p>
//                         </div>
//                         <div className ='flex items-center justify-center gap-3'>
//                              <span className ='text-xs font-medium text-black bg-white '>Expense : </span>
//                             <p className ='font-semibold text-lg text-orange-600 bg-zinc-100 p-1 shadow-lg/30 
//                             rounded-full bg-zinc-100'>{totalExpenseTransactions.length}</p>
//                         </div>
//                     </div>
//                 </div>

//                 <hr className ='border-b text-zinc-200 m-5'/>
                

//                 <div className ='flex flex-col items-start'>
//                     <p className ='text-xs text-blue-600 font-semibold ml-2 mb-2'>Amounts Totals :-</p>
//                     <div className ='flex items-center justify-between w-full px-1'>
//                         <div className ='flex items-center justify-center gap-3 '>
//                             <span className ='text-xs font-normal text-black'>All : </span>
//                             <p className ='font-semibold text-xs text-blue-600 shadow-lg/30 rounded-lg bg-zinc-100 p-1'>
//                             {totalTurnover.toFixed(2)}<span className ='font-normal text-xs text-black'> AED</span></p>
//                         </div>
//                         <div className ='flex items-center justify-center gap-3'>
//                             <span className ='text-xs font-normal text-black'>Incomes : </span>
//                             <p className ='font-semibold text-xs text-green-600 shadow-lg/30 rounded-lg bg-zinc-100 p-1'>
//                             {totalIncomeTurnover.toFixed(2)}<span className ='font-normal text-xs text-black'> AED</span></p>
//                         </div>
//                            <div className ='flex items-center justify-center gap-3'>
//                             <span className ='text-xs font-normal text-black'>Expenses : </span>
//                             <p className ='font-semibold text-xs text-orange-600 shadow-lg/30 rounded-lg bg-zinc-100 p-1'>
//                             {totalExpenseTurnover.toFixed(2)}<span className ='font-normal text-xs text-black'> AED</span></p>
//                         </div>
//                     </div>

//                 </div>
//                 <hr className ='border-b text-zinc-200 m-5'/>

//                 <div className ='flex flex-col items-start mb-5'>
//                     <p className ='text-xs text-blue-600 font-semibold ml-2 mb-2'>Percentage of transactions :-</p>
//                     <div className ='flex items-center justify-between w-full px-15'>
//                         <div className ='flex items-start justify-start p-1'>
//                             <p className ='font-semibold text-lg text-green-600'>
//                                 <span className ='text-xs font-medium text-black'>
//                                     Incomes : </span>{totalIncomeTurnoverPercent.toFixed(0)} <span className = 'font-medium text-xs text-black'> %</span></p>
//                         </div>
//                         <div className ='flex items-end justify-end  p-1'>
//                             <p className ='font-semibold text-lg text-red-500'>
//                                 <span className ='text-xs font-medium text-black'>Expenses : </span>
//                                 {totalExpenseTurnoverPercent.toFixed(0)} 
//                                 <span className = 'font-medium text-xs text-black'> %</span></p>
//                         </div>
//                     </div>
//                 </div>

//                    <div className ='flex flex-col items-start'>
                 
//                     <div className ='flex items-center justify-between w-full px-15'>
//                         <div className ='flex items-start justify-start shadow-lg/30 p-1 rounded-lg bg-zinc-100'>
//                             <Progress type ='circle' strokeColor={'green'}  size={90} percent ={totalIncomeTurnoverPercent.toFixed(0)} />
//                         </div>
//                         <div className ='flex items-end justify-end shadow-lg/30 rounded-lg bg-zinc-100 p-1'>
//                             <Progress type ='circle' strokeColor={'red'}  size={90} percent ={totalExpenseTurnoverPercent.toFixed(0)} />
//                         </div>
//                     </div>

//                 </div>
//                 <hr className ='border-b text-zinc-200 m-5'/>


                   



//                         {/* <div className ='flex items-center gap-4 justify-between rounded-lg p-2 px-4 bg-white shadow-lg/30'>
//                         <p className ='text-sm font-semibold'>Incomes by total :</p>
//                         <Progress type ='circle' strokeColor={'green'}  size={90} percent ={totalIncomeTurnoverPercent.toFixed(0)} />
//                     </div> 
//                         <div className ='flex items-center gap-4 justify-between rounded-lg p-2 px-4 bg-white shadow-lg/30'>
//                         <p className ='text-sm font-semibold'>Expence by total :</p>
//                         <Progress type ='circle' strokeColor={'red'}  size={90} percent ={totalExpenseTurnoverPercent.toFixed(0)} />
//                     </div> 


//                     <div className ='flex items-center gap-4 justify-between rounded-lg p-2 px-4 bg-white shadow-lg/30'>
//                         <p className ='text-sm font-semibold'>Incomes by percent:</p>
//                         <Progress type ='circle' strokeColor={'green'}  size={90} percent ={totalIncomePercent.toFixed(0)} />
//                     </div> 
 
//                     <div className ='flex items-center gap-4 justify-between rounded-lg p-2 px-4 bg-white shadow-lg/30'>
//                         <p className ='text-sm font-semibold'>Expense by percent:</p>
//                         <Flex vertical gap="small">
//                             <Progress type ='circle' strokeColor={'red'} size ={90} className ='mx-1' percent ={totalExpensePercent.toFixed(0)} />
//                         </Flex>
//                     </div> */}

             

                    
//                     <div className ='flex  flex-col items-start gap-4 justify-start p-2 px-2 bg-white h-[150px] overflow-y-scroll'>
//                         <p className ='text-blue-600 underline text-sm font-semibold'>Income Menu :</p>
                 
    
//                         { list.map((expense) => {
//                             //////////////  status="exception" showInfo={false}
//                             const amount = allTransaction.filter((transaction) => 
//                             transaction.type === "Income" && transaction.category === expense.expenseName)
                         
//                             .reduce((acc, transaction) => acc + transaction.amount, 0);
//                             /////////////////
//                             return(
//                                 amount > 0 && (
//                                 <div className ='shadow-lg/30 bg-zinc-100 p-1 w-full'>
//                                 <h5 className ='text-xs font-normal'>{expense.expenseName}</h5>
                           
//                                 <Flex gap="small" vertical style={{ width: 400 }}>
//                                     <Progress  type ='line'  percent = {((amount/totalIncomeTurnover) * 100).toFixed(0)}/>
//                                 </Flex>
//                                 </div>

//                                 )
//                             )
                                
//                         })}

//                     </div>  
              

//                     <div className ='flex  flex-col items-start gap-4 justify-start p-2 bg-white h-[150px] overflow-y-scroll'>
//                     <p className ='text-red-500 underline text-sm font-semibold'>Expenses Menu :</p>
                 
    
//                         { list.map((expense) => {
//                             //////////////  status="exception" showInfo={false}
//                             const amount = allTransaction.filter((transaction) => 
//                             transaction.type === "Expense" && transaction.category === expense.expenseName)
                         
//                             .reduce((acc, transaction) => acc + transaction.amount, 0);
//                             /////////////////
//                             return(
//                                 amount > 0 && (
//                                 <div className ='shadow-lg/30 bg-zinc-100 p-1 w-full'>
//                                 <h5 className ='text-xs font-normal'>{expense.expenseName}</h5>
                           
//                                 <Flex gap="small" vertical style={{ width: 400 }}>
//                                     <Progress  type ='line' strokeColor={'red'} percent = {((amount/totalIncomeTurnover) * 100).toFixed(0)}/>
//                                 </Flex>
//                                 </div>

//                                 )
//                             )
                                
//                         })}

//                     </div>  
                  

//             </div>

//             {/* Place the ConfirmModal here */}
//             <ConfirmModal
//                 open={deleteModalOpen}
//                 transactionType={selectedTransaction?.type}
//                 Amount={selectedTransaction?.amount}
//                 onClose={() => setDeleteModalOpen(false)}
//                 onConfirm={() => {
//                     removeTransaction(selectedTransaction._id);
//                     setDeleteModalOpen(false);
//                 }}
//             />
            
//         </section>
//     );
// };


// const ConfirmModal = ({ open, onClose, onConfirm, transactionType, Amount }) => {
//   if (!open) return null;
//   return (
//        <div
//       className="fixed inset-0 flex items-center justify-center z-50"
//       style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
//     >
      
//       <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
//         {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
        
        
//         <p className="mb-2 text-xs font-normal">Are you sure you want to remove 
//         <span className="font-semibold text-sm text-blue-600"> {transactionType}</span>?</p>

//         <p className="mb-6 text-xs font-normal">Amount 
//         <span className="font-semibold text-sm text-red-600"> {Amount}</span> ?</p>

//         <div className="flex justify-end gap-3">
//           <button
//             className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
//             onClick={onConfirm}
//           >
//             Delete
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Transactions;

import React, {useState, useEffect, useRef, useCallback} from 'react' 
import { api } from '../https';
import { toast } from 'react-toastify'
import { MdDeleteForever } from 'react-icons/md';
import { IoIosAddCircle } from 'react-icons/io'; 
import { BiSolidEditAlt } from 'react-icons/bi';
import BackButton from '../components/shared/BackButton';
import TransactionAdd from '../components/transactions/TransactionAdd';
import {Progress} from 'antd'   
import { LuPrinterCheck } from "react-icons/lu";
import TransactionUpdate from '../components/transactions/TransactionUpdate';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// ChartJS.register(ArcElement, Tooltip, Legend);

// import { VictoryPie, VictoryTooltip, VictoryContainer } from 'victory';



const Transactions = () => {
    
    const Button = [
        { label: 'New Transaction', icon: <IoIosAddCircle className='text-yellow-700  w-6 h-6' />, action: 'transaction' }
    ];

    const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);

    const handleOpenModal = (action) => {
        if (action === 'transaction') setIsAddTransactionModalOpen(true);
    };

    // fetch
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(''); 
    const [sort, setSort] = useState('-createdAt');
    const [paymentMethod, setPaymentMethod] = useState('all');
    const [frequency, setFrequency] = useState(366);
    const [type, setType] = useState('all');
    const [shift, setShift] = useState('all');

    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 1
    });

    const [isEditTransactionModal, setIsEditTransactionModal] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);


    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        try {

            const response = await api.post('/api/transactions/get-transactions',
                // { sort }, { params: {search} }
                {
                    paymentMethod,
                    frequency,
                    type,
                    shift,
                    search,
                    sort,
                    page: 1,
                    limit: 1000
                }
            );

            if (response.data.success) {
                //setList(response.data.employees)
                setList(response.data.data || response.data.transactions || []);
                console.log(response.data.data)
              


            } else {
                toast.error(response.data.message || 'Transactions is not found')
            }

        } catch (error) {
            // Show backend error message if present in error.response
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message)
            }
            console.log(error)
        } finally{
            setLoading(false);
        }

    });

 
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            fetchTransactions();
        }
    }, [paymentMethod, frequency, shift, type, search, sort]);

     // Handle edit
    const handleEdit = (transaction) => {
        setCurrentTransaction(transaction);
        setIsEditTransactionModal(true);
    };


    // Removing
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);    // for remove
    const [selectedTransaction, setSelectedTransaction] = useState(null);   // for remove

    const removeTransaction = async (id) => {

        try {
            const response = await api.post('/api/transactions/remove', { id },)
            if (response.data.success) {
                toast.success(response.data.message)

                //Update the LIST after Remove
                await fetchTransactions();

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };


    // search - sorting - Debounce search to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchTransactions(search);
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [search, sort]);

    

    // Percentage and count
    const totalTransaction = list.length;

    const totalIncomeTransactions = list.filter(
        (transaction) => transaction.type === "Income"
    );
    const totalExpenseTransactions = list.filter(
        (transaction) => transaction.type === "Expense"
    );
    const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100;
    const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100;

    // Total amount 
    const totalTurnover = list.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnover = list.filter(transaction => transaction.type === 'Income').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenseTurnover = list.filter(transaction => transaction.type === 'Expense').reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

    const data = [
        { name: 'Income', value: totalIncomeTurnover, color: '#10b981' },
        { name: 'Expense', value: totalExpenseTurnover, color: '#ef4444' }
    ];


    // const data = {
    //     labels: ['Income', 'Expense'],
    //     datasets: [
    //         {
    //             data: [totalIncomeTurnover, totalExpenseTurnover],
    //             backgroundColor: ['#10b981', '#ef4444'],
    //             borderColor: ['#10b981', '#ef4444'],
    //             borderWidth: 1,
    //         },
    //     ],
    // };

    // const options = {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     plugins: {
    //         legend: {
    //             position: 'bottom',
    //         },
    //         tooltip: {
    //             callbacks: {
    //                 label: function(context) {
    //                     return `${context.label}: $${context.raw.toFixed(2)}`;
    //                 }
    //             }
    //         }
    //     },
    //     cutout: '60%',
    // };


    //  const data = [
    //     { x: 'Income', y: totalIncomeTurnover, color: '#10b981' },
    //     { x: 'Expense', y: totalExpenseTurnover, color: '#ef4444' }
    // ];

    // Printing
    const invoiceRef = useRef(null)
    const handlePrint = () => {
        const printContent = invoiceRef.current.innerHTML
        const WinPrint = window.open("", "", "width=900, height=650")

        WinPrint.document.write(` 
                    <html>
                        <head>
                            <title>Transactions Management</title>
                            <style>
                                body { font-family: Arial, sans-serif; padding: 20px; }
                                .receipt-container { width: 100%; }
                                h2 { text-align: center; }
                                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                                
                                th { background-color: #f2f2f2; }
                                .IdTd {display: none ;}
                                .buttonTd {display: none ;}
                                .buttonTr {display: none ;}
                                .userTr {display: none ;}
                                .userTd {display: none ;}
                                .footTd {display: none ;}
                                .controls { display: none; }
                                .button { display: none; }
                                .backButton {display: none; }
                                .search {display : none; } 
                                
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
    };

    return(
        <section className ='flex gap-3 h-[calc(100vh)] overflow-y-scroll scrollbar-hidden bg-[#f5f5f5]'>
            <div className ='flex-[3] bg-white h-[100vh] overflow-y-scroll scrollbar-hidden '>
                <div ref={invoiceRef} className=''>
                
                <div className='flex items-center justify-between px-5 py-2 shadow-xl mb-2'>
                    <div className='flex items-center'>
                            <div className='backButton flex items-center gap-2'>
                                <BackButton />
                                <h1 className='text-md font-semibold text-[#1a1a1a]'>Financial Management</h1>
                            </div>
                            
                    </div>

                        <div className='Button gap-2 flex items-center justify-between'>
                            <div className='flex justify-end button  items-center cursor-pointer gap-3'>
                                <button
                                    onClick={handlePrint}
                                    className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                                >
                                    <LuPrinterCheck className="w-4 h-4" />
                                    Print
                                </button>
                            </div>


                            <div className='flex gap-2 items-center justify-around gap-3 hover:bg-yellow-700 shadow-lg/30 bg-white'>
                                {Button.map(({ label, icon, action }) => {
                                    return (
                                        <button
                                            className='bg-white px-4 py-2 text-[#1a1a1a] cursor-pointer
                                    font-semibold text-xs flex items-center gap-2 rounded-full'

                                            onClick={() => handleOpenModal(action)}
                                        >
                                            {label} {icon}
                                        </button>
                                    )
                                })}


                            </div>
                        </div>

                    {isAddTransactionModalOpen && 
                    <TransactionAdd 
                    setIsAddTransactionModalOpen={setIsAddTransactionModalOpen} 
                    fetchTransactions ={fetchTransactions}
                    
                    />} 

                </div>
                {/* Search and sorting */}
                <div className="search flex gap-2 items-center px-15 py-2 shadow-xl bg-white text-[#1a1a1a]">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="text-[#1a1a1a] border border-yellow-700 p-1 rounded-sm w-full text-xs font-semibold"
                        // max-w-md
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* Optional: Sort dropdown */}
                    <select
                        className="border  border-yellow-700 p-1 rounded-sm text-[#1a1a1a] text-xs font-normal cursor-pointer"
                        value={sort}

                        onChange={(e) => {
                            setSort(e.target.value);
                            setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page when changing sort
                        }}
                    >
                        <option value="-createdAt">Newest First</option>
                        <option value="createdAt">Oldest First</option>
                        <option value="type">By type (A-Z)</option>
                        <option value="-type">By type (Z-A)</option>
                    </select>
                </div>

                {loading && (
                    <div className="mt-4 flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-700"></div>
                        <span className="ml-2">Loading Transactions...</span>
                    </div>
                )}

                <div className='mt-5 bg-white py-1 px-10' >
                    <div className='overflow-x-auto'>
                        <table className='text-left w-full' >
                            <thead>
                                <tr className ='bg-white border-b-2 border-yellow-700 text-[#1a1a1a] text-xs font-normal'> {/**bg-[#D2B48C] */}
                                    <th className='p-1'></th>
                                    <th className='p-1'></th>
                                    <th className='p-3'></th>
                                    <th className='p-1'></th>
                                    
                                    <th className='p-1'>Amount</th>
                                    <th className='p-1'>Category</th>
                                    <th className='p-1'>Refrence</th>
                                    <th className='p-1'></th>
                                    <th className='p-1 userTr'>By</th>
                                
                                    <th className='buttonTr p-1' style={{ marginRight: '0px' }}></th>
                                </tr>
                            </thead>

                            <tbody>

                                {list.length === 0
                                    ? (<p className='ml-5 mt-5 text-xs text-[#be3e3f] flex items-start justify-start'>Your transaction list is empty .</p>)
                                    : list.map((transaction, index) => (

                                        <tr
                                             key ={index}
                                            className='border-b-3 border-[#f5f5f5] text-xs font-normal text-[#1a1a1a] 
                                            hover:bg-[#F1E8D9] cursor-pointer'
                                        >
                                            <td className='IdTd p-1' hidden>{transaction._id}</td>
                                            <td className='p-1'>{transaction.date ? new Date(transaction.date).toLocaleDateString('en-GB') : ''}</td>
                                            <td className='p-1'>{transaction.paymentMethod}</td>
                                            <td className= {`${transaction.type === 'Expense' ? "bg-[#be3e3f]/50 text-white" 
                                                : "bg-green-600/80 text-white"} p-2`}>
                                                {transaction.type}
                                            </td>
                                           
                                           <td className={`${transaction.shift === 'Morning' ? 'text-[#e6b100]' : 
                                                'text-[#0ea5e9]'
                                            } p-1`}>{transaction.shift}<span className ='text-[#1a1a1a]'></span></td>

                                            <td className='p-1'>{transaction.amount.toFixed(2)}</td>
                                            <td className='p-1'>{transaction.category}</td>
                                            <td className='p-1'>{transaction.refrence}</td>
                                            <td className={`${transaction.status === 'updated' ? 'text-emerald-600' : 'text-white'}`}>
                                                {transaction.status}</td>
                                            <td className='userTd p-1'>{transaction.user.name} / 
                                                <span className ='text-[#0ea5e9]'>  {transaction.user.role}</span>
                                            </td>
                                        

                                            <td className='buttonTd py-1 px-5  flex gap-2  justify-center' 
                                                style={{ marginRight: '0px' }}>
                                                <button className={`cursor-pointer text-sm font-semibold `}>
                                                    <BiSolidEditAlt
                                                        onClick={() => handleEdit(transaction)}
                                                        className ='w-5 h-5 text-[#0ea5e9] 
                                                        hover:bg-[#0ea5e9]/30 hover:rounded-full    
                                                        ' />
                                                </button>

                                                <button className={`text-[#be3e3f] cursor-pointer text-sm font-semibold`}>
                                                    <MdDeleteForever
                                                        onClick={() => { setSelectedTransaction(transaction); setDeleteModalOpen(true); }}
                                                        className ='w-5 h-5 text-[#be3e3f] border-b border-[#be3e3f]
                                                        hover:bg-[#be3e3f]/30 hover:rounded-full
                                                        ' />
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                            </tbody>

                            {/* Footer Section */}
                            {list.length > 0 && (

                            
                                    <tfoot className='bg-[#F1E8D9] border-t-2 border-yellow-700 text-[#1a1a1a] text-xs font-normal'>
                                        <tr>
                                            <td className='p-2' colSpan={1}>{list.length} Process</td>
                                            
                                          
                                            <td className='p-2' colSpan={3}>
                                               Expense : 
                                               <span className ='text-[#be3e3f] font-semibold'> {list.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}</span> 
                                            </td>

                                            
                                            <td className='p-2' colSpan={3}>
                                                Income : 
                                                <span className ='text-[#0ea5e9] font-semibold'> {list.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}</span> 
                                            </td>

                                           
                                          
                                            {/* <td className='p-2' >Net Result :</td> */}
                                            <td className='p-2 font-semibold' colSpan={3}>
                                                {(
                                                    list.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0) -
                                                    list.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0)
                                                ).toFixed(2)} AED
                                            </td>

                                        </tr>
                                        {/* <tr>
                                            <td className='p-2' colSpan={2}>Expense Total</td>
                                            <td className='p-2' colSpan={2}>
                                                {list.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0).toFixed(2)} AED
                                            </td>

                                            <td className='p-2' colSpan={2}>Income Total</td>
                                            <td className='p-2' colSpan={2}>
                                                {list.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0).toFixed(2)} AED
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='p-2' colSpan={2}>Net Result</td>
                                            <td className='p-2' colSpan={6}>
                                                {(
                                                    list.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0) -
                                                    list.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0)
                                                ).toFixed(2)} AED
                                            </td>
                                        </tr> */}
                                    </tfoot>
                            )}

                        </table>

                    </div>

                
                    {/* Edit Employee Modal */}
                    {isEditTransactionModal && currentTransaction && (
                        <TransactionUpdate
                            transaction ={currentTransaction}
                            setIsEditTransactionModal ={setIsEditTransactionModal}
                            fetchTransactions ={fetchTransactions}
                        />
                    )}


                </div>
                </div>
 
            </div>
            <div className ='flex-[1] bg-white px-2 py-3'>
                <div className="flex gap-2 items-center px-15 py-2 shadow-xl text-white">
                    <select id='frequency' value={frequency} onChange={(e) => setFrequency(e.target.value)}
                        className='border border-yellow-700 rounded-md px-2 py-1 text-xs text-[#1f1f1f] '>
                        <option value='1'>1 Day</option>
                        <option value='7'> 7 Days</option>
                        <option value='30'> 30 Days</option>
                        <option value='90'> 90 Days</option>

                    </select>
                    <select id='type' value={type} onChange={(e) => setType(e.target.value)}
                        className='border border-yellow-700 rounded-md px-2 py-1 text-xs text-[#1f1f1f] '>
                        <option value='all'>All</option>
                        <option value='Income'>Income</option>
                        <option value='Expense'>Expense</option>

                    </select>
                    <select id='shift' value={shift} onChange={(e) => setShift(e.target.value)}
                        className='border border-yellow-700  rounded-md px-2 py-1 text-xs text-[#1f1f1f] '>
                        <option value='all'>All</option>
                        <option value='Morning'>Morning</option>
                        <option value='Evening'>Evening</option>
                    </select>
                    <select id='paymentMmethod' value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}
                        className='border border-yellow-700  rounded-md px-2 py-1 text-xs text-[#1f1f1f] '>
                        <option value='all'>All</option>
                        <option value='Cash'>Cash</option>
                        <option value='Credit Card'>Credit Card</option>
                        <option value='Debit Card'>Debit Card</option>
                        <option value='Bank Transfer'>Bank Transfer</option>
                        <option value='Digital Wallet'>Digital Wallet</option>
                        <option value='Check'>Check</option>
                    </select>
                </div>

                <div className='flex flex-col items-start mt-2 shadow-xl'>
                    
                    <p className='text-xs text-[#0ea5e9] font-semibold ml-2 mb-2 mt-2'>Count of transactions :-</p>
                    <div className='flex items-center justify-between w-full px-5'>

                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a] '>Incomes : </span>
                            <p className='font-semibold text-md text-green-600 p-1'>
                                {totalIncomeTransactions.length} 
                                <span className ='text-[#1a1a1a] text-xs font-normal'> Process</span>
                            </p>
                        </div>
                        {/* {totalExpenseTransactions.length} */}
                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a] '>Expenses : </span>
                            <p className='font-semibold text-md text-[#be3e3f] p-1'>
                                {totalExpenseTransactions.length}
                                <span className='text-[#1a1a1a] text-xs font-normal'> Process</span>
                            </p>
                        </div>

                    </div>
                </div>

                <div className='flex flex-col items-start mt-2 shadow-xl '>

                    <p className='text-xs text-[#0ea5e9] font-semibold ml-2 mb-2 mt-2'>Amounts Totals :-</p>
                    <div className='flex flex-col gap-5 justify-between w-full px-5'>

                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a] '>Incomes : </span>
                            <p className='font-semibold text-md text-green-600 p-1'>
                                {totalIncomeTurnover.toFixed(2)}
                                <span className='text-[#1a1a1a] text-xs font-normal'> AED</span>
                            </p>
                        </div>

                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a] '>Expenses : </span>
                            <p className='font-semibold text-md text-[#be3e3f] p-1'>
                                {totalExpenseTurnover.toFixed(2)}
                                <span className='text-[#1a1a1a] text-xs font-normal'> AED</span>
                            </p>
                        </div>

                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a] '>Balance : </span>
                            <p className='font-semibold text-md text-[#0ea5e9] p-1'>
                                {(totalIncomeTurnover - totalExpenseTurnover).toFixed(2)}
                                <span className='text-[#1a1a1a] text-xs font-normal'> AED</span>
                            </p>
                        </div>

                    </div>
                </div>

                {/* <div className='flex flex-col items-start mt-2 shadow-xl'>

                    <p className='text-xs text-[#0ea5e9] font-semibold ml-2 mb-2 mt-2'>Percentage of transactions :-</p>
                    <div className='flex items-center justify-between w-full px-5'>

                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a] '>Incomes : </span>
                            <p className='font-semibold text-md text-green-600 p-1'>
                                {totalIncomeTurnoverPercent.toFixed(0)}
                                <span className='text-[#1a1a1a] text-xs font-normal'> %</span>
                            </p>
                        </div>
                      
                        <div className='flex  items-center justify-center gap-3'>
                            <span className='text-xs font-normal text-[#1a1a1a]'>Expenses : </span>
                            <p className='font-semibold text-md text-[#be3e3f] p-1'>
                                {totalExpenseTurnoverPercent.toFixed(0)} 
                                <span className='text-[#1a1a1a] text-xs font-normal'> %</span>
                            </p>
                        </div>

                    </div>
                </div> */}


                {/* <div className='flex flex-col items-start mt-15 '>
                    <p className='text-xs text-[#0ea5e9] font-semibold ml-2 mb-5 mt-2'>Graphical Explanation :-</p>
                    <div className='flex items-center justify-between w-full px-15'>
                        <div className='flex items-start justify-start bg-sky-50 p-1 rounded-sm '>
                            <Progress type='circle' strokeColor={'green'} size={90} percent={totalIncomeTurnoverPercent.toFixed(0)} />
                        </div>
                        <div className='flex items-end justify-end bg-sky-50 rounded-sm  p-1'>
                            <Progress type='circle' strokeColor={'#be3e3f'} size={90} percent={totalExpenseTurnoverPercent.toFixed(0)} />
                        </div>
                    </div>
                </div> */}






                <div className='flex flex-col items-start mt-5'>
                    <p className='text-xs text-[#0ea5e9] font-semibold ml-2 mb-2 mt-2'>Graphical Explanation :-</p>

                    <div className='w-full h-50'>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='flex justify-between w-full mt-4 text-xs'>
                        <div className='text-center'>
                            <div className='w-4 h-4 bg-green-500 rounded-full mx-auto mb-1'></div>
                            <div>Income: AED {totalIncomeTurnover.toFixed(2)}</div>
                            <div className='text-green-600 font-semibold'>{totalIncomeTurnoverPercent.toFixed(0)}%</div>
                        </div>
                        <div className='text-center'>
                            <div className='w-4 h-4 bg-red-500 rounded-full mx-auto mb-1'></div>
                            <div>Expense: AED {totalExpenseTurnover.toFixed(2)}</div>
                            <div className='text-red-600 font-semibold'>{totalExpenseTurnoverPercent.toFixed(0)}%</div>
                        </div>
                    </div>
                </div> 




                {/* <div className='flex flex-col items-start mt-15'>
                    <p className='text-xs text-[#0ea5e9] font-semibold ml-2 mb-5 mt-2'>Graphical Explanation :-</p>

                    <div className='w-full h-64'>
                        <Doughnut data={data} options={options} />
                    </div>

                    <div className='flex justify-between w-full mt-4 text-xs'>
                        <div className='text-center'>
                            <div className='text-green-600 font-bold text-lg'>{totalIncomeTurnoverPercent.toFixed(0)}%</div>
                            <div>Income</div>
                        </div>
                        <div className='text-center'>
                            <div className='text-red-600 font-bold text-lg'>{totalExpenseTurnoverPercent.toFixed(0)}%</div>
                            <div>Expense</div>
                        </div>
                    </div>
                </div> */}




                {/* <div className='flex flex-col items-start mt-15'>
                    <p className='text-xs text-[#0ea5e9] font-semibold ml-2 mb-5 mt-2'>Graphical Explanation :-</p>

                    <div className='w-full h-64'>
                        <VictoryPie
                            data={data}
                            colorScale={['#10b981', '#ef4444']}
                            innerRadius={100}
                            labelRadius={120}
                            style={{
                                labels: { fill: 'white', fontSize: 12, fontWeight: 'bold' }
                            }}
                            labelComponent={
                                <VictoryTooltip
                                    flyoutStyle={{ fill: 'white', stroke: '#ccc' }}
                                />
                            }
                            containerComponent={<VictoryContainer responsive={true} />}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onMouseOver: () => ({
                                        target: "labels",
                                        mutation: () => ({ active: true })
                                    }),
                                    onMouseOut: () => ({
                                        target: "labels",
                                        mutation: () => ({ active: false })
                                    })
                                }
                            }]}
                        />
                    </div>

                    <div className='flex justify-between w-full mt-4 text-xs'>
                        <div className='text-center'>
                            <div className='w-3 h-3 bg-green-500 rounded-full mx-auto mb-1'></div>
                            <div className='font-semibold'>Income</div>
                            <div>${totalIncomeTurnover.toFixed(2)}</div>
                            <div className='text-green-600'>{totalIncomeTurnoverPercent.toFixed(0)}%</div>
                        </div>
                        <div className='text-center'>
                            <div className='w-3 h-3 bg-red-500 rounded-full mx-auto mb-1'></div>
                            <div className='font-semibold'>Expense</div>
                            <div>${totalExpenseTurnover.toFixed(2)}</div>
                            <div className='text-red-600'>{totalExpenseTurnoverPercent.toFixed(0)}%</div>
                        </div>
                    </div>
                </div> */}



                

            </div>

            <ConfirmModal
                open={deleteModalOpen}
                Type={selectedTransaction?.type}
                Amount={selectedTransaction?.amount}

                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    removeTransaction(selectedTransaction._id);
                    setDeleteModalOpen(false);
                }}
            />

        </section>
    );
};



// You can put this at the bottom of your Services.jsx file or in a separate file
const ConfirmModal = ({ open, onClose, onConfirm, Type, Amount }) => {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
        >

            <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
                {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
                <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-[#0ea5e9]">{Type}</span>
                , Amount <span className ='text-md font-semibold text-[#be3e3f]'>{Amount.toFixed(2)} </span>
                 <span className ='text-xs font-normal'>AED</span>?</p>
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


export default Transactions


