import React from 'react'

const MiniCard = ({title, icon , number, footerNum}) => {
    
    return (
        <div className= 'bg-white py-3 px-5 rounded-lg w-[50%] shadow-lg/30 border-b-3 border-[#e3d1b9]'>
            <div className='flex items-start justify-between'>
                
                <h1 className='text-[#1a1a1a] font-semibold text-xs tracking-wide mt-2'>{title}</h1>
                <button className={` ${title === 'Exchange' ? 'bg-[#0ea5e9] ' : 'bg-green-600' }
                    ${title === 'Sales' ? 'bg-orange-300' : '' }
                    ${title === 'Purchase' ? 'bg-yellow-700' : '' } 
                
                    p-3 rounded-lg text-white text-sm mt-2 shadow-xl`}>{icon}</button>
            </div>
           
            <div>
                <h1 className={`text-lg font-bold mt-2 ${title === 'Exchange' ? 'text-[#0ea5e9]' : 'text-green-600'}`}>
                    <span className ='text-xs font-normal text-[#1a1a1a]'>AED </span>
                {number}</h1>
                
                {/* from Home page :- <MiniCard title='Total Earning' icon={<BsCashCoin />} number={allInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0).toFixed(2)} footerNum={1.6}/>
                <h1 className='text-[#f5f5f5] text-l mt-2'><span className='text-[#02ca3a] text-sm'>{footerNum}%</span> than yesterday</h1> */}
            </div>
        </div>
    )
};

export default MiniCard;