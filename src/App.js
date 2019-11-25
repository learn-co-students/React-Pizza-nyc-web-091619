import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {
  state = {
    pizzaList: [],
    pizzaTopping: "",
    pizzaSize: "",
    pizzaVeggie: false
  };

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          pizzaList: data
        });
      });
  }

  setPizzaTopping = (topping, size, veggie) => {
    let veganOrNot;
    if (veggie === true) {
      veganOrNot = "Vegetarian"
    } else {
      veganOrNot = "Not Vegetarian"
    }
    this.setState({
      pizzaTopping: topping,
      pizzaSize: size,
      pizzaVeggie: veganOrNot
    });
  };

  render() {
    const { pizzaTopping, pizzaSize, pizzaVeggie } = this.state;

    return (
      <Fragment>
        <Header />
        <PizzaForm
          pizzaTopping={pizzaTopping}
          pizzaSize={pizzaSize}
          pizzaVeggie={pizzaVeggie}
        />
        <PizzaList
          pizzaList={this.state.pizzaList}
          setPizzaTopping={this.setPizzaTopping}
        />
      </Fragment>
    );
  }
}

export default App;
