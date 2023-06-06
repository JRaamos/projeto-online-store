import { Component } from 'react';
import PropTypes from 'prop-types';

class ProductsCheckout extends Component {
  render() {
    const { product } = this.props;
    return (
      <div>
        <main>
          <div className="producto-checkout">
            {
              product.map(({ title, thumbnail }) => (
                <div
                  className="card-checkout"
                  key={ title }
                >
                  <p>
                    { title }
                  </p>
                  <img
                    src={ thumbnail }
                    alt={ title }
                    className="img-checkout"
                  />
                </div>
              ))
            }
          </div>

        </main>
      </div>
    );
  }
}

ProductsCheckout.propTypes = {
  product: PropTypes.arrayOf({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductsCheckout;
