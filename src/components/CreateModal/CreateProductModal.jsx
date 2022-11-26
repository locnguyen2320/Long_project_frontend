import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { Alert } from '@mui/material';


CreateProductModal.propTypes = {
    isShow: PropTypes.bool,
    setIsShow: PropTypes.func,
    onCreateProduct: PropTypes.func,
};

function CreateProductModal(props) {
    const { isShow, onClose, onCreateProduct, errorMessage } = props

    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleCreateProduct(e) {
        e.preventDefault()
        if (onCreateProduct)
            onCreateProduct(e.target)
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Product</Modal.Title>
            </Modal.Header>
            {errorMessage ?
                errorMessage.split("---").map((err, index) => <Alert key={index} severity="error">{err}</Alert>) :
                <></>
            }
            <Form onSubmit={handleCreateProduct} encType="multipart/form-data">

                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Type product name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Type product description" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="img" type="file" accept=".png, .jpg, .jpeg" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Danh mục sản phẩm</option>
                            <option value="1">Giày nam</option>
                            <option value="2">Giày nữ</option>
                            <option value="3">Giày trẻ em</option>
                        </select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Group className="mb-3">
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Thương hiệu</option>
                            <option value="1">Nike</option>
                            <option value="2">Biti's</option>
                            <option value="3">Adidafuk</option>
                        </select>
                    </Form.Group>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CreateProductModal;