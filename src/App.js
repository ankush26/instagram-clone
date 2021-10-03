import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './Componenets/LoginPage/LoginPage';
import Home from './Componenets/HomePage/Home';
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <UserProvider>
            <PrivateRoute exact path='/home' component={Home} />
          </UserProvider> 
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
