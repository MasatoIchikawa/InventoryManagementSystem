import { React, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, jaJP } from '@mui/x-data-grid';

function CommonGrid({ rows, cols }){
    cols.forEach((a) => {
      a.headerAlign='center';
      a.headerClassName='datagrid-header';
      a.cellClassName='datagrid-cell';
      a.disableColumnMenu=true;
      a.sortable=false;
    });

    return (
        <>
        <Box
              sx={{
                height: 'calc(100vh - 190px)',
                width: '100%',
                '& .datagrid-header': {
                  borderBottom: 'solid 1px rgba(224, 224, 224, 1)',
                },
                '.datagrid-header, .datagrid-cell:not(:last-child)': {
                  borderRight: 'solid 1px rgba(224, 224, 224, 1) !important',
                  userSelect:'none',
                },
                '.MuiDataGrid-columnHeaders' : {
                  backgroundColor: '#65b2c6', 
                  color: '#fff',
                }
              }}>
            <DataGrid className='mstinventorygrid'
            rows={rows} 
            columns={cols}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
        </>
    );
}

export default CommonGrid;