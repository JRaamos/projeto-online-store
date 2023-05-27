import { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import ProductCard from '../components/ProductCard';
import Categorias from '../components/Categorias';
import './Home.css';

class Home extends Component {
  state = {
    inputName: '',
    products: [],
    categories: [],
    productsCategory: [],
    opcoes: 'busca',
    zeroProduct: false,
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  // função responsavel por fazer requisição a api e seta no estado as categorias de produtos
  getProducts = async ({ target }) => {
    const categoryId = target.id;
    const products = await getProductsFromCategoryAndQuery(categoryId, '');
    this.setState({ productsCategory: products.results, opcoes: 'categoria' });
    if (!products) {
      this.setState({ zeroProduct: true });
    } else {
      this.setState({ zeroProduct: false });
    }
  };

  // função responsavel por fazer requisição da api com valor do capo de busca e seta esse valor apenas dos produtos no state
  renderProduct = async () => {
    const { inputName } = this.state;
    const products = await getProductsFromCategoryAndQuery(null, inputName);
    this.setState({
      products: products.results,
      opcoes: 'busca',
    });
    if (products.results.length === 0) {
      this.setState({ zeroProduct: true });
    } else {
      this.setState({ zeroProduct: false });
    }
  };

  // função responsavel por seta no state o valor da barra de pesquisa de produtos
  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      inputName: value,
    });
  };

  render() {
    const { products, categories, productsCategory, opcoes, zeroProduct } = this.state;

    return (
      <div className="home-contain">
        <form
          className="form-contain"
          onSubmit={ (event) => {
            event.preventDefault();
          } }
        >
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <div>
            <label>
              <input
                className="input-form"
                type="text"
                data-testid="query-input"
                onChange={ this.handleChange }
              />
            </label>

            <button
              data-testid="query-button"
              type="submit"
              onClick={ this.renderProduct }
            >
              Buscar
            </button>
          </div>
          <Link to="/carrinho" data-testid="shopping-cart-button">
            <button> Carrinho </button>
          </Link>
        </form>
        <main className="main">
          <div className="categorias-contain">
            {categories.map(({ name, id }) => (
              <Categorias
                key={ id }
                name={ name }
                id={ id }
                getProducts={ this.getProducts }
              />
            ))}
          </div>
          <div className="product-contain">
            {opcoes === 'categoria'
            && productsCategory.map((product) => (
              <ProductCard
                key={ product.id }
                img={ product.thumbnail }
                name={ product.title }
                price={ product.price }
                id={ product.id }
                product={ product }
              />
            ))}
            {products.length === 0 && zeroProduct ? (
              <p>Nenhum produto foi encontrado</p>
            ) : (
              opcoes === 'busca'
          && products.map((product) => (
            <ProductCard
              key={ product.id }
              img={ product.thumbnail }
              name={ product.title }
              price={ product.price }
              id={ product.id }
              product={ product }
            />
          ))
            )}

          </div>

        </main>
      </div>
    );
  }
}

export default Home;
