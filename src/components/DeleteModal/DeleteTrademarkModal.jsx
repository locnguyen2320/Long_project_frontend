import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function DeleteTrademarkModal(props) {
    const { isShow, onClose, onDeleteTrademark, deletingTrademark } = props

    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleDeleteTrademark(e) {
        e.preventDefault()
        if (onDeleteTrademark)
            onDeleteTrademark()
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Trademark: {deletingTrademark!= null ? deletingTrademark.name: ""}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleDeleteTrademark}>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default DeleteTrademarkModal;