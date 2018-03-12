import * as React from 'react';
 
const InlineError = ({ text }) => (
    <div className="alert alert-danger">
        <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>{" "}Errores
        <ul>
            {text.trim().split(".").map(function (item, i) {
                if (item.trim().length !== 0)
                    return (
                        <li> {item}. </li>
                    );
            })
            }
        </ul>
    </div>
);
 

export default InlineError;
