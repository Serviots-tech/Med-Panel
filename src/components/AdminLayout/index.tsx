/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PermissionContext } from '../AuthLayout';

// import { Outlet } from "react-router-dom";


export const AdminLayout = () => {

	const context = useContext(PermissionContext);
	const navigate = useNavigate();
	if (context.userRole !== "ADMIN") {
		navigate('/')
	}


	return (
		<Outlet />
	);
};



