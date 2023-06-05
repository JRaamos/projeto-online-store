import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avaliacoes from '../components/Avaliacoes';
import './Details.css';

class Details extends Component {
  state = {
    product: '',
    numeroCarrinho: 0,
  };

  async componentDidMount() {
    const result = await this.resolvePromisse();
    this.setState({ product: result });
  }

  handleAddToCartAndStorage = () => {
    const { product } = this.state;
    localStorage.setItem('cartItems', JSON.stringify([{ ...product, quantidade: 1 }]));
    this.handleNumberCarrinho();
  };

  resolvePromisse = async () => {
    const { match: {
      params: { id },
    } } = this.props;
    const product = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const result = product.json();
    return result;
  };

  handleNumberCarrinho = () => {
    const { numeroCarrinho } = this.state;
    const prevStorage = JSON.parse(localStorage.getItem('numero'));
    const numerocompleto = Number(numeroCarrinho) + 1;
    this.setState({ numeroCarrinho: numerocompleto });
    localStorage.setItem(
      'numero',
      JSON.stringify(numerocompleto),
    );
    console.log(prevStorage[0].quantidade);
  };

  render() {
    const { product, numeroCarrinho } = this.state;
    const { match: {
      params: { id },
    } } = this.props;
    return (
      <div>
        <header className="header">
          <button>↩️</button>
          <Link to="/carrinho" data-testid="shopping-cart-button">
            <button>
              &#128722;
              {' '}
              {numeroCarrinho}
            </button>
          </Link>
        </header>
        <main className="main-details">
          <h2 data-testid="product-detail-name">{ product.title }</h2>
          <img
            data-testid="product-detail-image"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <p data-testid="product-detail-price">
            { product.price }
          </p>
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ () => {
              this.handleAddToCartAndStorage();
            } }
          >
            Adicionar ao carrinho
          </button>

          <Avaliacoes
            id={ id }
          />
        </main>
      </div>
    );
  }
}
Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Details;
