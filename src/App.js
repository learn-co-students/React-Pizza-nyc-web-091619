import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    edit_id: 0,
    topping: "",
    size: "",
    vegetarian: false
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
    .then(resp => resp.json())
    .then(pizzas => this.setState({pizzas: pizzas}))
  }

  setTopping = val =>{
    this.setState({
      topping: val
    })
  }

  setSize = val =>{
    this.setState({
      size: val
    })
  }

  setVegetarian = val =>{
    this.setState({
      vegetarian: val
    })
  }

  makePizza = () => {
    if(this.state.edit_id === 0){
      fetch("http://localhost:3000/pizzas",{
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topping: this.state.topping,
          size: this.state.size,
          vegetarian: this.state.vegetarian
        })
      })
      .then(resp => resp.json())
      .then(pizza => this.setState({pizzas: [...this.state.pizzas, pizza]}))
    }else{
      fetch(`http://localhost:3000/pizzas/${this.state.edit_id}`,{
        method: "PUT",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topping: this.state.topping,
          size: this.state.size,
          vegetarian: this.state.vegetarian
        })
      })
      .then(resp => resp.json())
      .then(pizza => {
        this.setState({pizzas: this.state.pizzas.map(item => { return item.id === pizza.id ? pizza : item })})
      })
    }
    
    this.setState({
      edit_id: 0,
      topping: "",
      size: "",
      vegetarian: false
    })
  }

  editPizza = pizza => {
    this.setTopping(pizza.topping)
    this.setSize(pizza.size)
    if(pizza.vegetarian){
      document.querySelector('input[value="Vegetarian"]').checked=true
      document.querySelector('input[value="Not Vegetarian"]').checked=false

    }else{
      document.querySelector('input[value="Vegetarian"]').checked=false
      document.querySelector('input[value="Not Vegetarian"]').checked=true
    }
    this.setState({
      edit_id: pizza.id
    })

  }


  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
        top={this.setTopping} 
        size={this.setSize} 
        veg={this.setVegetarian} 
        t={this.state.topping} 
        s={this.state.size} 
        v={this.state.vegetarian}
        makePizza={this.makePizza}
        />
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
