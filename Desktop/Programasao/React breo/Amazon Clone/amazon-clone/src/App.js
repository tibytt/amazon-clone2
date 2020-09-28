import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';

//React router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';

import { auth } from "./firebase";
import { useStateValue } from './StateProvider';
import Payment from './Payment';


//stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
//public key
const promise = loadStripe("pk_test_51HWABbE00jXC3EzQ1mtEvMV7uzlUXcpqgeCQjZDCJVWl8D1lYk5TaYlxDgrSFMbARLxir0ZDL74ucFRBLGU841Aq00u2MwDRVU");

function App() {
  const [{}, dispatch] = useStateValue();
  //listener
  useEffect(() => {
    //will ony run once when the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS ->', authUser);

      if (authUser){
        //user login
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        //user logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (
    <Router>
    <div className="App">
    <Switch >
         <Route path="/login">
       <Login />
      </ Route>
    <Route path="/checkout">
      <Header />
      <Checkout />
      </ Route>
      <Route path="/payment">
      <Header />
      <Elements stripe={promise}>
      <Payment />
      </Elements>
      
      </ Route>
      <Route path="/">
      <Header />
      <Home />
      </ Route>
      </Switch>  
    </div>
    </Router>
  );
}

export default App;
