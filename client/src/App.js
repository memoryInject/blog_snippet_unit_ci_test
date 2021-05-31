import { useEffect } from "react";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  useEffect(() => {
    // Init MaterializeCSS javaScript
    M.AutoInit();
  });

  return (
    <div className="App">
      <Header />
      <main>
        <div className="container">
          <HomeScreen />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
