import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inventory: {}
    };
  }

  componentDidMount() {
    axios.get('/api/inventory/'+this.props.match.params.id)
      .then(res => {
        this.setState({ inventory: res.data });
        console.log(this.state.inventory);
      });
  }

  onChange = (e) => {
    const state = this.state.inventory
    state[e.target.name] = e.target.value;
    this.setState({inventory:state});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { item_code, name1, name2, price, vendor_name,date=new Date() } = this.state.inventory

    axios.put('/api/inventory/'+this.props.match.params.id, { item_code,name1,name2,price,vendor_name,date })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT Inventory
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.inventory._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> inventory List</Link></h4>
            <form onSubmit={this.onSubmit}>
            <div class="form-group">
                <label for="item_code">Item Code:</label>
                <input type="text" class="form-control" name="item_code" value={this.state.inventory.item_code} onChange={this.onChange} placeholder="Item Code" />
              </div>
              <div class="form-group">
                <label for="name1">Name 1:</label>
                <input type="text" class="form-control" name="name1" value={this.state.inventory.name1} onChange={this.onChange} placeholder="Name 1" />
              </div>
              <div class="form-group">
                <label for="name2">Name 2 :</label>
                <input type="text" class="form-control" name="name2" value={this.state.inventory.name2} onChange={this.onChange} placeholder="Name 2" />
              </div>
              <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" class="form-control" name="price" value={this.state.inventory.price} onChange={this.onChange} placeholder="Price" />
              </div>
              <div class="form-group">
                <label for="vendor_name">Vendor Name:</label>
                <input type="text" class="form-control" name="vendor_name" value={this.state.inventory.vendor_name} onChange={this.onChange} placeholder="Vendor Name" />

              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
