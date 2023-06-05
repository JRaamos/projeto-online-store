import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Carrinho.css';
import Loading from '../components/Loading';

class Carrinho extends Component {
  state = {
    ids: [],
    quantidadeDeProduto: undefined,
    price: undefined,
    finalizar: false,
  };

  componentDidMount() {
    const products = JSON.parse(localStorage.getItem('cartItems'));
    if (products) {
      this.setState({ ids: products });
    }
    const numero = JSON.parse(localStorage.getItem('numero'));
    this.setState({ quantidadeDeProduto: numero });
    this.handlePriceCarrinho();
  }

  handleClick = (event) => {
    const { innerHTML, id } = event.target;
    if (innerHTML === '+') {
      const prevStorage = JSON.parse(localStorage.getItem('cartItems'));
      const productToIncrement = prevStorage.find((product) => product.id === id);
      productToIncrement.quantidade += 1;

      localStorage.setItem('cartItems', JSON.stringify(prevStorage));
      const products = JSON.parse(localStorage.getItem('cartItems'));
      this.setState({ ids: products });
      this.handleNumberCarrinho();
    }
    if (innerHTML === '-') {
      const prevStorage = JSON.parse(localStorage.getItem('cartItems'));
      const productToIncrement = prevStorage.find((product) => product.id === id);
      productToIncrement.quantidade -= 1;

      localStorage.setItem('cartItems', JSON.stringify(prevStorage));
      const products = JSON.parse(localStorage.getItem('cartItems'));
      this.setState({ ids: products });
      this.handleNumberCarrinhoRemoveUm();
    }
    if (innerHTML === 'Remover') {
      const prevStorage = JSON.parse(localStorage.getItem('cartItems'));
      const prevMinusDeleted = prevStorage.filter((elem) => elem.id !== id);

      localStorage.setItem('cartItems', JSON.stringify(prevMinusDeleted));

      const products = JSON.parse(localStorage.getItem('cartItems'));
      this.setState({ ids: products });
      this.handleNumberCarrinho();
    }
    this.handlePriceCarrinho();
  };

  handleNumberCarrinhoRemoveUm = () => {
    let number = 0;
    const numero = JSON.parse(localStorage.getItem('numero'));
    number += (numero - 1);
    localStorage.setItem('numero', JSON.stringify(number));
    this.setState({ quantidadeDeProduto: number });
  };

  handleNumberCarrinho = () => {
    let number = 0;
    const prevStorage = JSON.parse(localStorage.getItem('cartItems'));
    prevStorage.forEach(({ quantidade }) => { number += quantidade; });
    localStorage.setItem('numero', JSON.stringify(number));
    this.setState({ quantidadeDeProduto: number });
  };

  handlePriceCarrinho = () => {
    let number = 0;
    const prevStorage = JSON.parse(localStorage.getItem('cartItems'));
    prevStorage.forEach(({ quantidade, price }) => {
      if (quantidade > 1) {
        number += (price * quantidade);
      } else {
        number += price;
      }
    });
    this.setState({ price: number.toFixed(2) });
  };

  checkout = () => {
    const number = 3000;
    const numbeDois = 4000;
    this.setState({ finalizar: true });
    setTimeout(() => {
      window.location.href = '/checkout';
    }, number);
    setTimeout(() => {
      this.setState({ finalizar: false });
    }, numbeDois);
  };

  render() {
    const { ids, quantidadeDeProduto, price, finalizar } = this.state;
    return (
      <div>
        <header className="header-carrinho">
          <Link
            to="/"
          >
            <button
              className="button-back "
            >
              ↩️
            </button>
          </Link>
        </header>
        {
          finalizar
            ? (
              <div className="direcionamento">
                <Loading />
                <p>
                  Você sera redirecionado para pagina de pagamento
                </p>

              </div>
            ) : (
              <main className="carrinho-contain">
                <div className="carrinho">

                  <h2>Produtos</h2>
                  <div>
                    {
                      ids.length === 0
                        ? (
                          <p>
                            Seu carrinho está vazio
                          </p>
                        ) : (

                          ids.map((product) => (
                            <div
                              className="cards-carrinho"
                              key={ product.id }
                            >
                              <h3
                                className="h3"
                                data-testid="shopping-cart-product-name"
                              >
                                {product.title}
                              </h3>
                              <div className="card-carrinho">
                                <img
                                  className="img-carrinho"
                                  src={ product.thumbnail }
                                  alt={ product.title }
                                />
                                <div>
                                  <p>{`R$ ${product.price.toFixed(2)}`}</p>
                                  <p
                                    data-testid="shopping-cart-product-quantity"
                                  >
                                    {`Quantidade: ${product.quantidade}`}
                                  </p>
                                  <button
                                    className="button-carrinho"
                                    id={ product.id }
                                    data-testid="product-increase-quantity"
                                    onClick={ this.handleClick }
                                  >
                                    +
                                  </button>
                                  <button
                                    className="button-carrinho"
                                    id={ product.id }
                                    data-testid="product-decrease-quantity"
                                    onClick={ this.handleClick }
                                    disabled={ product.quantidade === 1 }
                                  >
                                    -
                                  </button>
                                  <button
                                    className="button-carrinho"
                                    id={ product.id }
                                    data-testid="remove-product"
                                    onClick={ this.handleClick }
                                  >
                                    Remover
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )
                    }
                  </div>
                </div>

                <div
                  className="carrinho-resulmo"
                >
                  <h2>Resulmo da compra</h2>
                  <div className="resulmo-compra">
                    <p>
                      Quantidade de produtos
                    </p>
                    <p>
                      {quantidadeDeProduto}
                    </p>
                  </div>
                  <div className="resulmo-compra">
                    <h3>
                      Total
                    </h3>
                    <p>

                      {`R$ ${price}`}
                    </p>
                  </div>

                  <button
                    className="button-carrinho"
                    onClick={ this.checkout }
                  >
                    Finalizar compra
                  </button>
                </div>

              </main>
            )
        }
      </div>
    );
  }
}

export default Carrinho;
