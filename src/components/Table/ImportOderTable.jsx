import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import DetailsDropdown from "../Dropdown/DetailsDropdown";
import { IconButton, Tooltip } from "@mui/material";
import { UilPen } from '@iconscout/react-unicons'
import CreateImportOderModal from "../CreateModal/CreateImportOderModal";
import { useState } from "react";
import { importoderAPI } from "../../api/axios";
import UpdateImportOderModal from "../UpdateModal/UpdateImportOderModal";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
import { numberWithCommas } from "../../utils/FormatPrice";
import { Dropdown } from "react-bootstrap";
import ImportOderDetailModal from "../DetailsModal/ImportOderDetailModal";


export default function ImportOderTable() {
  const [isLoading, setIsLoading] = useState(false)
  const [importoders, setImportOders] = useState([])

  const [isShowCreateForm, setIsShowCreateForm] = useState(false)
  const [isShowUpdateForm, setIsShowUpdateForm] = useState(false)
  const [isShowDeleteForm, setIsShowDeleteForm] = useState(false)
  const [isShowDetailModal, setIsShowDetailModal] = useState(false)

  const [clickedElement, setClickedElement] = useState(null)

  const [errorCreatingMessage, setErrorCreatingMessage] = useState(null)
  const [errorUpdatingMessage, setErrorUpdatingMessage] = useState(null)
  

  useEffect(() => {
    setIsLoading(true)
    async function getStartingImportOders() {
      try {
        const res = await importoderAPI.getAll()
        const startingImportOders = res.data
        setImportOders(startingImportOders)
        setIsLoading(false)
      } catch (error) {
        alert(error.toString())
      }
    }
    getStartingImportOders()
  }, [])


  async function handleCreateImportOder(form) {
    setErrorCreatingMessage(null)
    setIsShowCreateForm(false)
    setIsLoading(true)
    try {
      const formData = new FormData(form)
      const res = await importoderAPI.create(formData)
      setImportOders([...importoders, res.data])
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorCreatingMessage(error.response.data.message)
        setIsShowCreateForm(true)
        return
      }
      alert(error.toString())
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateImportOder(form) {
    setErrorUpdatingMessage(null)
    setIsShowUpdateForm(false)
    setIsLoading(true)
    try {
      const formData = new FormData(form)
      const res = await importoderAPI.update(clickedElement._id, formData)
      const newImportOders = importoders.filter(p => p._id !== clickedElement._id)
      newImportOders.push(res.data)
      setImportOders(newImportOders)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorUpdatingMessage(error.response.data.message)
        setIsShowUpdateForm(true)
        return
      }
      alert(error.toString())
    } finally {
      setIsLoading(false)
    }
  }

  function handleUpdatingImportOderDetail(updatedImportOderDetail) {
    const newImportOders = importoders.map(
      p => {
        const oldImportOderDetailsLength = p.r_importoderDetails.length
        if (oldImportOderDetailsLength <= 0)
          return p
        const filterImportOderDetails = p.r_importoderDetails.filter(detail => detail._id !== updatedImportOderDetail._id)
        if (filterImportOderDetails.length <= oldImportOderDetailsLength) {
          filterImportOderDetails.unshift(updatedImportOderDetail)
          const updatedImportOder = { ...p, r_importoderDetails: filterImportOderDetails }
          setClickedElement(updatedImportOder)
          return updatedImportOder
        }
        return p
      })
    setImportOders(newImportOders)
  }

  return (
    isLoading ?
      <Loading /> :
      <>
        {/* Show Table  */}
        <div className="Table">
          <div className="Table__header">
            <h1>ImportOder</h1>
            <Tooltip title="Create ImportOder" onClick={() => { setIsShowCreateForm(true) }}>
              <IconButton>
                <UilPen />
              </IconButton>
            </Tooltip>
          </div>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650, overflowY: "scroll" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">description</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Trademark</TableCell>
                  <TableCell align="left">Color-Size</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {importoders.map((importoder) => (
                  <TableRow
                    key={importoder._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ height: "100%" }}
                  >
                    <TableCell component="th" scope="row">
                      {importoder._id}
                    </TableCell>
                    <TableCell align="left">{importoder.r_user.name}</TableCell>
                    <TableCell align="left">{numberWithCommas(importoder.totalPrice)}</TableCell>
                    <TableCell align="left">{importoder.name}</TableCell>
                    
                    
                    <TableCell align="left">
                      {
                        <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {
                              importoder.r_importodertDetails.map(detail => (
                                <Dropdown.Item key={detail._id}>{`${detail.color}-${detail.size}`}</Dropdown.Item>
                              ))
                            }
                          </Dropdown.Menu>
                        </Dropdown>
                      }
                    </TableCell>
                    <TableCell align="left" className="Details">
                      <DetailsDropdown
                        clickedElement={importoder}
                        onDetailClick={(importoder) => {
                          setClickedElement(importoder)
                          setIsShowDetailModal(true)
                        }}
                        setUpdatingElement={(updatingImportOder) => {
                          setClickedElement(updatingImportOder)
                          setIsShowUpdateForm(true)
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* Create, Update, Delete modal*/}
        <CreateImportOderModal
          isShow={isShowCreateForm}
          onClose={() => { setIsShowCreateForm(false) }}
          onCreateImportOder={handleCreateImportOder}
          errorMessage={errorCreatingMessage}
        />
        <UpdateImportOderModal
          isShow={isShowUpdateForm}
          onClose={() => { setIsShowUpdateForm(false) }}
          onUpdateImportOder={handleUpdateImportOder}
          updatingImportOder={clickedElement}
          errorMessage={errorUpdatingMessage}
        />
        <ImportOderDetailModal
          onUpdatingImportOderDetail={handleUpdatingImportOderDetail}
          isShow={isShowDetailModal}
          importoder={clickedElement}
          onClose={() => { setIsShowDetailModal(false) }}
        />
      </>
  );
}
