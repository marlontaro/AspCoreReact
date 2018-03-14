import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as ReactDOM from 'react-dom';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';

interface IModalReact {
    isOpen: boolean

}

export class ModalReact extends React.Component<RouteComponentProps<{}>, IModalReact > {

    constructor() {
        super();

        this.state = {
            isOpen: false
        };
    }

    onClickModal = (e) => {        
 
        this.setState({
            isOpen: true
        });
    };

    hideModal = () => {
        this.setState({
            isOpen: false
        });
    };

    public render() {

        return <div>
            <button type="button" className="btn btn-primary" onClick={this.onClickModal}>Modal React</button>

            <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
                <ModalHeader>
                  
                    <ModalTitle>Modal title</ModalTitle>
                    <ModalClose onClick={this.hideModal} />
                </ModalHeader>
                <ModalBody>
                    <p>Ab ea ipsam iure perferendis! Ad debitis dolore excepturi
                      explicabo hic incidunt placeat quasi repellendus soluta,
                      vero. Autem delectus est laborum minus modi molestias
                      natus provident, quidem rerum sint, voluptas!</p>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-default' onClick={this.hideModal}>
                        Close
                    </button>
                    <button className='btn btn-primary'>
                        Save changes
                    </button>
                </ModalFooter>
            </Modal>
        </div>;
    }

}