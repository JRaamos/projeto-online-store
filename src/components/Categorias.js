import { Component } from 'react';
import PropTypes from 'prop-types';

class Categorias extends Component {
  render() {
    const { id, getProducts, name } = this.props;
    return (
      <div>
        <label
          data-testid="category"
          htmlFor={ id }
        >
          <input
            onChange={ getProducts }
            name="category"
            type="radio"
            id={ id }
          />
          {name}
        </label>
      </div>
    );
  }
}
Categorias.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  getProducts: PropTypes.func.isRequired,

};
export default Categorias;
