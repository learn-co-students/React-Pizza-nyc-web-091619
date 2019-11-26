import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  state={
    allPizza:[],
    topping:'',
    size:'',
    vegetarian:false,
    id:''
  }

  handleEdit=(pizza)=>{
    this.setState({
      topping:pizza.topping,
      size:pizza.size,
      vegetarian:pizza.vegetarian,
      id:pizza.id
    })
  
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(response=>response.json())
    .then(data=>{
      this.setState({
        allPizza:data
      })
    })
  }

  handleEditForm=(e)=>{
    if (e.target.name==="vegetarian" ){
      this.setState({vegetarian:!this.state.vegetarian})
    }else(
      this.setState({
        [e.target.name]:e.target.value
      })
    )
    
    }

    handleSubmit=()=>{

      if (this.state.id!==""){
        fetch('http://localhost:3000/pizzas/'+this.state.id,{
          method: "PATCH",
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
          },
          body:JSON.stringify({
            topping:this.state.topping,
            size:this.state.size,
            vegetarian:this.state.vegetarian
          })
        }).then(()=>this.componentDidMount())
      }
    }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm handleSubmit={this.handleSubmit} handleEditForm={this.handleEditForm} topping={this.state.topping} size={this.state.size} vegetarian={this.state.vegetarian}  />
        <PizzaList handleEdit={this.handleEdit} allPizza={this.state.allPizza}/>
      </Fragment>
    );
  }
}

export default App;
