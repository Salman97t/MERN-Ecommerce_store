import './App.css';
import Header from './component/layout/Header/Header.js';
import { BrowserRouter as Router } from 'react-router-dom';
import webFont from "webfontloader";
import React from 'react';
import Footer from "./component/layout/Footer/Footer.js"



function App() {
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  
    // store.dispatch(loadUser());
  
    // getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header/>
      <Footer />
    </Router>
    
  );
}

export default App;
