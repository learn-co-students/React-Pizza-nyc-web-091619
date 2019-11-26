import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
let topping
let size
let vegetarian

class App extends Component {

  state = {
    pizzas: [],
    editID: 0,
    editPizza: {}
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
    .then(resp => resp.json())
    .then(data => {
      this.setState({pizzas: data})
    })
  }
  
  editHandler = (event) => {
    let pizzaID = parseInt(event.target.id)
    let editPizza = this.state.pizzas.find(pizza => pizza.id === pizzaID)
    this.setState({editID: pizzaID, editPizza: editPizza})
  }

  submitHandler = (event) => {
    
  }

  toppingHandler = (event) => {
    topping = event.target.value
    this.setState(prevState => ({
      editPizza: {
        ...prevState.editPizza,
        topping: topping
      }
    })
    )
  }

  sizeHandler = (event) => {
    size = event.target.value
    this.setState(prevState => ({
      editPizza: {
        ...prevState.editPizza,
        size: size
      }
    }))
  }

  vegetarianHandler = (event) => {
    vegetarian = event.target.checked
    this.setState(prevState =>({
      editPizza: {
        ...prevState.editPizza,
        vegetarian: vegetarian
      }
    }))
  }
  
  render() {
    console.log(this.state)
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          pizza = {this.state.editPizza} 
          submitHandler = {this.submitHandler}
          toppingHandler = {this.toppingHandler}
          sizeHandler = {this.sizeHandler}
          vegetarianHandler = {this.vegetarianHandler} />
        <PizzaList pizzas = {this.state.pizzas} editHandler={this.editHandler}/>
      </Fragment>
    );
  }
}

export default App;
