import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './Componenets/LoginPage/LoginPage';
import Home from './Componenets/HomePage/Home';
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <PrivateRoute exact path='/home' component={Home} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
