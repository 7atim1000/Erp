import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../https/index';
import { enqueueSnackbar } from 'notistack'   // for message 
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        email : "", password :"",
    }) 

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const [showPassword, setShowPassword] = useState(false);

    /////////////////////////////////////////////
    // const handleLogin2 = async (credentials) => {
    // const response = await axios.post(backendUrl + '/api/auth/login', credentials);

    //     if (response.data.success) {

    //         dispatch(login({
    //         user: response.data.user,
    //         token: response.data.token,
    //     })
    //     );

    //     // slices
    //     const {_id, name, email, phone, department, userJob, role } = data.data;
        
    //     dispatch(setUser({ _id, name, email, phone, department, userJob, role }));
    //     navigate('/')
    //     // Navigate to intended page if needed
    //     }
    // };
    //////////////////////////////////////////////



    const handleLogin = (e) => {
        e.preventDefault();
        loginMutation.mutate(formData);
    }

    // backend connection
     const loginMutation = useMutation({
        mutationFn : (reqData) => login(reqData),
        
        onSuccess: (res) => {
            const { data } = res;
            console.log(data);
            
          
      
            // localStorage.setItem('token', data.accessToken);

            // //set the token as a cookie in frontend
            // document.cookie = `accessToken=${data.accessToken}; path=/;`;

            
            // slices
            // const {_id, name, email, phone, role, department, userJob } = data.data;
            // dispatch(setUser({ _id, name, email, phone, role, department, userJob }));
           

            // // After successful login
            // console.log("Login response:", response.data);
            
            // dispatch(setUser(response.data.data)); 
            // This is enough, as data.data contains all fields


            dispatch(setUser(data.data));

            navigate('/')

        },
        onError: (error) => {
            //console.log(error);
            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error"})
        }
    })


    return (

        <div className ='bg-white shadow-lg rounded-lg p-1'>

            <form onSubmit={handleLogin}>
            {/* <form onSubmit={(e) => { e.preventDefault(); handleLogin(formData); }}> */}
             
                 
                <div>
                    <label className ='text-[#1f1f1f] block mb-2 mt-3 text-sm font-medium'>Email :</label>
                
                    <div className ='flex items-center rounded-sm p-3 bg-white shadow-xl'>
                        <input 
                            type ='email'
                            name ='email'
                            value ={formData.email}
                            onChange ={handleChange}
                            placeholder = 'Enter employee email'
                            className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none text-sm font-semibold border-b border-yellow-700'
                            required
                            autoComplete='none'
                        />
                    </div>
                </div>


                <div>
                    <label className ='text-[#1f1f1f] block mb-2 mt-3 text-sm font-medium'>Password :</label>
                
                    <div className ='flex items-center rounded-sm p-3 bg-white shadow-xl'>
                        <input 
                            type={showPassword ? "text" : "password"}
                            name ='password'
                            value ={formData.password}
                            onChange ={handleChange}
                            placeholder = 'Enter password'
                            className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none text-sm font-semibold border-b border-yellow-700'
                            style={{
                                paddingRight: '40px',
                                width: '100%',
                                padding: '8px',
                            }}
                            required
                            autoComplete='none'
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '25px',
                                top: '50%',
                                transform: 'translateY(-10%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#666'
                            }}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                </div>

                <button type ='submit' className ='cursor-pointer  w-full rounded-sm mt-6 py-3 text-md text-[#f5f5f5] 
                bg-yellow-700  font-semibold'>Sign in</button>

            </form>

        </div>
    );
};


export default Login;


// But: Using the Authorization header is more secure and common for APIs.
// Recommended:

// Update your backend middleware to read the token from the Authorization header (as shown in previous answers).
// This is more secure for SPAs and avoids CSRF issues.



// 1. Axios Does Not Send Cookies by Default for Cross-Origin Requests
// If your frontend and backend are on different ports (e.g., localhost:5173 and localhost:8080), you must tell Axios to send cookies:



// const response = await axios.post(
//   backendUrl + '/api/auth/login',
//   credentials,
//   { withCredentials: true }
// );