import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {submitHabits, resetHabits} from '../features/habits/habitsSlice'
import Spinner from '../components/Spinner'

function Habits() {
    
    const { user } = useSelector((state) => state.auth)
    const name = user.name
    //const token = JSON.parse(user).token
    

    //console.log(token)
    /*
    const { user } = localStorage.getItem('user')
    const name = user.name
    const token = user.token
    
    */

    var [formData, setFormData] = useState({
        car_day: '0',
        carpool_day: '0',
        public_day: '0',
        walk_day: '0'
    })

    var {car_day, carpool_day, public_day, walk_day} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        })) 
    }

    const dispatch = useDispatch()
    const {habits, isLoading, isRejected, isSuccess, message} = useSelector((state) => (state.habits))


    const onSubmit = (e) => {
        e.preventDefault()

        const habitsData = {
            car: car_day,
            carpool: carpool_day,
            public: public_day,
            walk: walk_day
        }

        console.log(habitsData)
        dispatch(submitHabits(habitsData))

    }

    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            navigate('/goals')
        }
    }, [isSuccess, navigate])

    if (isLoading) {
        <Spinner />
    }

    return (<div className='content'>
        <h1>Hi {name},</h1>
        <h2>Please tell us your transport habits</h2>
        <p>Please type in your number of days going to work by car, carpooling, public transport and walking</p>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type='number' 
                        min = '0'
                        className='form-control' 
                        id='car_day' 
                        name='car_day' 
                        value={car_day} 
                        placeholder='Type your answer here' 
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type='number' 
                        min = '0'
                        className='form-control' 
                        id='carpool_day' 
                        name='carpool_day' 
                        value={carpool_day} 
                        placeholder='Type your answer here' 
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type='number' 
                        min = '0'
                        className='form-control' 
                        id='public_day' 
                        name='public_day' 
                        value={public_day} 
                        placeholder='Type your answer here' 
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type='number' 
                        min = '0'
                        className='form-control' 
                        id='walk_day' 
                        name='walk_day' 
                        value={walk_day} 
                        placeholder='Type your answer here' 
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button type='submit'>
                        Next
                    </button>
                </div>
            </form>
        </section>
        

    </div>
    
    )
}

export default Habits