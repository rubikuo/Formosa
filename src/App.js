import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Attraction from "./page/Attraction";
import AttractionDetail from "./page/AttractionDetail";
import Cuisine from "./page/Cuisine";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />

      <main>
        <Route exact path="/" component={Home} />
        <Route path="/about-taiwan" component={About} />
        <Route exact path="/attractions" component={Attraction} />
        <Route path="/attractions/:id" component={AttractionDetail} />
        <Route path="/gourmet-cuisine" component={Cuisine} />
      </main>
    </Router>
  );
}

export default App;
