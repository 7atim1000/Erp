import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import BackButton from '../components/shared/BackButton';
import { useSelector } from 'react-redux';
import { CiEdit } from "react-icons/ci";
import { getAvatarName, getBgColor } from '../utils';
import BottomNav from '../components/shared/BottomNav';
import ProfileEditModal from '../components/hr/ProfileEditModal';

const Profile = () => {
    const navigate = useNavigate();
    const userData = useSelector(state => state.user);
    
    // update
    const Button = [
        { label: 'Edit profile', icon: <CiEdit className='text-sky-600' size={20} />, action: 'profile' }
    ];

    const [isEditProfileModal, setIsEditProfileModal] = useState(false);
    const [currentProfile, setCurrentProfile] = useState(null);

    const handleEdit = (user) => {
        setCurrentProfile(user);
        setIsEditProfileModal(true);
    };
 

    // annual leave
    const annualButton = [
        { label: 'Annual leave',  action: 'annual' }
    ];

 
    const handleOpenAnnualLeave = (action) => {
        if (action === 'annual') navigate('/myannualleave')
    }

    // sick leave
    const sickButton = [
        { label: 'Sick leave',  action: 'sick' }
    ];

    const handleOpenSickLeave = (action) => {
        if (action === 'sick') navigate('/mysickleave')
    }

    // map
    const mapButton = [
        { label: 'Company map',  action: 'map' }
    ];

    const handleOpenMap = (action) => {
        if (action === 'map') navigate('/map')
    }

    // activities
    const actButton = [
        { label: 'Activity log',  action: 'activity' }
    ];

    const handleOpenActivities = (action) => {
        if (action === 'activity') navigate('/map')
    }



    return (
        <section className='h-[calc(100vh)] overflow-y-scroll scrollbar-hidden flex gap-2 bg-[#f5f5f5]'>
            <div className='flex-[5] bg-white shadow-lg rounded-lg pt-0 '>
                
                <div className='flex items-center justify-between px-4 py-3 shadow-xl'>
                    
               
                    <div className='flex justify-start flex-wrap gap-3 items-center cursor-pointer'>
                        <img src={userData.image} className='h-22 w-22 rounded-full  border-b-3 border-yellow-700' />
                       
                        <div className='flex flex-col gap-1 mt-5 '>

                            <h1 className='text-black text-sm font-bold tracking-wide'>
                                {userData.name}
                            </h1>
                            <p className='text-black text-xs font-normal tracking-wide text-sky-600'>
                                {userData.department}
                            </p>
                            <p className='text-black text-xs font-normal tracking-wide text-sky-600'>
                                {userData.userJob}
                            </p>

                        </div>
                        <BackButton />
                        </div>


                        <div className ='flex justify-end'>
                            
                            <div className='flex items-center justify-end gap-3'>
                                
                                {Button.map(({ label, icon, action }) => {
                                    return (
                                        <button
                                            onClick={() => handleEdit(userData)}
                                            className='shadow-lg/30 cursor-pointer bg-white  text-[#1a1a1a] 
                                            px-5 py-2 rounded-sm font-semibold text-sm flex items-center gap-2'>
                                            {label} {icon}
                                        </button>
                                    )
                                })}

                                 
                            </div>

                        </div>
                </div>

                {/* end header */}
                <div className ='py-2 px-10 flex flex-col gap-2 mt-5 shadow-xl'>
                    <h1 className ='text-sky-600'>Basic Information :</h1>
                    <div className='flex items-center gap-2 text-xs px-5'>
                        <p>Email :</p>
                        <p>{userData.email}</p>
                    </div>
                    <div className='flex items-center gap-2 text-xs px-5'>
                        <p>Name :</p>
                        <p>{userData.name}</p>
                    </div>
                    <div className='flex items-center gap-2 text-xs px-5'>
                        <p>Contact No :</p>
                        <p>{userData.phone}</p>
                    </div>
                        <div className='flex items-center gap-2 text-xs px-5'>
                        <p>Permissions :</p>
                        <p>{userData.role}</p>
                    </div>

                </div>

                <div className='py-2 px-10 flex flex-col gap-2 mt-5 shadow-xl'>
                    <h1 className='text-sky-600'>Job Information :</h1>
                    <div className='flex items-center gap-2 text-xs px-5'>
                        <p>Job number :</p>
                        <p>{userData.employeeNo}</p>
                    </div>
                    <div className='flex items-center gap-2 text-xs px-5'>
                        <p>Job name :</p>
                        <p>{userData.userJob}</p>
                    </div>
                    <div className='flex items-center gap-2 text-xs px-5'>
                        <p>Job date :</p>
                        <p>{userData.jobDate}</p>
                    </div>
                    <div className='flex items-center gap-2 text-xs px-5'>
                        <p>Department :</p>
                        <p>{userData.department}</p>
                    </div>

                </div>

            </div>

            <div className ='flex-[1] '>
               

                <div className='flex w-full items-center justify-between gap-3 mt-2'>
                    {mapButton.map(({ label, icon, action }) => {
                        return (

                            <button

                                onClick={() => handleOpenMap(action)}
                                className='shadow-lg/30 flex items-center justify-center cursor-pointer bg-white text-[#1a1a1a] w-full 
                                px-5 py-2 rounded-lg font-semibold text-xs flex items-center gap-2'
                            >
                                {label} {icon}

                                <button className='rounded-full p-3 text-white flex items-center justify-end'
                                    style={{ backgroundColor: getBgColor() }}
                                >
                                    {getAvatarName(label)}
                                </button>

                            </button>

                        )
                    })}
                </div>


                <div className='flex w-full items-center justify-between gap-3 mt-2'>
                    {annualButton.map(({ label, icon, action }) => {
                        return (
                            <button
                                onClick={() => handleOpenAnnualLeave(action)}
                                className ='shadow-lg/30 flex items-center justify-center cursor-pointer bg-white text-[#1a1a1a] w-full 
                                px-5 py-2 rounded-lg font-semibold text-xs flex items-center gap-2'
                                >
                                {label} {icon}

                                <button  className ='rounded-full p-3 text-white flex items-center justify-end'
                                style ={{ backgroundColor: getBgColor() }}    
                                >
                                        {getAvatarName(label)}
                                </button>
                            </button>
                            
                        )
                    })}
                </div>

                <div className='flex w-full items-center justify-between gap-3 mt-2'>
                    {sickButton.map(({ label, icon, action }) => {
                        return (
                             
                            <button
                            
                                onClick={() => handleOpenSickLeave(action)}
                                className='shadow-lg/30 flex items-center justify-center cursor-pointer bg-white text-[#1a1a1a] w-full 
                                px-5 py-2 rounded-lg font-semibold text-xs flex items-center gap-2'
                            >
                                {label} {icon}

                               <button className='rounded-full p-3 text-white flex items-center justify-end'
                                    style={{ backgroundColor: getBgColor() }}
                                >
                                    {getAvatarName(label)}
                                </button>
                                
                            </button>

                        )
                    })}
                </div>

                <div className='flex w-full items-center justify-between gap-3 mt-2'>
                    {actButton.map(({ label, icon, action }) => {
                        return (
                             
                            <button
                            
                                // onClick={() => handleOpenSickLeave(action)}
                                className='shadow-lg/30 flex items-center justify-center cursor-pointer bg-white text-[#1a1a1a] w-full 
                                px-5 py-2 rounded-lg font-semibold text-xs flex items-center gap-2'
                            >
                                {label} {icon}

                               <button className='rounded-full p-3 text-white flex items-center justify-end'
                                    style={{ backgroundColor: getBgColor() }}
                                >
                                    {getAvatarName(label)}
                                </button>
                                
                            </button>

                        )
                    })}
                </div>

             

                {/* Edit Employee Modal */}
                {isEditProfileModal && currentProfile && (
                    <ProfileEditModal
                        user ={currentProfile}
                        setIsEditProfileModal={setIsEditProfileModal}
                        userData={userData}
                    />
                )}


            </div>
            <BottomNav />
        </section>
    );
};



export default Profile;