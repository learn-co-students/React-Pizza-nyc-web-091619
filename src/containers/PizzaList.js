import React, { Component } from 'react';
import Pizza from '../components/Pizza'

class PizzaList extends Component {

  renderPizza = () => {
    return this.props.pizzas.map((pizza, index) => {
      return (
        <tr key={index}>
          <td>{pizza.topping}</td>
          <td>{pizza.size}</td>
          <td>{pizza.vegetarian ? "Yes": "No"}</td>
          <td><button onClick={() => this.props.editPizza(pizza)}>Edit Pizza</button></td>
        </tr>
      )
    })
  }


  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            this.renderPizza()
          }
        </tbody>
      </table>
    );
  }

}

export default PizzaList;
