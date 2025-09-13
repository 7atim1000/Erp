import React, {useRef, useEffect} from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../../redux/slices/saleSlice'

const CartInfo = () => {
    // adding Item
    const saleData = useSelector(state => state.sale);

    // Sort saleData in descending order (newest first)
    
    const sortedSaleData = [...saleData].sort((a, b) => {
        // Sort by timestamp if available, otherwise by ID or another unique identifier
        if (a.timestamp && b.timestamp) {
            return new Date(b.timestamp) - new Date(a.timestamp);
        }
        // Fallback: sort by ID in descending order
        return b.id - a.id;
    });
    
    // scrollbar
    const scrolLRef = useRef();
        useEffect(() => {
            if(scrolLRef.current) {
                scrolLRef.current.scrollTo({
                top :scrolLRef.current.scrollHeight,
                behavior :'smooth'
                })
            }
        }, [saleData]);

    
    // to remove item
    const dispatch = useDispatch(); 
    
    const handleRemove = (itemId) => {
        dispatch(removeItem(itemId))
    }
    
    
    

    return (
        <div className ='px-4 py-1 shadow-lg/30 bg-white'>
            <h1 className ='text-xs text-[#0ea5e9] font-semibold'>Invoice Details : </h1>
            
                <div className ='mt-1 overflow-y-scroll scrollbar-hidden h-[469px]' ref ={scrolLRef}>
                    {sortedSaleData.length === 0 
                    ? (<p className ='text-xs text-[#be3e3f] flex justify-center'>Your cart is empty . Start adding items !</p>) 
                    : sortedSaleData.map((item) => {
                                    
                        return (
                            <div className ='bg-[#f5f5f5] border-t border-white rounded-sm px-2 py-1 mb-1 
                            shadow-lg/30'>
                                    
                                <div className ='flex items-center justify-between'>
                                    <h1 className ='text-xs font-semibold text-[#1a1a1a]'>{item.name}</h1>
                                    <p >
                                    <span className ='text-xs font-semibold text-[#0ea5e9]'> {item.pricePerQuantity}</span>
                                    <span className ='text-xs'> x</span>
                                    <span className ='text-xs font-semibold text-[#0ea5e9]'> {item.quantity}</span>
                                    </p>
                                </div>
                                
                                        
                                <div className ='flex items-center justify-between mt-1'>
                                    <MdDeleteForever onClick ={() => handleRemove(item.id)} 
                                        className ='text-[#be3e3f] cursor-pointer border-b bordr-[#be3e3f] hover:bg-[#be3e3f]/30 rounded-sm' size ={20}/>
                                    
                                    <p className ='text-[#1a1a1a]'><span className ='text-xs'>AED </span>
                                    <span className ='text-md text-yellow-700 font-semibold'>{item.price}</span>
                                    </p>
                                </div>
            
                            </div>
                                        
                            )
                        })}
              
                </div>
        </div>
      

    );
}


export default CartInfo ;