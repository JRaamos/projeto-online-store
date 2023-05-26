import { Component } from 'react';
import PropTypes from 'prop-types';

class Checkout extends Component {
  state = {
    product: [],
    fullname: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
    pagamentos: '',
    validador: [],
  };

  componentDidMount() {
    const products = JSON.parse(localStorage.getItem('cartItems'));
    if (products) {
      this.setState({ product: products });
    }
  }

  onInputChang = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validator = () => {
    const { history } = this.props;
    const { fullname, email, cpf, telefone, cep, endereco, pagamentos } = this.state;
    if (fullname && email && cpf && telefone && endereco && cep && pagamentos) {
      this.setState({ validador: true });
      localStorage.removeItem('cartItems');
      history.push('/');
    } else {
      this.setState({ validador: false });
    }
  };

  render() {
    const { product, validador } = this.state;
    return (
      <div>
        {
          product.map(({ title }) => (
            <div key={ title }>
              <p>
                { title }
              </p>
            </div>
          ))
        }
        <fieldset>
          <form
            onSubmit={ (e) => {
              e.preventDefault();
            } }
          >
            <label>
              <input
                required
                type="text"
                name="fullname"
                placeholder="Nome Completo"
                data-testid="checkout-fullname"
                onChange={ this.onInputChang }
              />
            </label>
            <label>
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                data-testid="checkout-email"
                onChange={ this.onInputChang }

              />
            </label>
            <label>
              <input
                required
                type="text"
                name="cpf"
                placeholder="CPF"
                data-testid="checkout-cpf"
                onChange={ this.onInputChang }

              />
            </label>
            <label>
              <input
                required
                type="text"
                name="telefone"
                placeholder="Telefone"
                data-testid="checkout-phone"
                onChange={ this.onInputChang }

              />
            </label>
            <label>
              <input
                required
                type="text"
                name="cep"
                placeholder="CEP"
                data-testid="checkout-cep"
                onChange={ this.onInputChang }

              />
            </label>
            <label>
              <input
                required
                type="text"
                name="endereco"
                placeholder="Endereço"
                data-testid="checkout-address"
                onChange={ this.onInputChang }

              />
            </label>
            <label value="pagamentos">
              <input
                required
                type="radio"
                name="pagamentos"
                value="boleto"
                data-testid="ticket-payment"
                onChange={ this.onInputChang }

              />
              Boleto
            </label>
            <label value="pagamentos">
              <input
                required
                type="radio"
                name="pagamentos"
                value="visa"
                data-testid="visa-payment"
                onChange={ this.onInputChang }

              />
              Visa
            </label>
            <label value="pagamentos">
              <input
                required
                type="radio"
                name="pagamentos"
                value="master"
                data-testid="master-payment"
                onChange={ this.onInputChang }

              />
              Master
            </label>
            <label value="pagamentos">
              <input
                required
                type="radio"
                name="pagamentos"
                value="elo"
                data-testid="elo-payment"
                onChange={ this.onInputChang }

              />
              Elo
            </label>
            {
              !validador
              && <p data-testid="error-msg"> Campos inválidos </p>
            }
            <button
              type="submit"
              data-testid="checkout-btn"
              onClick={ this.validator }
            >
              Enviar
            </button>
          </form>
        </fieldset>

      </div>
    );
  }
}
Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
Checkout.defaultProps = {
  history: {
    push: () => {},
  },
};
export default Checkout;
