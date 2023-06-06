import { Component } from 'react';
import './Checkout.css';
import ProductsCheckout from '../components/ProductsCheckout';
import Loading from '../components/Loading';

class Checkout extends Component {
  state = {
    finalizar: false,
    fullname: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
    pagamentos: '',
    mensagem: undefined,
    product: [],

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
      [name]: value });
  };

  validator = () => {
    const { fullname, email, cpf, telefone, cep, endereco, pagamentos } = this.state;
    if (fullname && email && cpf && telefone && endereco && cep && pagamentos) {
      localStorage.removeItem('cartItems');
      localStorage.removeItem('numero');
      this.checkout();
      this.setState({ finalizar: true });
    }
    if (!fullname || !email || !cpf || !telefone || !endereco || !cep || !pagamentos) {
      this.setState({ mensagem: true });
    } else {
      this.setState({ mensagem: false });
    }
  };

  checkout = () => {
    const number = 3000;
    setTimeout(() => {
      window.location.href = '/';
    }, number);
  };

  render() {
    const { finalizar, mensagem, product } = this.state;
    return (
      <div>
        <header className="header-carrinho " />
        {
          finalizar
            ? (
              <div className="mensagem-checkout">
                <h2> Obrigado por compra em nossa loja! </h2>
                <p>Você sera redirecionado para pagina principal</p>
                <Loading />
              </div>
            ) : (
              <div className="main-checkout">
                <ProductsCheckout product={ product } />
                <form
                  className="form-checkout"
                  onSubmit={ (e) => {
                    e.preventDefault();
                  } }
                >
                  <h2>Preencha os dados para sua NF</h2>
                  <div className="contain-checkout">
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
                  </div>
                  <h2>Qual metodo de pagamento?</h2>
                  {
                    mensagem
                && <p>Preencha todos os campos e escolha um metodo de pagamento</p>
                  }
                  <div className="pagamentos-checkout">
                    <label
                      value="pagamentos"
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
                        src="https://www.shareicon.net/data/256x256/2016/07/16/636201_boleto_480x300.png"
                        alt="boleto"
                        className="img-pagamentos"
                      />
                    </label>
                    <label
                      value="pagamentos"
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
                        src="https://logospng.org/download/visa/logo-visa-256.png"
                        alt="visa"
                        className="img-pagamentos"
                      />
                    </label>
                    <label
                      value="pagamentos"
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
                        src="https://pt.seaicons.com/wp-content/uploads/2015/06/Master-Card-Blue-icon.png"
                        alt="master-card"
                        className="img-pagamentos"
                      />
                    </label>
                    <label
                      value="pagamentos"
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
                  </div>
                  <div className="button-contain">
                    <button
                      type="submit"
                      onClick={ this.validator }
                      className="button-checkout"
                    >
                      Fazer pagamento
                    </button>
                  </div>
                </form>
              </div>
            )
        }
      </div>
    );
  }
}

export default Checkout;
