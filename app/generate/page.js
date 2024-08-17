'use client'
import { db } from "@/firebase"
import { SignedIn, UserButton, useUser } from "@clerk/nextjs"
import { AppBar, Box, Button, Card, CardActionArea, CardContent, Container, createTheme, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material"
import { collection, doc, getDoc, writeBatch } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import { useState } from "react"
import IconButton from '@mui/material/IconButton';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';



export default function Generate(){
    const theme = createTheme({
        palette: {
          primary: {
            main: '#659e44',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#84a86f',
            contrastText: '#ffffff',
          },
          background: {
            default: '#ffffff',
            secondary: '#84a86f',
          },
          text: {
            primary: '#ffffff',
            secondary: '#111212',
          },
        },
      });
    
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        fetch('/api/generate/', {
            method:'POST',
            body: text,
        })
        .then((res) => res.json())
        .then((data) => setFlashcards(data))
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async () => {
        if(!name){
            alert('Please enter a name for your flashcards')
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection(db,'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()){
            const collections = docSnap.data().flashcards || []
            if (collections.find((f) => f.name === name)){
                alert('Flashcards with the same name already exist.')
                return
            }
            else{
                collections.push({name})
                batch.set(userDocRef, {flashcards: collections}, {merge:true})
            }
        }
        else{
            batch.set(userDocRef, {flashcards: [{name}]})
        }

        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }


    return(
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='sticky' color='primary' sx={{ width: '100%' }}>
        <Toolbar>
        <IconButton href = '/' color = 'inherit' edge = 'start' size = 'large'><ArrowBackSharpIcon color="white"></ArrowBackSharpIcon></IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold',textAlign:'center' }}><Link href='/' style ={{textDecoration:'none', color:"white"}} passHref> FlashIntellect
          </Link></Typography>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth='lg' sx={{ overflowX: 'hidden' }}>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center' borderRadius={2}>
          <Typography variant='h2' color='black' sx={{
            fontWeight:'semibold',
            mt: 2,
            fontSize: { xs: '2rem', md: '3rem' },
          }}>
            Generate Flashcards
          </Typography>
          <Paper  sx={{p:4,width:'100%', bgcolor:'#ffffff', mb:4, border:'1px solid black',boxShadow:'10px 12px 13px rgba(132, 168, 111,1)'}}>
            <TextField
  value={text}
  onChange={(e) => setText(e.target.value)}
  label="Enter Text"
  fullWidth
  multiline
  rows={4}
  variant='standard'
  placeholder="Type your text here..."
  helperText={`Current length: ${text.length} characters`}
  InputLabelProps={{ style: { color: '#000000' } }}
  InputProps={{
    style: { color: '#000000' },
    sx: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#000000',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#000000',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#000000',
      },
    },
  }}
  FormHelperTextProps={{ style: { color: '#000000' } }}
/>


              <Button
              onClick = {handleSubmit}
              fullWidth
              variant="contained"
              color = 'primary'
              sx={{ mt: 3, }}
            >Submit</Button>
          </Paper>
      </Box>
      {flashcards.length > 0 &&(
        <Box sx = {{mt:4}}>
          <Typography variant = 'h4'> Flashcards Preview</Typography>
          <Grid container spacing = {3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs = {12} sm = {6} md= {4} key = {index}>
               <Card sx = {{bgcolor: '#84a86f'}}>
                  <CardActionArea onClick = {() => handleCardClick(index)}>
                    <CardContent>
                      <Box sx = {{
                        perspective:'1000px',
                        '& > div':{
                          transition: 'transform 0.6s',
                          transformStyle: 'preserve-3d',
                          position: 'relative',
                          width:'100%',
                          height:'200px',
                          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                          transform: flipped[index]? 'rotateY(180deg)':'rotateY(0deg)',
                          color: '#ffffff',
                        },
                        '& > div > div':{
                          position: 'absolute',
                          width:'100%',
                          height:'100%',
                          backfaceVisibility:'hidden',
                          display:'flex',
                          justifyContent:'center',
                          alignItems:'center',
                          padding: 2,
                          boxSizing: 'border-box',
                          color: '#ffffff',
                        },
                        '& > div > div:nth-of-type(1)': {
                            color: '#ffffff',
                          backgroundColor: '#ffffff', // Green for the front
                          
                        },
                        '& > div > div:nth-of-type(2)': {
                          backgroundColor: '#ffffff',
                          transform: 'rotateY(180deg)',
                        },
                      }}>
                        <div>
                          <div>
                            <Typography variant = 'h5' component='div' color = 'black'>
                            {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant = 'h5' component='div' color = 'black'>
                            {flashcard.back}
                            </Typography>
                          </div>
                          </div>
                          </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>

              </Grid>
            ))}
          </Grid>
          <Box sx = {{mt:4, display: 'flex',justifyContent: 'center'}}>
            <Button variant = 'contained' color = 'secondary' onClick = {handleOpen}> Save </Button>
          </Box>
        </Box>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx = {{color:'#000000'}}> Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcards collection.
          </DialogContentText>
          <TextField
    margin="normal"
    required
    fullWidth
    value={name}
    label="Collection Name"
    type="text"
    id="Collection Name"
    variant="outlined"
    onChange={(e) => setName(e.target.value)}
    sx={{
        '& .MuiOutlinedInput-input': {
            color: 'black',  // Change text color
        },
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',  // Change background color
        },
        '& .MuiInputLabel-root': {
            color: 'black',  // Change label color
        },
    }}
/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={saveFlashcards} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
      </ThemeProvider>
      


    )




}