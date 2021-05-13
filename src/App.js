import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './PrivateRoute';
import Header from './components/Header';
import Dnd from './pages/Dnd';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <div>
        <Header />
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/dnd" component={Dnd} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
