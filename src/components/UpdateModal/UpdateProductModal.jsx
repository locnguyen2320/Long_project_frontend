import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { Alert } from '@mui/material';

UpdateProductModal.propTypes = {
    isShow: PropTypes.bool,
    setIsShow: PropTypes.func,
    onUpdateProduct: PropTypes.func,
};

function UpdateProductModal(props) {
    const { isShow, onClose, onUpdateProduct, updatingProduct, errorMessage } = props

    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleUpdateProduct(e) {
        e.preventDefault()
        if (onUpdateProduct)
            onUpdateProduct(e.target)
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            {errorMessage ?
                errorMessage.split("---").map((err,index) => <Alert key={index} severity="error">{err}</Alert>) :
                <></>
            }
            <Form onSubmit={handleUpdateProduct} encType="multipart/form-data">
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control defaultValue={updatingProduct ? updatingProduct.name : ""} name="name" type="text" placeholder="Type product name"  required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="img" type="file" accept=".png, .jpg, .jpeg" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default UpdateProductModal;