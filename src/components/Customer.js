import React, { useState } from 'react'

import { useAccount } from '../hooks/useAccount'
import AppAppBar from './AppBar'
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material'
import CardSupport from './Card/CardEco'
import CardMobilite from './Card/CardMobilite'
import CardReboissement from './Card/CardReboissement'
import CardRecyclage from './Card/CardRecyclage'
import { getActionDetails, getAllActions, checkRewardsBalance } from '../utils/EcoloSystemContractServices'
import HistoryActionsTable from './Table/HistoryActions'
import CardInfo from './Card/CardInfo'

function Customer() {
  const {account, contract} = useAccount()
  const [coin , setcoin] = useState(0)
  const [actions , setActions] = useState([])

  const fetchActions = async () => {
    if (contract) {
        //  const actions =  await getActionDetails(contract, '1')
        const actions =  await getAllActions(contract)
        console.log('action ', actions)

        console.log('action target', actions.target)
        setActions(actions)
    }
};


const checkBalance = async () => {
  try {
    if (contract) {
      const balance = await checkRewardsBalance(contract,account);
      setcoin(balance)
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du solde :", error);
  }
};
const extractDataFromProxy = (actions) => {

  const data = actions.map((action, index) => ({
      id: index + 1,                           
      proposer: action?.proposer,              
      description: action?.description,              
      voteCount: Number(action?.voteCount),                    
      validated: action?.validated,
      greencoin: Number(action?.rewardPoints)
    }));
  

return data || []
};

console.log('extractDataFromProxy(actions)', extractDataFromProxy(actions))
console.log('actions', actions[0] ,extractDataFromProxy(actions))

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
      <Box sx={{mt: 10 , width: '350px'}}>
          <CardInfo coin={coin} handleRefrech={checkBalance}/>
      </Box>
      </Container>
      
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

        <HistoryActionsTable rows={extractDataFromProxy(actions)}></HistoryActionsTable>
    </Container>

  </div>
  )
}

export default Customer