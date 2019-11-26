import React from "react"

const PizzaForm = (props) => {

  

  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" onChange={props.changeTopping} name="topping" className="form-control" placeholder="Pizza Topping" value={
                //Pizza Topping Should Go Here
                props.topping
              }/>
        </div>
        <div className="col">
          <select value={props.pizaSize} onChange={props.changeSize} name="size" className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" onChange={props.changeRadioOption} checked={props.radioOption === "Vegetarian" ? true: null} />
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" onChange={props.changeRadioOption} checked={props.radioOption === "Not Vegetarian" ? true: null}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.formSubmit}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
