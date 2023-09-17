import {useDispatch, useSelector} from 'react-redux'
import {getGoals} from '../features/goals/goalsSlice'
import {getHabits} from '../features/habits/habitsSlice'
import { useNavigate } from "react-router-dom";


function Landing() {

    const { user } = useSelector((state) => state.auth)
    let name;

    if (user) {
        name = user.name
    }
    
    //console.log(user.name)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const ghg_before = 605.12
    let ghg_after
    /*
    if (user) {
        if (habits.length = 0) {
        dispatch(getGoals())
        dispatch(getHabits())
    } else {
        
    }}
    */
    /*
    dispatch(getGoals())
    dispatch(getHabits())
    */

    const {habits} = useSelector((state) => state.habits)
    const {goals} = useSelector((state) => state.goals)

    if (habits) {
        const ghg_car = 21.63

        const car_habit = habits.car + habits.carpool
        //console.log(goals[0].car_goal)
        const car_goal = goals.car_goal + goals.carpool_goal
        const ratio = 1 - car_goal/car_habit
        ghg_after = ghg_before - ratio * ghg_car

    }

    return (<div className="content">

        <h1 className='heading'>Welcome {name} to CarAIbou</h1>
        <div className='projection'>
            <p>By 2028, if we do not take actions, the Green House Gas emissinos in Canada would be</p>
            <h1>{ghg_before}</h1>  
            <p>million metric tons</p>
        </div>
        {user ? (<div>{habits ? (<>
            
            <div className='projection'>
                <p>By 2028, if everyone takes the same actions as you do, the Green House Gas emissinos in Canada would be</p>
                <h1>{ghg_after}</h1>
                <p>million metric tons</p>
            </div>
        </>) : (<div>
                <p>You have not tell us your transport habits and goals</p>
                <button onClick={() => (navigate('/habits'))}>Set transport habits and goals</button>
            </div>)}</div>) : (<p>Please login or register first</p>)}
        

    </div>
    
    )
}

export default Landing