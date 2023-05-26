import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  // função responsável por adicionar o produto no carrinho de compras
  handleAddToCartAndStorage = (product) => {
    if (JSON.parse(localStorage.getItem('cartItems'))) {
      const prev = JSON.parse(localStorage.getItem('cartItems'));
      const productAlreadyOnCart = prev.some(
        (prevProduct) => prevProduct.id === product.id,
      );

      if (productAlreadyOnCart) {
        const prevProduct = prev.find((prevProd) => (prevProd.id === product.id));

        prevProduct.quantidade += 1;

        localStorage.setItem(
          'cartItems',
          JSON.stringify(prev),
        );
      } else {
        localStorage.setItem(
          'cartItems',
          JSON.stringify([...prev, { ...product, quantidade: 1 }]),
        );
      }
    } else {
      localStorage.setItem('cartItems', JSON.stringify([{ ...product, quantidade: 1 }]));
    }
  };

  render() {
    const { img, name, price, id, product } = this.props;
    return (

      <div data-testid="product">
        <Link
          data-testid="product-detail-link"
          to={ `/details/${id}` }
        >
          <h3>{name}</h3>
          <img src={ img } alt={ name } />
          <p>{price}</p>
        </Link>
        <button
          data-testid="product-add-to-cart"
          onClick={ () => this.handleAddToCartAndStorage(product) }
        >
          Adicionar ao Carrinho
        </button>
      </div>

    );
  }
}

ProductCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  product: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired })),
}.isRequired;

export default ProductCard;
