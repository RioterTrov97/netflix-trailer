import React, { useRef, useState } from 'react';
import { auth } from '../../firebase';
import './SignUpScreen.css';

function SignUpScreen({ email, isSignUp }) {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const [signUp, setSignUp] = useState(isSignUp);

	const register = (e) => {
		e.preventDefault();
		setSignUp(true);

		auth.createUserWithEmailAndPassword(
			emailRef.current.value,
			passwordRef.current.value
		)
			.then((authUser) => {
				console.log(authUser);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const signIn = (e) => {
		e.preventDefault();

		auth.signInWithEmailAndPassword(
			emailRef.current.value,
			passwordRef.current.value
		)
			.then((authUser) => {
				console.log(authUser);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const switchSignUp = () => {
		setSignUp(!signUp);
	};

	return (
		<div className="signUpScreen">
			<form>
				<h1>{signUp ? 'SignUp' : 'SignIn'}</h1>
				<input
					ref={emailRef}
					defaultValue={email}
					type="email"
					placeholder="Email"
				/>
				<input
					ref={passwordRef}
					type="password"
					placeholder="Password"
				/>
				<button
					type="submit"
					onClick={signUp ? (e) => register(e) : (e) => signIn(e)}>
					{signUp ? 'SignUp' : 'SignIn'}
				</button>
				<h4>
					<span className="signUpScreen__gray">
						{' '}
						{signUp ? 'Already joined?' : 'New to Netflix?'}
					</span>
					<span
						className="signUpScreen__link"
						onClick={() => switchSignUp()}>
						{' '}
						{signUp ? 'SignIn' : 'Sign Up'}
					</span>
				</h4>
			</form>
		</div>
	);
}

export default SignUpScreen;
