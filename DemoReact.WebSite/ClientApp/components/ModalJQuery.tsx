import * as React from 'react';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';
import { RouteComponentProps } from 'react-router';

var ModalHeader = React.createClass<{ title: string }, {}>({
    render: function () {
        return (
            <div className="modal-header">
                {this.props.title}
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
});

var ModalBody = React.createClass<{ content: string }, {}>({

    render: function () {
        return (
            <div className="modal-body">
                {this.props.content}
            </div>
        )
    }
});

var ModalFooter = React.createClass({
    render: function () {
        return (
            <div className="modal-footer">
                <button type="button" className="btn btn-primary">Submit</button>
            </div>
        )
    }
});

var Modal = React.createClass({
    render: function () {
        return (<div className="modal fade" id="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <ModalHeader title="Modal Title" />
                    <ModalBody content="Modal Content" />
                    <ModalFooter />
                </div>
            </div>
        </div>)
    }
});

export class ModalJQuery extends React.Component<RouteComponentProps<{}>, { isOpen: boolean }> {

    constructor() {
        super();
    }

    onClickModal = (e) => {
        $("#modal").modal();
    }

    public render() {

        return <div>
            <button type="button" className="btn btn-primary" onClick={this.onClickModal}>Modal JQuery</button>
            <Modal ref="modal" />
        </div>;
    }
}