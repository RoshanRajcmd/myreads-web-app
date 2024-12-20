import { sessionUser } from '../api/SessionProvider';
import { Navigate } from 'react-router-dom';

//When using the child component this private route it checks for user session
export function PrivateRoute({ children }) {
    console.log(sessionUser.getSessionUserName());
    return sessionUser.getSessionUserName() !== "" ? children : <Navigate to="/myreads/login" />;
}