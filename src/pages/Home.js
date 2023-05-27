import { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import ProductCard from '../components/ProductCard';
import Categorias from '../components/Categorias';
import './Home.css';
import Loading from '../components/Loading';

class Home extends Component {
  state = {
    inputName: '',
    products: [],
    categories: [],
    productsCategory: [],
    opcoes: 'busca',
    zeroProduct: false,
    loading: false,
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  // função responsavel por fazer requisição a api e seta no estado as categorias de produtos
  getProducts = async ({ target }) => {
    const categoryId = target.id;

    this.setState({ loading: true });
    const products = await getProductsFromCategoryAndQuery(categoryId, '');
    this.setState({ loading: false });
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
    this.setState({ loading: true });
    const products = await getProductsFromCategoryAndQuery(null, inputName);
    this.setState({ loading: false });
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
    const { products, categories, productsCategory,
      opcoes, zeroProduct, loading } = this.state;

    return (
      <div className="home-contain">

        <form
          className="form-contain"
          onSubmit={ (event) => {
            event.preventDefault();
          } }
        >
          <div>
            <label>
              <input
                className="form-control"
                id="formGroupExampleInput"
                type="text"
                placeholder="Digite o nome de um produto"
                data-testid="query-input"
                onChange={ this.handleChange }
              />
            </label>

            <button
              data-testid="query-button"
              className="btn-form"
              type="submit"
              onClick={ this.renderProduct }
            >
              Buscar
            </button>

          </div>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <Link to="/carrinho" data-testid="shopping-cart-button">
              <button
                className="btn btn-outline-primary"
              >
                &#128722;
              </button>
            </Link>
          </div>
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
            {
              loading
                && (
                  <div className="loading-home">
                    <Loading />
                  </div>
                )

            }
            {
              opcoes === 'categoria' && !loading
            && productsCategory.map((product) => (
              <ProductCard
                key={ product.id }
                img={ product.thumbnail }
                name={ product.title }
                price={ product.price }
                id={ product.id }
                product={ product }
              />
            ))
            }
            {products.length === 0 && zeroProduct ? (
              <p>Nenhum produto foi encontrado</p>
            ) : (
              opcoes === 'busca' && !loading
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
