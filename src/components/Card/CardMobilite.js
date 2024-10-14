// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardMobilite = () => {
  return (
    <Card sx={{
     opacity: 0.6,
     pointerEvents: "none",
    }}
      >
      <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
       
        <Typography variant='h6' sx={{ mb: 2 }}>
          Mobilite Vert 
        </Typography>
        <Typography variant='body2' sx={{ mb: 6.5 }}>
        Promouvoir l'utilisation des transports en commun, du vélo ou de la marche réduit les émissions de gaz à effet de serre et améliore la qualité de l'air.        </Typography>
        <Button variant='contained' sx={{ p: theme => theme.spacing(1.75, 5.5) }}>
          Ajouter votre  Action Mobilite Vert
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardMobilite
