import React, { useState } from 'react'
import { addIncome } from '../../https';
import { motion } from 'framer-motion'

import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { IoCloseCircle } from 'react-icons/io5';

const ExpenseAdd = ({setIsIncomeModalOpen}) => {

    const [formData, setFormData] = useState({
        incomeName :""
    });
        
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name] : value}));
    };

        
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)

        IncomeMutation.mutate(formData)
        window.location.reload()
        setIsIncomeModalOpen(false)
    }

    const IncomeMutation = useMutation({
        mutationFn: (reqData) => addIncome(reqData),
            
        onSuccess: (res) => {
             
            const { data } = res;
            //console.log(data)
            enqueueSnackbar(data.message, { variant: "success"});
        },
    
        onError: (error) => {
            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error"});
    
            console.log(error);
            },
        });
         
        const handleClose = () => {
            setIsIncomeModalOpen(false)
        };
    

    return (
        <div className ='fixed inset-0 bg-opacity-50 flex items-center justify-center shadow-lg/10 z-50' 
        style={{ backgroundColor:  'rgba(20, 10, 10, 0.4)'}}>
            <motion.div
                initial ={{opacity :0 , scale :0.9}}
                animate ={{opacity :1, scale :1}}
                exit ={{opacity :0, scale :0.9}}
                transition ={{durayion :0.3 , ease: 'easeInOut'}}
                className ='bg-white p-2 rounded-xs shadow-xl w-120 md:mt-0 mt-0'
            >
        
        
            {/*Modal Header */}
            <div className="flex justify-between items-center mb-2 shadow-xl p-2">
                <h2 className ='text-[#1a1a1a] text-md font-medium'>Add Income</h2>
                <button onClick ={handleClose} className ='rounded-xs text-[#be3e3f] hover:bg-[#be3e3f]/30 cursor-pointer
                        border-b border-[#be3e3f]'>
                <IoCloseCircle size={25}/>
                </button>
            </div>
                  
            {/*Modal Body*/}
            <form className ='mt-5 space-y-6' onSubmit ={handleSubmit}>

                <div className ='flex items-center justify-between'>
                    <label className ='w-[30%] text-[#1a1a1a] block mb-2 mt-3 px-4 text-sm font-normal'>Income Name :</label>
                    
                    <div className ='flex w-[70%] items-center justify-between shadow-xl p-3 text-sm rounded-xs'>
                        <input 
                            type ='text'
                            name ='incomeName'
                            value ={formData.incomeName}
                            onChange ={handleInputChange}
                                   
                            placeholder = 'Enter income account name'
                            className ='bg-transparent w-full text-[#1a1a1a] focus:outline-none border-b border-yellow-700'
                            required
                            autoComplete='none'
                        />
                    </div>
                </div>

                <button
                    type='submit'
                    className='p-1 text-xs bg-[#0ea5e9] text-white font-semibold 
                        cursor-pointer w-full mt-5 h-10 rounded-sm'
                    >
                        Save
                </button>
                
                </form>
            </motion.div>
        </div> 

    );
};



export default ExpenseAdd ;