import { SessionService } from '../api/SessionService';
import { Navigate } from 'react-router-dom';

//When using the child component this private route it checks for user session
export function PrivateRoute({ children }) {
    return SessionService.getInstance().getSessionUserID() !== "" ? children : <Navigate to="/myreads/login" />;
}