
import './App.css';
import Login from "./pages/Login"
import Registartion from "./pages/Registration"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "../src/ProtectedRoute"
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/register"><Registartion/></Route>
          {/* <Route exact path="/home"><Home/></Route> */}
          <ProtectedRoute path={"/home"} component={Home}></ProtectedRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
