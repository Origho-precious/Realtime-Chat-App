import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { auth, createUserDocument } from './firebase';
import { setCurrentUser, fetchMessages } from './redux/actions';
import ErrorBoundary from './components/errorBoundary';
const Navbar = lazy(() => import('./components/navbar'));
const HomePage = lazy(() => import('./pages/homepage'));
const Signup = lazy(() => import('./pages/signuppage'));
const Signin = lazy(() => import('./pages/signinpage'));
const ChatsPage = lazy(() => import('./pages/chatpage'));

class App extends Component{

	unSubcribeFromAuth = null

	componentDidMount(){
		// Checking If User is Authenticated
		this.unSubcribeFromAuth = auth.onAuthStateChanged(async user => {
			if (user) {
				// Creating a user and adding it to firestore
				const userRef = await createUserDocument(user);
				userRef.onSnapshot(snapShot => {
					this.props.setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					});
				})
				// Get All Chat Messages
				this.props.fetchMessages()
			} else {
				this.props.setCurrentUser(user)
			}
		});
	}

	// To clean up that auth subscription for performance sake
	componentWillUnmount(){
		this.unSubcribeFromAuth()
	}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<ErrorBoundary>
						<Suspense fallback={<div> Loading... </div>}>
							<Navbar />
							<Switch>
								<Route exact path="/" component={HomePage} />
								<Route exact path="/signup" >
									{
										this.props.user ? <Redirect to='/signin'/> : <Signup/>
									}
								</Route>
								<Route exact path="/signin">
									{
										this.props.user ? <Redirect to='/discussions' /> : <Signin/>
									}
								</Route>
								<Route exact path="/discussions" >
									{
										!this.props.user ? <Redirect to='/signup'/> : <ChatsPage/>
									}
								</Route>
							</Switch>
						</Suspense>
					</ErrorBoundary>
				</BrowserRouter>
			</div>
    	);
	}
}

const mapStateToProps = ({user}) => {
	return {
		user
	}
}

export default connect(mapStateToProps, { setCurrentUser, fetchMessages })(App);