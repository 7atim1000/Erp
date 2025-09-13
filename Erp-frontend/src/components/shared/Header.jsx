import React, {useState} from 'react'
import { GiPerpendicularRings } from "react-icons/gi";
import { FcSearch } from "react-icons/fc";

import { useSelector } from 'react-redux'
import { FaClockRotateLeft } from "react-icons/fa6";

import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'

import AttendanceModal from '../header/AttendanceModal';

//<IoIosLogOut />


const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const attendanceBtn = [{icon : <FaClockRotateLeft className ='h-6 w-6'/> ,action :'attendance' }];

    const [isAttendanceModal, setIsAttendanceModal] = useState(false);

    const handleAttendanceModal = (action) => {
        if (action === 'attendance') setIsAttendanceModal(true);
    };

    const userData = useSelector(state => state.user);
    console.log("userData", userData);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <header className ='flex justify-between items-center py-2 px-8 bg-linear-65 from-[#f5f5f5] to-white
        border-b border-yellow-700 shadow-lg/30'>
            
            <div className ='flex items-center justify-content gap-2'>
                <GiPerpendicularRings className ='h-10 w-10 text-yellow-700'/>
                <h1 className ='text-md font-semibold text-yellow-700'>ERP</h1>
            </div>

            {/* <div className ='flex items-center gap-4 bg-transparent px-5 py-1 w-[500px] rounded-[15px]'>
                <FcSearch size={25}/>
               <input 
                   type ='text'
                   placeholder ='Search'
                   className ='bg-transparent text-[#1a1a1a] w-[500px] border-b-1 border-amber-900'
                   
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                />
            </div> */}


            <div className ='flex items-center gap-4'>
                <div className ='flex flex-col items-center justify-between gap-1'>
                    {attendanceBtn.map(({ label, icon, action }) => {
                        return (
                            
                            <button
                                onClick={() => handleAttendanceModal(action)}
                                className='cursor-pointer text-green-600 
                                px-2  rounded-lg font-semibold text-sm flex items-center gap-2'>
                                {label} {icon}
                            </button>
                        )
                    })}

                    <p className ='text-xs text-zinc-500'>Attendance And Departure</p>
                </div>
                
                <div className ='flex items-center gap-3'>
                        {/* <FaCircleUser className ='text-yellow-700 h-10 w-10' size={30}/> */}
                        <img className ='h-10 w-10 rounded-full cursor-pointer border-b-3 border-amber-900' src ={userData.image}
                          onClick = {()=> navigate('/profile')}
                        />
        
                    <div className ='flex flex-col item-start'>
                    
                        <h1 className='text-xs text-black font-semibold cursor-pointer'
                            onClick={() => navigate('/profile')}
                        >{userData.name || 'Username'}
                        </h1>

                        <p className='text-xs text-zinc-500 cursor-pointer'
                            onClick={() => navigate('/profile')}
                        >{userData.role || 'Role'}
                        </p>
                    </div>

                </div>

                {isAttendanceModal && <AttendanceModal setIsAttendanceModal={setIsAttendanceModal} />} 

            </div>


        </header>



              
    );
};


export default Header;