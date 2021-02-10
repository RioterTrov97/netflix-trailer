import React, { useRef, useState } from 'react';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import './LoginScreen.css';

function LoginScreen() {
	const [signIn, setSignIn] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const emailRef = useRef(null);

	const signUpScreen = () => {
		setIsSignUp(true);
		setSignIn(true);
	};

	const signInScreen = () => {
		setIsSignUp(false);
		setSignIn(true);
	};

	return (
		<div className="loginScreen">
			<div className="loginScreen__background">
				<img
					className="loginScreen__logo"
					src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
					alt=""
				/>
				<button
					className="loginScreen__button"
					onClick={() => signInScreen()}>
					Sign In
				</button>
				<div className="loginScreen__gradient" />
			</div>
			<div className="loginScreen__body">
				{signIn ? (
					<SignUpScreen
						email={emailRef.current.value}
						isSignUp={isSignUp}
					/>
				) : (
					<>
						<h1>Unlimited films, TV programmes and more.</h1>
						<h2>Watch anywhere and cancel at any time</h2>
						<h3>
							Ready to watch? Enter your email to create or
							restart your membership.
						</h3>
						<div className="loginScreen__input">
							<form>
								<input
									ref={emailRef}
									type="email"
									placeholder="Email Address"
								/>
								<button
									className="loginScreen__getStarted"
									onClick={() => signUpScreen()}>
									Get Started
								</button>
							</form>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default LoginScreen;
