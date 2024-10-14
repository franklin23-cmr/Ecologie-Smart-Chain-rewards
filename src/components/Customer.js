import React, { useState } from 'react'

import { useAccount } from '../hooks/useAccount'
import AppAppBar from './AppBar'
import { Button, Container, Divider, Grid, Typography } from '@mui/material'
import CardSupport from './Card/CardEco'
import CardMobilite from './Card/CardMobilite'
import CardReboissement from './Card/CardReboissement'
import CardRecyclage from './Card/CardRecyclage'
import { getActionDetails, getAllActions } from '../utils/EcoloSystemContractServices'
import HistoryActionsTable from './Table/HistoryActions'

function Customer() {
  const {account, contract} = useAccount()

  const [actions , setActions] = useState([])

  const fetchActions = async () => {
    if (contract) {
        //  const actions =  await getActionDetails(contract, '1')
        const actions =  await getAllActions(contract)
        console.log('action wie', actions)
        setActions(actions)
    }
};

const extractDataFromProxy = (actions) => {

  const data = actions.map((action, index) => ({
      id: index + 1,                           
      proposer: action?.proposer,              
      description: action?.description,              
      voteCount: action?.voteCount,                   
      validated: action?.validated,
    }));
  

return data
};


//   useEffect(() => {
//     const handleAccountChanged = (newAccounts) =>
//       setAccount(newAccounts.length > 0 ? newAccounts[0] : null);
//     if (window.ethereum) {
//       window.ethereum.on("accountsChanged", handleAccountChanged);
//     }
//     return () => {
//       window.ethereum?.removeListener("accountsChanged", handleAccountChanged);
//     };
//   });
  
  return (
    <div >   
      <AppAppBar  contrat_adresse={account}/>
    
      <Container >
      <Typography variant="h2"  sx={{textAlign: 'center' , m: 5}}> Nos actions ecologiques </Typography>

        <Grid container spacing={2}>
        <Grid item xs={4}>
            <CardRecyclage/>
          </Grid>
          <Grid item  xs={4}>
            <CardMobilite/>
          </Grid>
          <Grid item xs={4}>
            <CardReboissement/>
          </Grid>
        </Grid>
        
      </Container>

      <Container>
      <Divider sx={{m: 3}}/>
      <Typography variant="h2"  sx={{textAlign: 'center' , m: 3}}> Historique Et Etats des Actions </Typography>
      <Divider sx={{m: 3}}/>
      <h2>Existing Actions</h2>
      <Button variant='contained' sx={{}} onClick={fetchActions}>Refresh Actions</Button>

     <>             
    <ul>
      {actions.map((action, index) => (
          <li key={index}>
             {console.log('action', action)}
             <p>{action.description} (Votes: {action.voteCount})</p>
        </li>
              ))}
          </ul> 
          </>
        {/* <HistoryActionsTable rows={extractDataFromProxy(actions)}></HistoryActionsTable> */}
    </Container>

  </div>
  )
}

export default Customer