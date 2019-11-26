import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  state = {
    pizzas: [],
    topping: "",
    size: "",
    vegetarian: false,
    selectedOption: ""
  }

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
    .then (resp => resp.json())
    .then (data => 
      this.setState({
        pizzas: data
      })
    )
  }

  editPizza = (pizza) => {
    let option = pizza.vegetarian ? "Vegetarian" : "Not Vegetarian"

    this.setState({
      topping: pizza.topping,
      size: pizza.size,
      selectedOption: option
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };
  
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm handleChange={this.handleChange} handleOptionChange={this.handleOptionChange} state={this.state}/>
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
