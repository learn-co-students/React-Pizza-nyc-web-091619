import React from "react"

const PizzaForm = props => {
  const onToppingChange = e =>{
    e.persist()
    props.top(e.target.value)
  }
  const onSizeChange = e =>{
    e.persist()
    props.size(e.target.value)
    console.log(props.s)
  }
  const onVegetarianChange = e =>{
    e.persist()
    if(e.target.value === "Vegetarian"){
      props.veg(true)
    }else{
      props.veg(false)
    }
  }
  const makePizza = e => {
    e.preventDefault()
    props.makePizza()
  }
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" onChange={onToppingChange} className="form-control" placeholder="Pizza Topping" value={props.t}/>
        </div>
        <div className="col">
          <select onChange={onSizeChange} value={props.s} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div onChange={onVegetarianChange} className="col">
          <div className="form-check">
            <input className="form-check-input" name="vegornot" type="radio" value="Vegetarian" checked={null}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" name="vegornot" type="radio" value="Not Vegetarian" checked={null}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={makePizza}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
