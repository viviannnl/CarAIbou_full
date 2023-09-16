import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, resetAuth} from '../features/auth/authSlice'
import {resetGoals} from '../features/goals/goalsSlice'
import { resetHabits} from '../features/habits/habitsSlice'

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(resetAuth())
        dispatch(resetGoals())
        dispatch(resetHabits())
        navigate('/')
    }

    //console.log(user)

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>CarAIbou</Link>
            </div>
            <ul>
                {user ? (<li>
                    <button onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>) : (<>
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt /> Login
                        </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser /> Register
                        </Link>
                    </li>
                </>)}
                
                
            </ul>
        </header>
    )
}

export default Header