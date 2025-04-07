import React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import useStockCall from "../hooks/useStockCall"
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { modalStyle } from "../styles/globalStyles"

export default function PurchaseModal({ open, handleClose, info, setInfo }) {
  const navigate = useNavigate()
  const { postStockData, putStockData } = useStockCall()
  const { firms, products, brands } = useSelector((state) => state.stock)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInfo({ ...info, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // string id'den ilgili objeleri bul
    const selectedFirm = firms.find((firm) => firm.id === info.firm_id)
    const selectedBrand = brands.find((brand) => brand.id === info.brand_id)
    const selectedProduct = products.find((product) => product.id === info.product_id)

    const payload = {
      ...info,
      firm_id: selectedFirm,
      brand_id: selectedBrand,
      product_id: selectedProduct,
    }

    if (info.id) {
      putStockData("purchases", payload)
    } else {
      postStockData("purchases", payload)
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
          {/* Firm */}
          <FormControl>
            <InputLabel variant="outlined" id="firm-select-label">
              Firm
            </InputLabel>
            <Select
              labelId="firm-select-label"
              label="Firm"
              name="firm_id"
              value={info?.firm_id || ""}
              onChange={handleChange}
              required
            >
              <MenuItem onClick={() => navigate("/stock/firms")}>
                Add New Firm
              </MenuItem>
              <hr />
              {firms?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Brand */}
          <FormControl>
            <InputLabel variant="outlined" id="brand-select-label">
              Brand
            </InputLabel>
            <Select
              labelId="brand-select-label"
              label="Brand"
              name="brand_id"
              value={info?.brand_id || ""}
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

          {/* Product */}
          <FormControl>
            <InputLabel variant="outlined" id="product-select-label">
              Product
            </InputLabel>
            <Select
              labelId="product-select-label"
              label="Product"
              name="product_id"
              value={info?.product_id || ""}
              onChange={handleChange}
              required
            >
              <MenuItem onClick={() => navigate("/stock/products")}>
                Add New Product
              </MenuItem>
              <hr />
              {products?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Quantity */}
          <TextField
            label="Quantity"
            id="quantity"
            name="quantity"
            type="number"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={info?.quantity || ""}
            onChange={handleChange}
            required
          />

          {/* Price */}
          <TextField
            label="Price"
            id="price"
            name="price"
            type="number"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={info?.price || ""}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="contained" size="large">
            {info?.id ? "Update Purchase" : "Add New Purchase"}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
