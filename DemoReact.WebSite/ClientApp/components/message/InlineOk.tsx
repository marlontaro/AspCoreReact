import * as React from 'react';

const InlineOk = ({ text }) => (
    <div className="alert alert-success">
        <i className="fa fa-check" aria-hidden="true"></i> {" "}
        {text}
    </div>
);

export default InlineOk;