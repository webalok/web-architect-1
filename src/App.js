import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './AdminPages/Login';
import Dashboard from './AdminPages/Dashboard';

function App() {
	const [isUserLogin, setisUserLogin] = useState(false);
	if (isUserLogin) {
		return <Login />
	}

	return (
		<>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/dashboard" element={<Dashboard />} />
					{/* <Route path="/profile/:username" element={<Profile />} />
					<Route path="*" element={<NotFound />} /> */}
				</Routes>
		</>
	);
}

const Homepage = () => {
	return (
		<div>
				<h1>Homepage </h1>
				<Link to='/dashboard'>Go to Aboutpage</Link>
		</div>
	)
};


export default App;
