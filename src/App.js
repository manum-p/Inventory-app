import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inventories: [],
      filter:""
    };
  }

  componentDidMount() {
    axios.get('/api/inventory')
      .then(res => {
        this.setState({ inventories: res.data });
        console.log(this.state.inventories);
      });
  }
  onFilter = (e) => {
const inventories = this.state.inventories
const filtered = inventories.filter(({item_code})=>item_code.toString().includes(this.state.filter))
    this.setState({ inventories:filtered});
    // axios.get('/api/inventory/filter/?str='+this.state.filter)
    // .then(res => {
    //   this.setState({ inventories: res.data });
    //   console.log({filter:this.state.inventories});
    // });
  }
  onFilterTextChange = (e) => {
    const state = this.state
    state.filter = e.target.value;
    this.setState(state);
  }


  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Inventories
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Inventory</Link></h4>
            <input type="text" class="form-control" name="filter" value={this.state.filter} onChange={this.onFilterTextChange} placeholder="Filter By Item Code" />
            <button type="button" onClick={this.onFilter} class="btn btn-default">Filter</button>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Item code</th>
                  <th>Name 1</th>
                  <th>Name 2</th>
                  <th>Price</th>
                  <th>Vendor Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.inventories.map(inventory =>
                  <tr>
                    <td><Link to={`/show/${inventory._id}`}>{inventory.item_code}</Link></td>
                    <td>{inventory.name1}</td>
                    <td>{inventory.name2}</td>
                    <td>{inventory.price}</td>
                    <td>{inventory.vendor_name}</td>
                    <td>{inventory.date}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
