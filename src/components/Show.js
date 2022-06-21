import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

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

  delete(id){
    console.log(id);
    axios.delete('/api/inventory/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {this.state.inventory.item_code}
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Invontory List</Link></h4>
            <dl>
              <dt>Item Code:</dt>
              <dd>{this.state.inventory.item_code}</dd>
              <dt>Name 1:</dt>
              <dd>{this.state.inventory.name1}</dd>
              <dt>Name 2:</dt>
              <dd>{this.state.inventory.name2}</dd>
              <dt>Price:</dt>
              <dd>{this.state.inventory.price}</dd>
              <dt>Vendor Name:</dt>
              <dd>{this.state.inventory.vendor_name}</dd>
            </dl>
            <Link to={`/edit/${this.state.inventory._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.inventory._id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
