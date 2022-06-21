import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      item_code: '',
      name1: '',
      name2: '',
      price: '',
      vendor_name: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { item_code, name1, name2, price, vendor_name } = this.state;

    axios.post('/api/inventory', { item_code, name1, name2, price, vendor_name })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const {item_code,name1,name2,price,vendor_name } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD Inventory
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Inventory List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="item_code">Item Code:</label>
                <input type="text" class="form-control" name="item_code" value={item_code} onChange={this.onChange} placeholder="Item Code" />
              </div>
              <div class="form-group">
                <label for="name1">Name 1:</label>
                <input type="text" class="form-control" name="name1" value={name1} onChange={this.onChange} placeholder="Name 1" />
              </div>
              <div class="form-group">
                <label for="name2">Name 2 :</label>
                <input type="text" class="form-control" name="name2" value={name2} onChange={this.onChange} placeholder="Name 2" />
              </div>
              <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" class="form-control" name="price" value={price} onChange={this.onChange} placeholder="Price" />
              </div>
              <div class="form-group">
                <label for="vendor_name">Vendor Name:</label>
                <input type="text" class="form-control" name="vendor_name" value={vendor_name} onChange={this.onChange} placeholder="Vendor Name" />

              </div>

              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
