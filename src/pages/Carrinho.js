import { Component } from 'react';
import { Link } from 'react-router-dom';

class Carrinho extends Component {
  state = {
    ids: [],
    disabled: false,
  };

  componentDidMount() {
    const products = JSON.parse(localStorage.getItem('cartItems'));
    if (products) {
      this.setState({ ids: products });
    }
  }

  handleClick = (event) => {
    const { innerHTML, id } = event.target;

    if (innerHTML === '+') {
      const prevStorage = JSON.parse(localStorage.getItem('cartItems'));
      const productToIncrement = prevStorage.find((product) => product.id === id);

      productToIncrement.quantidade += 1;

      if (productToIncrement.quantidade > 1) {
        this.setState({
          disabled: false,
        });
      } else {
        this.setState({
          disabled: true,
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(prevStorage));
      const products = JSON.parse(localStorage.getItem('cartItems'));
      this.setState({ ids: products });
    }
    if (innerHTML === '-') {
      const prevStorage = JSON.parse(localStorage.getItem('cartItems'));
      const productToIncrement = prevStorage.find((product) => product.id === id);

      productToIncrement.quantidade -= 1;

      if (productToIncrement.quantidade > 1) {
        this.setState({
          disabled: false,
        });
      } else {
        this.setState({
          disabled: true,
        });
      }
      localStorage.setItem('cartItems', JSON.stringify(prevStorage));
      const products = JSON.parse(localStorage.getItem('cartItems'));
      this.setState({ ids: products });
    }
    if (innerHTML === 'Remover') {
      const prevStorage = JSON.parse(localStorage.getItem('cartItems'));
      const prevMinusDeleted = prevStorage.filter((elem) => elem.id !== id);

      localStorage.setItem('cartItems', JSON.stringify(prevMinusDeleted));

      const products = JSON.parse(localStorage.getItem('cartItems'));
      this.setState({ ids: products });
    }
  };

  render() {
    const { ids, disabled } = this.state;
    return (
      <div>
        {
          ids.length === 0
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : (
              ids.map((product) => (
                <div key={ product.id }>
                  <h2
                    data-testid="shopping-cart-product-name"
                  >
                    {product.title}
                  </h2>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <p>{product.price}</p>
                  <p
                    data-testid="shopping-cart-product-quantity"
                  >
                    {`Quantidade: ${product.quantidade}`}
                  </p>
                  <div>
                    <button
                      id={ product.id }
                      data-testid="product-increase-quantity"
                      onClick={ this.handleClick }
                    >
                      +
                    </button>
                    <button
                      id={ product.id }
                      data-testid="product-decrease-quantity"
                      onClick={ this.handleClick }
                      disabled={ disabled }
                    >
                      -
                    </button>
                    <button
                      id={ product.id }
                      data-testid="remove-product"
                      onClick={ this.handleClick }
                    >
                      Remover
                    </button>
                  </div>

                </div>
              ))
            )
        }
        <Link
          data-testid="checkout-products"
          to="/checkout"
        >
          <button>
            Finalizar compra
          </button>
        </Link>
      </div>
    );
  }
}

export default Carrinho;
