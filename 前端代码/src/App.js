import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './login'
import Admin from './admin';

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Admin}></Route>
            <Route path='/login' component={Login}></Route>
            
        </Switch>
    </BrowserRouter>
  );
}

export default App;
