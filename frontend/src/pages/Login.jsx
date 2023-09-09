import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import {login, reset} from '../features/auth/authSlice'

function Login() {
    var [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    var {email, password} = formData
    const onChange = (e) => {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }))
        }
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    var {email, password} = formData
    const {user, isLoading, isSuccess, isRejected, message} = useSelector(
        (state) => state.auth
    )

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

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
                <FaSignInAlt /> Login
            </h1>
            <p>
                Login and view your impact
            </p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
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
                    <button type='submit'>
                        Login
                    </button>
                </div>
            </form>
        </section>
    </>)
}

export default Login