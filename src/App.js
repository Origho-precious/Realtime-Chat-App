import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import HomePage from './pages/homepage';
import Signup from './pages/signuppage';
import Signin from './pages/signinpage';
import ChatsPage from './pages/chatpage';
import { auth, createUserDocument } from './firebase';
import { setCurrentUser, fetchMessages } from './redux/actions';

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