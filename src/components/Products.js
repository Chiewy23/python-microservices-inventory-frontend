import { Wrapper } from "./Wrapper"
import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };

        this.setProducts = this._setProducts.bind(this);
        this.deleteProduct = this._deleteProduct.bind(this);
    }

    componentDidMount = async () => {
        await fetch("http://localhost:8000/products")
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            this.setProducts(jsonResponse);
        })
        .catch(err => {
            console.log(`Error retrieving products: ${err}`);
        });
    }

    _setProducts = (newProducts) => {
        this.setState({
            products: newProducts
        });
    }

    _deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            await fetch(`http://localhost:8000/products/${id}`, {
                method: "DELETE"
            });

            this.setProducts(this.state.products.filter(p => p.id !== id));
        }
    }

    render = () => {
        return (
            <Wrapper>
                <div className="pt-3 pb-2 mb-3 border-bottom">
                    <Link to={"/create"} className="btn btn-sm btn-outline-secondary">Add</Link>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map(product => {
                                return <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-secondary"
                                            onClick={e => this.deleteProduct(product.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        )
    }
}

export default Products;