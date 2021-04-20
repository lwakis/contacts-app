import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Registration from "./components/Registration";
import LogIn from "./components/LogIn";
import Profile from './components/Profile';

function App() {
  let id = JSON.parse(localStorage.getItem("id"));

  return (
    <Router>
      <div className="App">
        <Switch>
          {!id ?
            <>
              <Route exact path="/registration">
                <Registration/>
              </Route>
              <Route exact path="/">
                <LogIn />
              </Route>
            </>
          :   
              <Route path="/">
                <Profile id={id}/>
              </Route>
          }
        </Switch>
      </div>
    </Router>
  );
}

export default App;