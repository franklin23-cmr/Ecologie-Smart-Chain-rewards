
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { getAllActions, payVoters, voteForAction } from '../../utils/EcoloSystemContractServices';
import { useAccount } from '../../hooks/useAccount';
import toast from 'react-hot-toast';


export default function HistoryActions({rows}) {
   
    const [hideNameColumn, setHideNameColumn] = React.useState(false)
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
    const {contract, account} = useAccount()
   const [reclaim , setReclaim] = useState(false)
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

const ReclaimGreenCoin = (params) =>{
  try {
    payVoters(contract, params?.row?.id ,params?.row?.greencoin || 0,account).then(async ()=>{
      setReclaim(true)  
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
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'proposer', headerName: 'addresse du client', width: 100 },
    { field: 'description', headerName: 'description', width: 200 },
    {
      field: 'voteCount',
      headerName: 'voteCount',
      width: 90,
    },
    {
      field: 'validated',
      headerName: 'validatede',
      sortable: false,
      width: 130,  
    },
    {
      field: 'greencoin',
      headerName: 'token green coin',
      sortable: false,
      width: 100,  
    },

    {
      flex: 0.001,
      minWidth: 80,
      field: 'actions1',
      headerName: ' votez',
      renderCell: params => {
        return (
          <>
          {params.row.validated ? <>
            <Button size='small' variant='contained' color='success' disabled >
            Action Valide 
          </Button>
          </> : <>
          
            <Button size='small' variant='outlined' color='secondary' onClick={()=>{HandlevoteForAction(params)}} >
              voter cette action 
          </Button></>
          }
        
          </>

        )
      }
    },

    {
      flex: 0.001,
      minWidth: 10,
      field: 'actions2',
      headerName: 'Reclamez',
      renderCell: params => {
        return (
          <>
          {params.row.validated && params.row.voteCount >=3 ? 
          <Button disabled={reclaim} size='small' variant='outlined' color='secondary'  onClick={()=>{ReclaimGreenCoin(params)}}>
            Reclamer ces Green Coin
          </Button> : 
          <Button disabled>
            Reclamer ces Green Coin
          </Button>
          }
        
          </>

        )
      }
    },
      
  ];
  

  return (

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
  );
}
