import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {submitGoals, getGoals} from '../features/goals/goalsSlice'
import {useNavigate} from 'react-router-dom'
//import sendData from '../features/ml/ml'

function Goals() {

    const { user } = useSelector((state) => state.auth)
    const name = user.name
    //console.log(user.name)

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

    const onSubmit = (e) => {
        e.preventDefault()

        const goalsData = {
            car_goal: car_day,
            carpool_goal: carpool_day,
            public_goal: public_day,
            walk_goal: walk_day
        }

        //console.log(habitsData)
        dispatch(submitGoals(goalsData))

        //dispatch(getGoals())
        //console.log()
    }

    const {goals, isSuccess,} = useSelector((state) => (state.goals))
    const {habits} = useSelector((state) => (state.habits))
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            navigate('/')
            //SendData(habits, goals)
        }
    }, [isSuccess, goals, habits, navigate])


    return (<>
        <h1>Hi {name},</h1>
        <h2>Please tell us how you want to change your habits</h2>

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
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
    
    )
}

export default Goals