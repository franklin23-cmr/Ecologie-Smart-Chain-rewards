// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { forwardRef, useState } from 'react'
import { Box, Chip, CircularProgress, Dialog, DialogActions, DialogContent, Fade, FormControl, FormControlLabel, FormHelperText, Grid, Icon, IconButton, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { useAccount } from '../../hooks/useAccount'
import { declareAction } from '../../utils/contractServices'
import { proposeAction } from '../../utils/EcoloSystemContractServices'



const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const defaultValues = {
  addresse: '',
  nombre: 0,
  description: ''
}

const CardRecyclage = () => {

      // ** States
      const [loading, setLoading] = useState(false)
      const [show, setShow] = useState(false)
      const [languages, setLanguages] = useState([])

      const {provider,contract} = useAccount()

    // ** Hook
    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({ defaultValues })
    
    const onSubmit = async (data) => {
      setLoading(true)
      try {
        proposeAction(provider,contract,data.addresse, `${data?.description +'-' + data.nombre}` , data?.nombre * 2).then((result)=>{
          setLoading(false)
          console.log('result', result)
          alert('Action déclarée avec succès !');
        }).catch((err)=>{
          console.log(err)
          setLoading(false)

        })
        } catch (error) {
            alert('Erreur lors de la déclaration de l\'action.');
            setLoading(false)
        }
  }

  return (
    <Card>
      <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
       
        <Typography variant='h6' sx={{ mb: 2 }}>
          Recyclage 
        </Typography>
        <Typography variant='body2' sx={{ mb: 6.5 }}>
        Le recyclage est une action écologique qui réduit les déchets, préserve les ressources naturelles et contribue à la protection de l'environnement.
        </Typography>
        <Button variant='contained' onClick={() => setShow(true)} sx={{ p: theme => theme.spacing(1.75, 5.5) }}>
          Ajouter votre  Action Recyclage
        </Button>
      </CardContent>

      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        
          <form onSubmit={handleSubmit(onSubmit)} >
          <Grid container spacing={5} sx={{p: 3}}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='description'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Descripion'
                      onChange={onChange}
                      placeholder='donner une description de votre recyclage'
                      error={Boolean(errors.description)}
                      aria-describedby='validation-async-first-name'
                    />
                  )}
                />
                {errors.description && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-async-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='nombre'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                    id="outlined-start-adornment"
                    type='number'
                    slotProps={{
                      input: {
                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                      },
                    }}
                    value={value}
                    label='Precise le poids en kg de matiere recyclee'
                    onChange={onChange}
                    placeholder=' 1kg vaut 2 green coin '
                    error={Boolean(errors.nombre)}
                    aria-describedby='validation-async-last-name'
                  />
                  )}
                />
                {errors.nombre && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-async-last-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='addresse'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='text'
                      value={value}
                      label='precise adresse de ton porte feuille'
                      onChange={onChange}
                      error={Boolean(errors.addresse)}
                      placeholder='0xff3eertdfdgetert'
                      aria-describedby='validation-async-email'
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-async-email'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

       

            <Grid item xs={12}>
              <Button size='large' type='submit' variant='contained'>
                {loading ? (
                  <CircularProgress
                    sx={{
                      color: 'common.white',
                      width: '20px !important',
                      height: '20px !important',
                      mr: theme => theme.spacing(2)
                    }}
                  />
                ) : null}
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </Card>
  )
}

export default CardRecyclage
