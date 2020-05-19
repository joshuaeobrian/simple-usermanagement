import React from "react";
import "./Table.scss"

/**
 * @description generates a table cell
 * @param props
 */
export const TCell: React.FC = (props) => {
    return (
        <div className="table_cell">
            {props.children}
        </div>
    );
}
/**
 * @description generates a table row
 * @param props
 */
export const TRow: React.FC = (props) => {
    return (
        <div className="table_row">
            {props.children}
        </div>
    );
}
/**
 * @description generates a table Header
 * @param props
 */
export const THeader: React.FC = (props) => {
    return (
        <div className="table_header">
            <TRow>{props.children}</TRow>
        </div>
    );
}
/**
 * @description generates a table body
 * @param props
 */
export const TBody: React.FC = (props) => {
    return (
        <div className="table_body">
            {props.children}
        </div>
    );
}
/**
 * @description generates a table layout
 * @param props
 */
const Table: React.FC = (props) => {
    return (
        <div className="table">
            {props.children}
        </div>
    );
}

export default Table
