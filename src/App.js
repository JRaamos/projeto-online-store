import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Checkout from './pages/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/carrinho" component={ Carrinho } />
          <Route path="/checkout" component={ Checkout } />
        </Switch>
      </div>
    );
  }
}

export default App;
