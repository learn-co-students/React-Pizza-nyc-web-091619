import React, { Component } from "react";
import Pizza from "../components/Pizza"

class PizzaList extends Component {
  render() {
    const renderPizza = this.props.pizzaList.map(pizzaObj => {
      return (
        <Pizza
          key={pizzaObj.id}
          pizza={pizzaObj}
          setPizzaTopping={this.props.setPizzaTopping}
        />
      );
    });
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Topping</th>
            <th scope='col'>Size</th>
            <th scope='col'>Vegetarian?</th>
            <th scope='col'>Edit</th>
          </tr>
        </thead>
        <tbody>{renderPizza}</tbody>
      </table>
    );
  }
}

export default PizzaList;