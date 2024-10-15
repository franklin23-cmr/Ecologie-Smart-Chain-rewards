// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions';

const CardInfo = ({coin, handleRefrech}) => {

  return (
    <Card>
        <CardContent>
      <Typography variant="h4" gutterBottom >
       Bonjour !
      </Typography>
      <Typography variant="h5" >
        Green Coin Token : {coin}
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="outlined" onClick={()=>{handleRefrech()}} size="small">actualiser</Button>
    </CardActions>
  </Card>
  )
}

export default CardInfo
