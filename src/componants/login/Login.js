import apiService from "../../helper/apiService";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const Login = ({setAuthenticated}) => {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const send = async (event) => {
        let form = event.target
        event.preventDefault();

        let data = {
            uname: form.uname.value,
            pwd: form.pwd.value
        }

        try {
            let response = await apiService.post('login', data)
            console.log(response.data)
            cookies.set('isloggedin', 'True',{path:"/",maxAge:1209600})
            setAuthenticated(true)
            navigate('/',{replace:true})
        } catch (err) {
            alert(err)
        }
    }

    return (
<div className="form">
        <form onSubmit={send}>
            <label for="uname">User Name</label>
            <input type="text" id="uname" name="uname" placeholder="Your user name.." required />
            <label for="pwd">Password</label>
            <input type="password" id="pwd" name="pwd" placeholder="Password" required />
            <input type="submit" value="Submit" />
            <a href="" onClick={()=>navigate('/signup',{replace:true})}>new user?..signup</a>
        </form>
        </div>
    )
}

export default Login