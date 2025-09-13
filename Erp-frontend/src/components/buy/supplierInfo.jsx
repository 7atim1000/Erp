import React, {useState} from 'react'
import { formatDate, getAvatarName } from '../../utils';
import { useSelector } from 'react-redux';

const SupplierInfo = () => {
    const supplierData = useSelector(state => state.supplier);
    const userData = useSelector(state => state.user);

    const [dateTime, setDateTime] = useState(new Date());
    
    return (
        
        <div className ='flex bg-white items-center justify-between px-2 py-1 shadow-xl'>
            {/*customer Info */}
            <div className ='flex flex-col items-start'>
                <h1 className ='text-sm text-yellow-700 font-semibold mb-2'>{supplierData.supplierName || 'Impoprter name'}</h1>
                <p className ='text-[#1a1a1a] text-xs font-normal'>#{supplierData.buyId || 'NA'}</p>
                <p className ='text-[#1a1a1a] text-xs font-normal'>{formatDate(dateTime)}</p>
                <p className='text-[#1a1a1a] text-xs font-semibold mt-2'>
                    By : <span className='text-yellow-700'>{userData.name || 'User Name'} / </span>
                    <span className='font-normal'>{userData.role}</span>
                </p>
            </div>
            <button className='bg-[#f5f5f5] shadow-xl/40 text-yellow-700 rounded-full p-3 h-10 mt-2 text-xs font-semibold'>
                {getAvatarName(supplierData.supplierName || 'Supplier Name')}
            </button>   
        </div>

    );
};



export default SupplierInfo;