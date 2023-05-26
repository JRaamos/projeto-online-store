import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avaliacoes from '../components/Avaliacoes';

class Details extends Component {
  state = {
    product: '',
  };

  async componentDidMount() {
    const result = await this.resolvePromisse();
    this.setState({ product: result });
  }

  handleAddToCartAndStorage = () => {
    const { product } = this.state;
    localStorage.setItem('cartItems', JSON.stringify([{ ...product, quantidade: 1 }]));
  };

  resolvePromisse = async () => {
    const { match: {
      params: { id },
    } } = this.props;
    const product = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const result = product.json();
    return result;
  };

  render() {
    const { product } = this.state;
    const { match: {
      params: { id },
    } } = this.props;
    return (
      <div>
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
          onClick={ this.handleAddToCartAndStorage }
        >
          Adicionar ao carrinho
        </button>
        <Link to="/carrinho" data-testid="shopping-cart-button">
          <button> Carrinho </button>
        </Link>
        <Avaliacoes
          id={ id }
        />
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
