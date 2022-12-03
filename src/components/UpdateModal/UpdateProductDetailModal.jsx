import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { Alert } from '@mui/material';
import { ProductDetailSizes, ProductDetailColors } from "../../Data/Data";

UpdateProductDetailModal.propTypes = {
    isShow: PropTypes.bool,
    setIsShow: PropTypes.func,
    onUpdateProduct: PropTypes.func,
};

function UpdateProductDetailModal(props) {

    const { isShow, onClose, onUpdateProductDetail, updatingProductDetail, errorMessage } = props

    function handleClose() {
        if (onClose)
            onClose()
    }

    function handleUpdateProduct(e) {
        e.preventDefault()
        if (onUpdateProductDetail)
            onUpdateProductDetail(e.target)
    }

    return (
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            {errorMessage ?
                errorMessage.split("---").map((err, index) => <Alert key={index} severity="error">{err}</Alert>) :
                <></>
            }
            <Form onSubmit={handleUpdateProduct} encType="multipart/form-data">
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Size</Form.Label>
                        <Form.Select 
                            defaultValue={
                                updatingProductDetail !== undefined && updatingProductDetail !== null ?
                                updatingProductDetail.size:
                                 ""
                                } name="size" aria-label="Select Size">
                            {
                                ProductDetailSizes.map((size, index) => {
                                    return (<option key={index} value={size}>{size}</option>)
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Color</Form.Label>
                        <Form.Select 
                            defaultValue={
                                updatingProductDetail !== undefined && updatingProductDetail !== null? 
                                updatingProductDetail.color: 
                                ""
                            } name="color" aria-label="Select Color">
                            {
                                ProductDetailColors.map((color, index) => {
                                    return (<option key={index} value={color}>{color}</option>)
                                })
                            }
                        </Form.Select>
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

export default UpdateProductDetailModal;