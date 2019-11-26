import React from "react"

//import { realpathSync } from "fs"

class PizzaForm extends React.Component{

  handleChange = (e) => {
    console.log("here!")
    if(e.target.name === "vegetarian"){
      this.props.handleFormUpdate("vegetarian", e.target.checked)

    }else if(e.target.name === "not-vegetarian"){
      this.props.handleFormUpdate("vegetarian", !e.target.checked)

    }else{
      this.props.handleFormUpdate(e.target.name, e.target.value)
    }
      
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.updatePizza()
  }
  
  render(){
    console.log("pizza props in pizzaForm =", this.props.pizza)
    return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" placeholder="Pizza Topping" 
            value={this.props.pizza.topping} onChange={this.handleChange} name="topping"/>
        </div>
        <div className="col">
          <select value={this.props.pizza.size} name="size" className="form-control" 
            onChange={this.handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" 
            checked={this.props.pizza.vegetarian}
            onChange={this.handleChange}
            name="vegetarian"/>
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" 
            checked={!this.props.pizza.vegetarian}
            onChange={this.handleChange}
            name="not-vegetarian"/>
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )


  }

}

export default PizzaForm
