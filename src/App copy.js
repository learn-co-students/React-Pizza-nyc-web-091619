import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
const URL = "http://localhost:3000/pizzas"

class App extends Component {

  state={
    currentPizza: null,
    pizzas: [],
    pizzaForm: null
  }

  // handleFormUpdate =(pizza)=>{
  //   this.setState({
  //     currentPizza: {...pizza}
  //   })
  // }
  

  updatePizza = (pizza) => {
  
    fetch(`${URL}/${pizza.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({...pizza})

    }).then(resp=> resp.json())
      .then(data => {
        console.log("Updated ", data)
        let oldIndex = this.state.pizzas.findIndex(piz => piz.id === pizza.id)
        let newPizzas = [...this.state.pizzas]
        newPizzas[oldIndex] = {...data}
        this.setState({
          pizzas: [...newPizzas],
          currentPizza: data
        })
      })
   }

  fillForm = (pizza) => {
    console.log("Setting current pizza to ", pizza)
    
    this.setState({
      currentPizza: {...pizza}
    })
  }

  componentDidMount(){
    fetch(URL)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          pizzas: data
        })
      })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.currentPizza} updatePizza={this.updatePizza}/>
        <PizzaList pizzas={this.state.pizzas} fillForm={this.fillForm}/>
      </Fragment>
    );
  }
}

export default App;
