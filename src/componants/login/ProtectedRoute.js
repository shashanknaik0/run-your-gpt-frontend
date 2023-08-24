import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'universal-cookie';

const ProtectedRoute = ({setAuthenticated}) => {
    const cookies = new Cookies();
    const authenticated = (cookies.get('isloggedin') !== undefined)
    setAuthenticated(authenticated)
    return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;