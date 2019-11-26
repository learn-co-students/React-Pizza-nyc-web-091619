import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  state = {
    pizzas: [],
    id: 0,
    topping: "",
    size: "",
    selectedOption: "",
  }
  
  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
    .then(resp => resp.json())
    .then(data => 
      this.setState({
        pizzas: data
      })
    )
  }

  editPizza = (pizza) => {
    let option = pizza.vegetarian ? "Vegetarian" : "Not Vegetarian"
    this.setState({
      id: pizza.id,
      topping: pizza.topping,
      size: pizza.size,
      selectedOption: option
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOptionChange = (e) => {
    this.setState({
      selectedOption: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    fetch(`http://localhost:3000/pizzas/${this.state.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        id: this.state.id,
        topping: this.state.topping,
        size: this.state.size,
        vegetarian: 
        (this.state.selectedOption === "Vegetarian") 
        ?
        true
        :
        false
      })
    })
    // .then(res => res.json())
    // .then(pizza => {
    //   // i got the listing!!!!!!
    //   this.props.addListing(listing)
    // })
  }


  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
        state={this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleOptionChange={this.handleOptionChange}
        />
        <PizzaList 
        pizzas={this.state.pizzas}
        editPizza={this.editPizza}
        />
      </Fragment>
    );
  }
}

export default App;
