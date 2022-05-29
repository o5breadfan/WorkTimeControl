import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.js';
import Login from './components/log-in/Login.jsx';
import WorkingCalendar from './components/working-calendar/WorkingCalendar';
import ListRequests from './components/request/List';
import Statistics from "./components/statistics/Statistics";
import ListUsers from "./components/user/List";
import ListDepartments from "./components/dependent/List";
import EditUser from "./components/user/Edit";
import CreateUser from "./components/user/Create";
import { AuthProvider } from './components/hoc/AuthProvider';
import CreateRequest from './components/request/CreateRequest';
import { RequireAuth } from './components/hoc/RequireAuth';
import PersonalData from "./components/user/PersonalData";
import EditRequest from "./components/request/EditRequest";

export default function App() {
    return (
            <AuthProvider>
                <RequireAuth>
                    <Routes>
                        <Route exact path='/' element={<Login />} />
                        <Route path='/' element={<Layout />}>
                            <Route path='working-calendar' element={<WorkingCalendar />} />
                            <Route path='request/list' element={<ListRequests />} />
                            <Route path='request/create' element={<CreateRequest />} />
                            <Route path='request/:id/edit' element={<EditRequest/>} />
                            <Route path='statistics' element={<Statistics />} />
                            <Route path='user/list' element={<ListUsers />} />
                            <Route path='list/:id/edit' element={<EditUser />} />
                            <Route path='user/create' element={<CreateUser />} />
                            <Route path='department/list' element={<ListDepartments />} />
                            <Route path='personal-data' element={<PersonalData /> } />
                        </Route>
                    </Routes>
                </RequireAuth>
            </AuthProvider>
    );
}
