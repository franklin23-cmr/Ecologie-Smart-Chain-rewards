
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { getAllActions, voteForAction } from '../../utils/EcoloSystemContractServices';
import { useAccount } from '../../hooks/useAccount';
import toast from 'react-hot-toast';


export default function HistoryActions({rows}) {
   
    const [hideNameColumn, setHideNameColumn] = React.useState(false)
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
    const {contract, account} = useAccount()

const HandlevoteForAction = (params) =>{
    try {
        voteForAction(contract, params?.row?.id , account).then(async ()=>{
            await getAllActions(contract)
            toast.success(`Vote ${params.id} enregistré avec succès !`)
        }).catch((error)=>{
            throw new Error(error)
        })
    } catch (error) {
        throw new Error(error)
    }
} 

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'proposer', headerName: 'addresse du client', width: 260 },
    { field: 'description', headerName: 'description', width: 260 },
    {
      field: 'voteCount',
      headerName: 'voteCount',
      width: 90,
    },
    {
      field: 'validated',
      headerName: 'validatede',
      sortable: false,
      width: 160,  },
      {
        flex: 0.125,
        minWidth: 140,
        field: 'actions',
        headerName: 'Actions',
        renderCell: params => {
          return (
            <Button size='small' variant='outlined' color='secondary' onClick={()=>{HandlevoteForAction(params)}} >
              voter cette action 
            </Button>
          )
        }
      }
  ];
  

  return (
    <Paper sx={{ height: 400, width: '100%' }}>

    <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        initialState={{ columns: { columnVisibilityModel: { full_name: hideNameColumn } } }}
      />
    </Paper>
  );
}
