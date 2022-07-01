import { DataGrid, ptBR } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

function customCheckbox(theme) {
    return {
        "& .MuiCheckbox-root svg": {
            width: 16,
            height: 16,
            backgroundColor: "transparent",
            border: `1px solid ${
                theme.palette.mode === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
            }`,
            borderRadius: 2,
        },
        "& .MuiCheckbox-root svg path": {
            display: "none",
        },
        "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
            backgroundColor: "#ffba08",
            borderColor: "#ffba08",
        },
        "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
            position: "absolute",
            display: "table",
            border: "2px solid #fff",
            borderTop: 0,
            borderLeft: 0,
            transform: "rotate(45deg) translate(-50%,-50%)",
            opacity: 1,
            transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
            content: '""',
            top: "50%",
            left: "39%",
            width: 5.71428571,
            height: 9.14285714,
        },
        "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
            {
                width: 8,
                height: 8,
                backgroundColor: "#ffba08",
                transform: "none",
                top: "39%",
                border: 0,
            },
    };
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    color: "grey",
    fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(","),
    WebkitFontSmoothing: "auto",
    letterSpacing: "normal",
    "& .MuiDataGrid-iconSeparator": {
        display: "none",
    },
    ...customCheckbox(theme),
}));

export default function List({ rows, columns }) {
    const formattedColumns = columns.map((column) => ({
        ...column,
        headerAlign: column.headerAlign ? column.headerAlign : "center",
        align: column.align ? column.align : "center",
        width: column.width ? column.width : "200",
    }));

    const formattedRows = rows.map((row, rowIndex) => ({
        ...row,
        id: rowIndex,
    }));

    return (
        <Box sx={{ height: 400, width: "100%", margin: 3 }}>
            <StyledDataGrid
                columns={formattedColumns}
                rows={formattedRows}
                checkboxSelection
                pageSize={20}
                rowsPerPageOptions={[5, 20, 50, 100, 200, 500]}
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
    );
}
