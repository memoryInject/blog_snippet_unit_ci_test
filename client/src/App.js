import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import BlogScreen from './screens/BlogScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

const App = () => {
  useEffect(() => {
    // Init MaterializeCSS javaScript
    M.AutoInit();
  });

  return (
    <Router>
      <Header />
      <main>
        <div className='container'>
          <Route path='/login' component={LoginScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/blog/:id' component={BlogScreen} />
          <Route path='/' component={HomeScreen} exact />
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
