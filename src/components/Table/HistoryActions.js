// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Third Party Components
import toast from 'react-hot-toast'


const statusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

// ** Full Name Getter
const getFullName = params =>
  toast(
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
      
        </Typography>
      </Box>
    </Box>
  )

const HistoryActionsTable = ({rows}) => {
  // ** States
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  console.log(rows[0])
  const columns = [
    {
        flex: 0.08,
        field: 'id',
        minWidth: 30,
        headerName: 'id',
        renderCell: params => (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {console.log(params)}
          </Typography>
        )
      },
    {
      flex: 0.15,
      minWidth: 100,
      field: 'description',
      headerName: 'description',
      renderCell: params => {
        console.log(params)

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              </Typography>
              <Typography noWrap variant='caption'>
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.175,
      minWidth: 100,
      headerName: 'proposer',
      field: 'proposer',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'voteCount',
      headerName: 'voteCount',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params?.description}
        </Typography>
      )
    },

    {
      flex: 0.2,
      minWidth: 140,
      field: 'voters',
      headerName: 'voters',
      renderCell: params => {
        return (
            <>
            {params?.voteCount}
            </>
        )
      }
    },
    {
        flex: 0.15,
        minWidth: 110,
        field: 'validated',
        headerName: 'validated',
        renderCell: params => (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {params.row.salary}
          </Typography>
        )
      },
  
    {
      flex: 0.125,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => {
        return (
          <Button size='small' variant='outlined' color='secondary' onClick={() => getFullName(params)}>
            voters
          </Button>
        )
      }
    }
  ]

  return (
    <Card>

      <DataGrid
        autoHeight
        rows={[]}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        initialState={{ columns: { columnVisibilityModel: { full_name: hideNameColumn } } }}
      />
    </Card>
  )
}

export default HistoryActionsTable
