import { Component } from 'react';
import PropTypes from 'prop-types';
import './Checkout.css';

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
      localStorage.removeItem('cartItems');
      history.push('/');
    }
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <header className="header-carrinho " />
        <main className="main-checkout">
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
          <form
            className="form-checkout"
            onSubmit={ (e) => {
              e.preventDefault();
            } }
          >
            <label>
              <input
                className="label-checkout"
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
                className="label-checkout"
                type="email"
                name="email"
                placeholder="Email"
                data-testid="checkout-email"
                onChange={ this.onInputChang }

              />
            </label>
            <label>
              <input
                className="label-checkout"
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
                className="label-checkout"
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
                className="label-checkout"
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
                className="label-checkout"
                required
                type="text"
                name="endereco"
                placeholder="Endereço"
                data-testid="checkout-address"
                onChange={ this.onInputChang }
              />
            </label>
            <label
              value="pagamentos"
              className="img-pagamentos"
            >
              <input
                style={ { display: 'none' } }
                required
                className="pagamentos"
                type="radio"
                name="pagamentos"
                value="boleto"
                data-testid="ticket-payment"
                onChange={ this.onInputChang }
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8F8IPBBNCLerijhazilvggGF_O97kAG9qrC2n3C85SPczKMbvPpoH2lGoXMKmW9ZT8Ys&usqp=CAU"
                alt="boleto"
                className="img-pagamentos"
              />
            </label>
            <label
              value="pagamentos"
              className="img-pagamentos"
            >
              <input
                style={ { display: 'none' } }
                className="pagamentos"
                required
                type="radio"
                name="pagamentos"
                value="visa"
                data-testid="visa-payment"
                onChange={ this.onInputChang }
              />
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-visa-7-282549.png"
                alt="visa"
                className="img-pagamentos"
              />
            </label>
            <label
              value="pagamentos"
              className="img-pagamentos"
            >
              <input
                style={ { display: 'none' } }
                className="pagamentos"
                required
                type="radio"
                name="pagamentos"
                value="master"
                data-testid="master-payment"
                onChange={ this.onInputChang }
              />
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-mastercard-11-282395.png"
                alt="master-card"
                className="img-pagamentos"
              />
            </label>
            <label
              value="pagamentos"
              className="img-pagamentos"
            >
              <input
                style={ { display: 'none' } }
                className="pagamentos"
                required
                type="radio"
                name="pagamentos"
                value="elo"
                data-testid="elo-payment"
                onChange={ this.onInputChang }

              />
              <img
                src="https://logospng.org/download/cartao-elo/logo-cartao-elo-colorido-fundo-preto-256.png"
                alt="elo"
                className="img-pagamentos"
              />
            </label>
            <div>
              <button
                type="submit"
                data-testid="checkout-btn"
                onClick={ this.validator }
              >
                Enviar
              </button>
            </div>
          </form>

        </main>
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
