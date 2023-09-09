import {useSelector} from 'react-redux'


function Landing() {

    const { user } = useSelector((state) => state.auth)
    //const name = JSON.parse(user)["name"]
    //console.log(user.name)

    return (<>

        <h1>Welcome {user && user.name} to CarAIbou</h1>

    </>
    
    )
}

export default Landing