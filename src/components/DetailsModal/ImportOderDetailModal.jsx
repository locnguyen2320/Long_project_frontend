import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Card, Button, Row, Col } from "react-bootstrap";
import UpdateImportOderDetailModal from "../UpdateModal/UpdateImportOderDetailModal";
import CreateImportOderDetailModal from "../CreateModal/CreateImportOderDetailModal";
import { importoderDetailAPI } from "../../api/axios";
import axios from "axios";
import Loading from "../Loading/Loading";
import { IconButton, Tooltip } from "@mui/material";
import { UilPen } from "@iconscout/react-unicons";

ImportOderDetailModal.propTypes = {
  isShow: PropTypes.bool,
  onClose: PropTypes.func,
  importoder: PropTypes.object,
};

function ImportOderDetailModal(props) {
  const { isShow, onClose, importoder, onUpdatingImportOderDetail } = props;
  const [importoderdetails, setImportOderDetails] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [clickedElement, setClickedElement] = useState(null);

  const [isShowUpdateForm, setIsShowUpdateForm] = useState(false);
  const [isShowCreateForm, setIsShowCreateForm] = useState(false);

  const [errorUpdatingMessage, setErrorUpdatingMessage] = useState(null);
  const [errorCreatingMessage, setErrorCreatingMessage] = useState(null);

  async function handleUpdateImportOderDetail(form) {
    setErrorUpdatingMessage(null);
    setIsShowUpdateForm(false);
    setIsLoading(true);
    try {
      const formData = new FormData(form);
      const res = await importoderDetailAPI.update(clickedElement._id, formData);
      if (onUpdatingImportOderDetail) onUpdatingImportOderDetail(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorUpdatingMessage(error.response.data.message);
        setIsShowUpdateForm(true);
        return;
      }
      alert(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateImportOderDetail(form) {
    setErrorCreatingMessage(null);
    setIsShowCreateForm(false);
    setIsLoading(true);
    try {
      const formData = new FormData(form);
      const res = await importoderDetailAPI.create(formData);
      setImportOderDetails([...importoderdetails, res.data]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorCreatingMessage(error.response.data.message);
        setIsShowCreateForm(true);
        return;
      }
      alert(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    if (onClose) onClose();
  }

  return (
    importoder != null && (
      <>
        <Modal size="xl" show={isShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{importoder.id}</Modal.Title>
            <Tooltip
              title="Create ImportOder Detail"
              onClick={() => {
                setIsShowCreateForm(true);
              }}
            >
              <IconButton>
                <UilPen />
              </IconButton>
            </Tooltip>
          </Modal.Header>
          <Modal.Body>
            {isLoading ? (
              <Loading />
            ) : (
              <Row xs={1} md={3} className="g-4">
                {importoder.r_importoderDetails.map((detail) => (
                  <Col key={detail._id}>
                    <Card style={{ width: "15rem" }}>
                      <Card.Img
                        style={{ height: "150px" }}
                        variant="top"
                        src={`${window.env.CLOUDINARY_URL}/${detail.img}`}
                      />
                      <Card.Body>
                        <Card.Title>{`Color: ${detail.color}`}</Card.Title>
                        <Card.Title>{`Size: ${detail.size}`}</Card.Title>
                        <Button
                          onClick={() => {
                            setClickedElement(detail);
                            setIsShowUpdateForm(true);
                          }}
                          variant="primary"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => {
                            setClickedElement(detail);
                          }}
                          style={{ marginLeft: "6px" }}
                          variant="primary"
                        >
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Modal.Body>
        </Modal>
        <UpdateImportOderDetailModal
          updatingImportOderDetail={clickedElement}
          errorMessage={errorUpdatingMessage}
          onUpdateImportOderDetail={handleUpdateImportOderDetail}
          isShow={isShowUpdateForm}
          onClose={() => {
            setIsShowUpdateForm(false);
          }}
        />
        <CreateImportOderDetailModal
          creatingImportOderDetail={clickedElement}
          errorMessage={errorCreatingMessage}
          onCreateImportOderDetail={handleCreateImportOderDetail}
          isShow={isShowCreateForm}
          onClose={() => {
            setIsShowCreateForm(false);
          }}
        />
      </>
    )
  );
}
export default ImportOderDetailModal;
