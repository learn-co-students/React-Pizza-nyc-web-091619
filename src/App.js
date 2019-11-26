import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const api = 'http://localhost:3000/pizzas'

class App extends Component {

  state ={
    pizzas: [],
    editPizza: [],
    topping: '',
    radioOption: '',
    pizzaSize: '',
    pizzaId: ''
  }

  editHandler = (pizza) => {
    let option = pizza.vegetarian ? "Vegetarian" : 'Not Vegetarian'
    this.setState(
      { 
        editPizza: pizza,
        radioOption: option,
        pizzaSize: pizza.size,
        topping: pizza.topping,
        pizzaId: pizza.id
      });
  }

  formSubmit = (e) => {
    e.preventDefault()

    fetch(api + '/' + this.state.pizzaId, {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify(
        {
        topping: this.state.topping,
        size: this.state.pizzaSize,
        vegetarian: this.state.radioOption === "Vegetarian" ? true : false
      })
    }).then(res => res.json()).then(pizza => this.setState({
        pizzas: this.state.pizzas.map(statePizza => {
          if (statePizza.id === pizza.id) {
            return pizza
          } else {
            return statePizza
          }
        })
      }))
  }

  changeRadioOption = (e) => {
    this.setState({ radioOption: e.target.value });
  }

  changeSize = (e) => {
    this.setState({ pizzaSize: e.target.value  });
  }

  changeTopping = (e) => {
    this.setState({ topping: e.target.value  });
  }

  componentDidMount() {
    fetch(api).then(res => res.json()).then(pizzas => this.setState({ pizzas: pizzas  }))
  }

  //showPizzas = () => console.log(this.state.editPizza)

  render() {
    //this.showPizzas()
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          pizza={this.state.editPizza} 
          changeRadioOption={this.changeRadioOption} 
          radioOption={this.state.radioOption} 
          changeSize={this.changeSize} 
          pizzaSize={this.state.pizzaSize}
          topping={this.state.topping}
          changeTopping={this.changeTopping}
          formSubmit={this.formSubmit}/>
        <PizzaList pizzas={this.state.pizzas} editHandler={this.editHandler}/>
      </Fragment>
    );
  }
}

export default App;
