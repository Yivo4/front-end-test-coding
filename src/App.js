import './App.css';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
//components
import SearchBar from './components/SearchBar/SearchBar';
import UsersDetails from './components/UsersDetails/UsersDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SearchBar}></Route>
        <Route path="/users/:user" exact component={UsersDetails}></Route>
      </Switch>
    </Router>
  );
}

export default App;
