import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import { Inertia } from "@inertiajs/inertia";

const Create = ({ errors }) => {
    const [values, setValues] = useState({
        title: "",
        description: "",
        price: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const successHandle = () => {
        toastr.success("Product Created!");
    };

    const errorHandle = () => {
        toastr.error("Check Errors");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const [title, description, price] = [
            values.title,
            values.description,
            values.price,
        ];

        Inertia.visit("/product", {
            method: "post",
            data: {
                title: title,
                description: description,
                price: price,
            },
            preventScroll: true,
            onSuccess: successHandle,
            onError: errorHandle,
        });
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <form className="row" onSubmit={handleSubmit}>
                    <div className="col-md-8 offset-2">
                        <label htmlFor="title" className="form-label">
                            Title:
                        </label>
                        <input
                            className="form-control"
                            name="title"
                            id="title"
                            onChange={(e) => handleChange(e)}
                            value={values.title}
                        />
                        {errors.title && (
                            <span className="text-danger">{errors.title}</span>
                        )}
                    </div>
                    <div className="col-md-8 offset-2">
                        <label htmlFor="description" className="form-label">
                            Description:
                        </label>
                        <textarea
                            className="form-control"
                            rows="6"
                            name="description"
                            id="description"
                            onChange={(e) => handleChange(e)}
                            value={values.description}
                        ></textarea>
                        {errors.description && (
                            <span className="text-danger">
                                {errors.description}
                            </span>
                        )}
                    </div>
                    <div className="col-md-8 offset-2">
                        <label htmlFor="price" className="form-label">
                            Price:
                        </label>
                        <input
                            className="form-control"
                            name="price"
                            id="price"
                            onChange={(e) => handleChange(e)}
                            value={values.price}
                        />
                        {errors.price && (
                            <span className="text-danger">{errors.price}</span>
                        )}
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-5">
                        <button type="submit" className="btn btn-primary">
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Create;
