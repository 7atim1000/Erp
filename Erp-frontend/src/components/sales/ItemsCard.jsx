import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { addItems } from '../../redux/slices/saleSlice';
import { updateService } from '../../redux/slices/customerSlice';
import { BsFillCartCheckFill } from "react-icons/bs";

import { toast } from 'react-toastify'


const ItemsCard = ({id, name, price, qty, unit, cat}) => {

    const [qntCount, setQntCount] = useState(0);
    const [itemId, setItemId] = useState();             
            
        const increment = (id) => {                        
            setItemId(id);                                  
            setQntCount((prev) => prev + 1)
        }
        const decrement = (id) => {
            setItemId(id);
            if (qntCount <= 0) return;
            setQntCount((prev) => prev - 1); 
        }



        const dispatch = useDispatch();

        const handleAddToCard = (item) => {
           
           
            if (qntCount === 0) {
                toast.warning('Please specify the required quantity.');
                return;
            }

            if (qty < 0) {
                toast.error('Sorry item does not have balance');
                return;

            }
            if (qty < qntCount) {
                toast.error('Sorry the balance is not enough the procedure.');
                return;

            }
        
            if (qntCount > 0  && qntCount <= qty) {
            
            const { name, price } = item;
            //slice item  for sale send ID versioal ID
            const service = {serviceId: id}  
            // editing service or ItemId from this method to itemId = id means id from {id, name, price, qty, unit, cat}

            //const newObj = { id: new Date(), name, pricePerQuantity :price, quantity :qntCount, price :price * qntCount };
            const newObj = { id: id, name, pricePerQuantity :price, quantity :qntCount, price :price * qntCount };
            
            // send data to saleInfo
            // store data in sale Slice
            dispatch(addItems(newObj));

            // slice item
            dispatch(updateService({service}))
        
            setQntCount(0);
        }
    }

    return (

        <div className ='flex flex-col  flex-wrap justify-around gap-1 p-2 rounded-lg h-[185px] cursor-pointer bg-zinc-100  hover:bg-white shadow-lg/30 mt-0' >
           
            <div className ='flex justify-between items-center flex-wrap mb-0'>
                                                          
                <div className ='flex flex-col gap-0 mb-0'>
                    <h1 className ='text-sm font-semibold text-sky-600 flex justify-start items-start'>{name}</h1>
                    <p className ={`${qty === 0 ? "text-red-600" : "text-green-600"} text-md font-semibold`}><span className ='text-xs text-black font-normal'>Available : </span>{qty}<span className ='text-xs text-black font-normal'> {unit}</span></p>
                    <p className ='text-xs underline text-green-600 mt-2'>{cat}</p>
                </div>
                   
                <div className ='mt-0'>
                    <button disabled={qty === 0} onClick ={() =>  handleAddToCard({id, name, price, qty, unit, cat})}
                        className ='cursor-pointer mt-0'>
                        <BsFillCartCheckFill  className ='text-green-600 rounded-lg flex justify-end items-end' size={35}/>
                    </button>
                </div>
                                                       
            </div>

            <div className ='flex items-center justify-between px-0 w-full '>
       
             <p className ='text-md font-semibold text-red-600'><span className ='text-xs text-black font-normal'>Price : </span>{price.toFixed(2)}<span className ='text-xs text-black font-normal'> AED</span></p>
                                       
                    <div className ='flex gap-3 items-center  justify-between bg-white shadow-lg/50 px-4 py-3 rounded-lg mr-0'>
                        <button
                            onClick ={()=>  decrement(id)}
                            className ='text-red-500 text-lg  cursor-pointer'
                        >
                            &minus;
                        </button>

                        <span className ={`${qntCount > 9 ? "text-lg" : "text-5xl"} text-sky-500 flex flex-wrap gap-2  font-semibold`}>{id === itemId ? qntCount : "0"}</span>
                           
                        <button
                            disabled={qty === 0}
                            onClick ={()=> increment(id)}
                            className ='text-blue-600 text-lg cursor-pointer'
                        >
                            &#43;
                        </button>
                    </div>
            </div>

        </div>

      
        
    );
        
}


export default ItemsCard ;