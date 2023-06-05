import { Component } from 'react';
import './Loading.css';

class Loading extends Component {
  render() {
    return (
      <div>
        <h1>
          <div className="spinner is-animating" />
        </h1>
      </div>
    );
  }
}
export default Loading;
