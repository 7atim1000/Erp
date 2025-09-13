import React, { useState } from 'react'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getBgColor } from '../../utils';
import { GrRadialSelected } from 'react-icons/gr';

import { getCategories, getServices } from '../../https';
import BuyItemsCard from './BuyItemsCard';

const BuyMenuContainer = () => {
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
    console.log(responseData); 

    
    // get Sevices
    const { data: resData, isError} = useQuery({
    queryKey :['services'],
    
    queryFn : async () => {
        return await getServices();
    },
        placeholderData: keepPreviousData,
    });
    if(isError) {
        enqueueSnackbar('Something went wrong!', { variant: 'error' })
    }
    
    console.log(resData); 

    // select items from categories
    const [selectedCategory, setSelectedCategory] = useState(`Housewares`)  // to select items from category Dynamic
        
    
    
    return (
        <>
            <div className ='grid grid-cols-5 gap-4 px-10 py-4 mt-0 w-[100%] bg-white rounded-lg shadow-xl'>
            {/* {categories.map(category => (  */}
            {responseData?.data.data.map(category => ( 
                <div key={category.categoryName} className ='flex flex-col items-center justify-between p-4 rounded-lg h-[70px] cursor-pointer shadow-lg/30'
                    style = {{backgroundColor : getBgColor()}}

                    // selected Item
                    onClick = {() => setSelectedCategory(category.categoryName)}
                >
                        
                    <div className ='flex items-center justify-between w-full shadow-lg/30'>
                   
                        <h1 className ='text-md font-semibold text-white'>{category.categoryName}</h1>
                        {selectedCategory === category.categoryName && <GrRadialSelected className  ='text-white' size={20}/>}
                   
                    </div>
        
                </div>
                   
            ))} 
                                   
            </div>    
                    
            <hr className ='border-white border-t-2 mt-2' />

            
                <div className ='grid grid-cols-4 gap-4 px-10 py-4 w-[100%] bg-white rounded-lg overflow-y-scroll scrollbar-hidden  h-[calc(100vh-5rem-15rem)] rounded-lg shadow-xl '>
                    {
                    resData?.data.data.filter(i => i.category === selectedCategory).map((service) => { // Dinamic
                                
                        return (   //flex flex-col items-center justify-between p-4 rounded-lg h-[70px] cursor-pointer
                            <BuyItemsCard id={service._id} name={service.serviceName} price={service.price} qty={service.qty} unit={service.unit} cat={service.category}  />
                            )
                        })
                    }
                </div>
        
        
        
        
        </>
    );
}



export default BuyMenuContainer ;