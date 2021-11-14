import React from "react";
import { Link } from "@inertiajs/inertia-react";

const Pagination = ({ links }) => {
    if (links.length === 3) return null;

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    {links.map(({ url, active, label }) => {
                        return url === null && label !== "..." ? (
                            <div key={label}></div>
                        ) : (
                            <li
                                className={
                                    active == true
                                        ? "page-item active"
                                        : "page-item"
                                }
                                key={label}
                            >
                                <Link
                                    className="page-link"
                                    href={url}
                                    preserveScroll
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: label,
                                        }}
                                    ></span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
