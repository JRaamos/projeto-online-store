import { Component } from 'react';
import PropTypes from 'prop-types';

class Avaliacoes extends Component {
  state = {
    email: '',
    avaliador: '',
    validador: [],
    array: [],
    mensagem: '',
    stateStorage: [],
  };

  componentDidMount() {
    const um = 1; const dois = 2; const tres = 3;
    const quatro = 4; const cinco = 5;
    this.setState({
      array: [um, dois, tres, quatro, cinco],
    });
    this.localToStateStorage();
  }

  storeReview = () => {
    const { id } = this.props;
    const { email, avaliador, mensagem } = this.state;
    const prev = JSON.parse(localStorage.getItem(id));
    if (prev) {
      localStorage.setItem(id, JSON
        .stringify([...prev, { email, text: mensagem, rating: avaliador }]));
    } else {
      localStorage.setItem(id, JSON
        .stringify([{ email, text: mensagem, rating: avaliador }]));
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validateAndStorage = () => {
    const number = 5;
    const { email, avaliador } = this.state;
    const emailValidador = /\S+@\S+\.\S+/;
    if (emailValidador.test(email) && avaliador > 0 && avaliador <= number) {
      this.setState({ validador: true });
    } else {
      this.setState({ validador: false });
    }
  };

  restoryInput = () => {
    this.setState({
      email: '',
      avaliador: '',
      mensagem: '',
    });
  };

  localToStateStorage() {
    const { id } = this.props;
    const prev = JSON.parse(localStorage.getItem(id));
    if (prev) {
      this.setState({ stateStorage: prev });
    }
  }

  render() {
    const { validador, stateStorage, array, email, mensagem } = this.state;
    return (
      <div>
        <fieldset>
          <form
            onSubmit={ (event) => {
              event.preventDefault();
              if (validador) {
                this.storeReview();
                this.restoryInput();
              }
              this.localToStateStorage();
            } }
          >
            <input
              data-testid="product-detail-email"
              type="email"
              placeholder="Email"
              required
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            {
              array.map((numero) => (
                <label
                  value="avaliador"
                  key={ numero }
                >
                  <input
                    required
                    data-testid={ `${numero}-rating` }
                    type="radio"
                    value={ numero }
                    name="avaliador"
                    onChange={ this.handleChange }
                  />
                  {numero}
                </label>

              ))
            }
            <textarea
              data-testid="product-detail-evaluation"
              placeholder="Mensagem (opcional)"
              name="mensagem"
              value={ mensagem }
              onChange={ this.handleChange }
            />
            {
              !validador && <p data-testid="error-msg">Campos inválidos</p>
            }
            <button
              data-testid="submit-review-btn"
              type="submit"
              onClick={ () => {
                this.validateAndStorage();
              } }
            >
              Avaliar
            </button>
          </form>
        </fieldset>
        {
          validador
          && stateStorage.map((element, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{element.email}</p>
              <p data-testid="review-card-evaluation">{element.text}</p>
              <p data-testid="review-card-rating">{element.rating}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

Avaliacoes.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Avaliacoes;
