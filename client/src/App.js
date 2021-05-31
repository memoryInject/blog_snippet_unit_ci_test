import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import BlogScreen from './screens/BlogScreen';

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
          <Route path='/' component={HomeScreen} exact />
          <Route path='/blog/:id' component={BlogScreen} />
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
