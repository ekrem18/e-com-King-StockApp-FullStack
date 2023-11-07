import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { btnStyle } from "../styles/globalStyles";
import useStockCall from "../hooks/useStockCall";

export default function ProductTable() {
  const { products } = useSelector((state) => state.stock);
  const { deleteStockData } = useStockCall();

  const columns = [
    {
      field: "id",
      headerName: "#",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "category",
      valueGetter: (params) => params.row.category_id?.name,      //---> senkronda sıkıntı yaşadığım için category olarak tanımladıım birşey yok ona dair bilgiyi 
      headerName: "Category",                                   //---> row.category_id?.name ' den al diyorum
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      minWidth: 80,
    },
    {
      field: "brand",
      valueGetter: (params) => params.row.brand_id?.name,
      headerName: "Brand",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      // editable: true,
      headerAlign: "center",
      align: "center",
      getActions: (props) => [
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          label="Delete"
          sx={btnStyle}
          onClick={() => deleteStockData("products", props.id)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <DataGrid
        autoHeight
        rows={products}
        columns={columns}
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 5,
        //     },
        //   },
        // }}
        // pageSize= {10}
        pageSizeOptions={[10,20,75,100]}
        disableRowSelectionOnClick
        slots= {{toolbar: GridToolbar}}
      />
    </Box>
  );
}
