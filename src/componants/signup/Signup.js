import apiService from "../../helper/apiService";
import { useNavigate } from "react-router-dom";
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();

    const send = async (event) => {
        let form = event.target
        event.preventDefault();
        let data = {
            fname: form.fname.value,
            lname: form.lname.value,
            uname: form.uname.value,
            pwd: form.pwd.value,
            email: form.email.value
        }

        try {
            let response = await apiService.post('signup', data)
            console.log(response.data)
            navigate('/login',{replace:true})

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="form">
        <form onSubmit={send}>
            <label for="email">Email</label>
            <input type="text" id="email" name="email" placeholder="Email.." required />
            <label for="fname">First Name</label>
            <input type="text" id="fname" name="firstname" placeholder="Your name.." required />
            <label for="lname">Last Name</label>
            <input type="text" id="lname" name="lastname" placeholder="Your last name.." required />
            <label for="uname">User Name</label>
            <input type="text" id="uname" name="uname" placeholder="Your user name.." required />
            <label for="pwd">Password</label>
            <input type="password" id="pwd" name="pwd" placeholder="Password" required />
            <input type="submit" value="Submit" />
            <a href="" onClick={()=>navigate('/login',{replace:true})}>already have account?..login</a>
        </form>
        </div>
    )
}

export default Signup