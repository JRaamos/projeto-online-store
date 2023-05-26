import { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Details from './pages/Details';
import Checkout from './pages/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/carrinho" component={ Carrinho } />
          <Route path="/details/:id" component={ Details } />
          <Route path="/checkout" component={ Checkout } />

        </Switch>
      </div>
    );
  }
}

export default App;
