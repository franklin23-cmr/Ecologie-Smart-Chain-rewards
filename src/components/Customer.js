import React from 'react'
import ContractInfo from './ContractInfo'
import ContractActions from './ContractActions'
import { useAccount } from '../hooks/useAccount'
import AppAppBar from './AppBar'
import { AppBar, Container, Divider, Grid, Typography } from '@mui/material'
import CardSupport from './Card/CardEco'
import CardMobilite from './Card/CardMobilite'
import CardReboissement from './Card/CardReboissement'
import CardRecyclage from './Card/CardRecyclage'

function Customer() {
  const {account} = useAccount()
  console.log('mmy account id', account)

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
      <Container  sx={{mt: 20 }}>
      <Grid container  spacing={5} justifyContent='center' justifyItems="center" >
              <Grid item  xs={6}>
                <CardSupport/>
              </Grid>
          </Grid>
    </Container>

      <Container >
      <Typography variant="h2"  sx={{textAlign: 'center' , m: 3}}> Nos actions ecologiques </Typography>

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
          {/* <Grid item xs={8}>
            <CardSupport/>
          </Grid>
        
          <Grid item xs={4}>
            <CardSupport/>
          </Grid> */}
        </Grid>
        
      </Container>

      <Container>
      <Divider sx={{m: 3}}/>
      <Typography variant="h2"  sx={{textAlign: 'center' , m: 3}}> Historique Et Etats des Actions </Typography>
      <Divider sx={{m: 3}}/>
      <Grid container  spacing={5} >
          <Grid item  xs={6}>
                <CardSupport/>
              </Grid>
              <Grid item xs={6}>
                <CardSupport/>
              </Grid>
          </Grid>
    </Container>

  </div>
  )
}

export default Customer