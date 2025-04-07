import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import { modalStyle } from "../styles/globalStyles"
import TextField from "@mui/material/TextField"
import useStockCall from "../hooks/useStockCall"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function SaleModal({ open, handleClose, info, setInfo }) {
  const navigate = useNavigate()
  const { postStockData, putStockData } = useStockCall()
  const { products, brands } = useSelector((state) => state.stock)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInfo({ ...info, [name]: value }) // sadece ID tutuluyor
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const requestData = {
      ...info,
      brand_id: info.brand_id,
      product_id: info.product_id,
      quantity: Number(info.quantity),
      price: Number(info.price),
    }

    if (info.id) {
      putStockData("sales", requestData)
    } else {
      postStockData("sales", requestData)
    }

    handleClose()
    setInfo({})
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose()
        setInfo({})
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          component="form"
          onSubmit={handleSubmit}
        >
          <FormControl>
            <InputLabel id="brand-select-label">Brand</InputLabel>
            <Select
              labelId="brand-select-label"
              label="Brand"
              name="brand_id"
              value={info.brand_id || ""}
              onChange={handleChange}
              required
            >
              <MenuItem onClick={() => navigate("/stock/brands")}>
                Add New Brand
              </MenuItem>
              <hr />
              {brands?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="product-select-label">Product</InputLabel>
            <Select
              labelId="product-select-label"
              label="Product"
              name="product_id"
              value={info.product_id || ""}
              onChange={handleChange}
              required
            >
              <MenuItem onClick={() => navigate("/stock/products")}>
                Add New Product
              </MenuItem>
              <hr />
              {products?.map
