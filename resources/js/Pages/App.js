import React from "react";
import Navbar from "../Shared/Navbar";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import Pagination from "../Shared/Pagination";

const App = (props) => {
    const { errors, products } = props;

    const handleEdit = (id) => {
        Inertia.visit(`/product/${id}/edit`, {
            method: "get",
            preserveState: true,
            preserveScroll: true,
        });
    };

    const successHandle = () => {
        toastr.success("Product Deleted!");
    };

    const handleDelete = (id) => {
        Inertia.visit(`/product/${id}`, {
            method: "delete",
            preserveState: true,
            preserveScroll: true,
            onSuccess: successHandle,
        });
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="d-flex justify-content-end">
                            <Link
                                href="/exportCSV"
                                className="btn btn-warning btn-sm mb-2"
                            >
                                Export CSV
                            </Link>
                        </div>
                        <div className="d-flex justify-content-center"></div>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Todo List</h3>
                            </div>

                            <div className="card-body">
                                <table className="table text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.data.map((product, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        {products.from + index}
                                                    </th>
                                                    <td>{product.title}</td>
                                                    <td>
                                                        {product.description}
                                                    </td>
                                                    <td>{product.price}</td>
                                                    <td>
                                                        <a
                                                            href="#"
                                                            className="fa fa-edit"
                                                            title="Edit Product"
                                                            style={{
                                                                color: "blue",
                                                            }}
                                                            onClick={() =>
                                                                handleEdit(
                                                                    product.id
                                                                )
                                                            }
                                                        ></a>
                                                        &nbsp;
                                                        <a
                                                            href="#"
                                                            className="fa fa-trash"
                                                            title="Delete Product"
                                                            style={{
                                                                color: "red",
                                                            }}
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product.id
                                                                )
                                                            }
                                                        ></a>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                <Pagination links={products.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
