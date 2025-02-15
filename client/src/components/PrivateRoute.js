import { SessionService } from '../api/SessionService';
import { Navigate } from 'react-router-dom';

//When using the child component this private route it checks for user session
export function PrivateRoute({ children }) {
    var userSession = SessionService.getInstance();
    if (userSession !== undefined && userSession.getSessionUserID() !== undefined && userSession.getSessionUserID() !== "")
        return children;
    else
        return <Navigate to="/myreads/login" />;
}