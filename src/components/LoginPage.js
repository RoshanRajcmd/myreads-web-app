import React from 'react';
import { Login } from './Login';
import { Register } from './Register';
import { BooksList } from './BooksList';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

export function LoginPage() {

    return (
        <>
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<><Login /> <Register /></>}
                    />
                    <Route
                        exact
                        path="/BooksList"
                        element={<BooksList />}
                    />
                </Routes>
            </Router>
        </>
    )
}