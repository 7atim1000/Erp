import React, { useState } from 'react'

import erp from '../assets/images/erp1.jpg' 
import { GiPerpendicularRings } from "react-icons/gi";
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';

const Auth = () => {

    const [isRegister, setIsRegister] = useState(false);
    // declares a state variable and function to update it

    return (
        <div className ='flex min-h-screen w-full overflow-y-scroll scrollbar-hidden'>

            {/*left section */}
            <div className ='w-1/2 relative flex items-center justify-center bg-cover' >
           
                {/**bg Image */}
                <img className ='w-full h-full object-cover' src={erp} alt='erp Image'/>
                {/*Black overlay */}
                <div className ='absolute inset-0  bg-opacity-80'></div>

                {/*Quote at bottom */}
                <blockquote className= 'absolute bottom-10 px-8 mb-10 text-blue-900 text-lg italic '>
                Serve customers the best services with prompt and friendly service in a 
                welcoming atmosphere, and they'll keep coming back.
                <br />
                <span className ='block mt-4 text-[#1f1f1f] text-md'>- Founder of System</span>

            </blockquote>

            </div>
            


            {/*right section */}
            <div className ='w-1/2 min-h-screen bg-white p-1'>
                <div className ='flex flex-col items-center gap-2'>
                   <GiPerpendicularRings className ='h-14 w-14 rounded-full p-1 text-yellow-700'/>
                   <h1 className ='teext-lg font-semibold text-black'>ERP</h1>
                </div>

                <h2 className ='text-xl text-center mt-5 font-semibold text-black mb-7'>{isRegister ? "Employee Registeration" : "Employee Login"}</h2>

                {/*components */}
                {/* <Register /> <Login />*/}

                {isRegister ? <Register setIsRegister={setIsRegister}/> : <Login />}
            
                
                <div className ='flex justify-center mt-6'>
                    <p className ='text-sm text-[#1a1a1a]'>{isRegister ? "Already have an account ?" : "Don't have a account ? "}</p><p className ='text-[#f5f5f5]'>-</p>
                    <a
                    onClick ={() => setIsRegister(!isRegister)} 
                    href='#'
                    className ='text-green-700 text-sm font-semibold hover:underline hover:text-orange-700'
                    >{isRegister ? "Sign in" : "Sign up"}
                    </a>
                </div>
            </div>



        </div>
    )
}

export default Auth;