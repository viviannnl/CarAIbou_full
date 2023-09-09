import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import {register, reset} from '../features/auth/authSlice'


function Register() {
    var [formData, setFormData] = useState({
        name: '',
        email: '',
        location: '',
        password: '',
        password2: '',
    })

    var {name, email, location, password, password2} = formData

    const dispatch = useDispatch()
    const {user, isLoading, isSuccess, isRejected, message} = useSelector(
        (state) => state.auth
    )
    
    const onChange = (e) => {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }))
        }

    const onSubmit = (e) => {
        e.preventDefault()

        // construct the user object and dispatch it
        if (password !== password2) {
            toast.error('Unmatched password')
        } else {
            const userData = {
                name,
                email,
                password,
                location
            }
            //console.log(userData ? userData : 'No user data')
            dispatch(register(userData))
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (isRejected) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate('/')
            dispatch(reset())
        }
    }, [isSuccess, isRejected, message, navigate, dispatch])
    


    return (<>
        <section className='heading'>
            <h1>
                <FaUser /> Register
            </h1>
            <p>
                Create an account and get started
            </p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type='text' 
                        className='form-control' 
                        id='name' 
                        name='name' 
                        value={name} 
                        placeholder='Enter your name' 
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type='text' 
                        className='form-control' 
                        id='email' 
                        name='email' 
                        value={email} 
                        placeholder='Enter your email' 
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type='text' 
                        className='form-control' 
                        id='location' 
                        name='location' 
                        value={location} 
                        placeholder='Enter your location' 
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type='password' 
                        className='form-control' 
                        id='password' 
                        name='password' 
                        value={password} 
                        placeholder='Enter your password' 
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type='password' 
                        className='form-control' 
                        id='password2' 
                        name='password2' 
                        value={password2} 
                        placeholder='Confirm password' 
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>)
}

export default Register