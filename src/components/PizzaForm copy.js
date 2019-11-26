import React from "react"

//import { realpathSync } from "fs"

class PizzaForm extends React.Component{

  state = {
    id: -1,
    topping: "",
    size: "",
    vegetarian: false
  }

  componentDidUpdate(prevProps){
    if( JSON.stringify(prevProps.pizza) !== JSON.stringify(this.props.pizza)){
      console.log("current props", this.props.pizza)
      console.log("prev props", prevProps.pizza)
      this.setState({
        id: this.props.pizza.id,
        topping: this.props.pizza.topping,
        size: this.props.pizza.size,
        vegetarian: this.props.pizza.vegetarian
      })
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleVegChange = (e) => {
    if(e.target.name === "vegetarian"){
      this.setState({
        vegetarian: e.target.checked
      })
    }else{
      this.setState({
        vegetarian: !e.target.checked
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log("submitting... state = ", this.state)
    this.props.updatePizza({...this.state})
  }

 
  
  render(){
    console.log("rendering the form...props are ", this.props)
    console.log("sate = ", this.state)
    return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" placeholder="Pizza Topping" 
            value={this.state.topping}
            name="topping"
            onChange={this.handleChange}/>
        </div>
        <div className="col">
          <select value={this.state.size} name="size" className="form-control" onChange={this.handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" 
            checked={this.state.vegetarian}
            onChange={this.handleVegChange}
            name="vegetarian"/>
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" 
            checked={!this.state.vegetarian}
            onChange={this.handleVegChange}
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
