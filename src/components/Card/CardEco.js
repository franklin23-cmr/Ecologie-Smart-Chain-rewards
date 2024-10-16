// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardSupport = () => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
       
        <Typography variant='h6' sx={{ mb: 2 }}>
          Support
        </Typography>
        <Typography variant='body2' sx={{ mb: 6.5 }}>
          According to us blisters are a very common thing and we come across them very often in our daily lives. It is
          a very common occurrence like cold or fever depending upon your lifestyle.
        </Typography>
        <Button variant='contained' sx={{ p: theme => theme.spacing(1.75, 5.5) }}>
          Contact Now
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardSupport
