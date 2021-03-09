import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import { useState } from 'react';
import LoadingScreen from './LoadingScreen';

function App() {
	const user = useSelector(selectUser);
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		setLoading(true);
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				setLoading(false);
				dispatch(login({ uid: userAuth.uid, email: userAuth.email }));
			} else {
				setLoading(false);
				dispatch(logout());
			}
		});

		return unsubscribe;
	}, [dispatch]);

	return (
		<div className="app">
			<Router>
				{!user ? (
					loading ? (
						<LoadingScreen />
					) : (
						<LoginScreen />
					)
				) : (
					<Switch>
						<Route path="/profile">
							<ProfileScreen />
						</Route>
						<Route exact path="/">
							<HomeScreen />
						</Route>
					</Switch>
				)}
			</Router>
		</div>
	);
}

export default App;
