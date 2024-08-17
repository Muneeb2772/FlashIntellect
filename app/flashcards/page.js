'use client'
import { AppBar, Box, Button, Card, CardActionArea, CardContent, Container, createTheme, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import Link from "next/link"
import { useRouter } from "next/navigation"
import IconButton from '@mui/material/IconButton';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import { SignedIn, UserButton, useUser } from "@clerk/nextjs"

export default function Flashcards() {
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
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: '#333333',
            secondary: '#659e44',
          },
        },
        typography: {
          fontFamily: 'Roboto, sans-serif',
          h6: {
            fontWeight: 700,
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
          },
        },
        shape: {
          borderRadius: 8,
        },
        shadows: ['none', '0px 4px 6px rgba(0, 0, 0, 0.1)'],
      });

    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()
    
    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }
        getFlashcards()
    }, [user]) 

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='sticky' color='primary' sx={{ width: '100%', boxShadow: 1 }}>
          <Toolbar>
            <IconButton href='/generate' color='inherit' edge='start' size='large'>
              <ArrowBackSharpIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', textAlign: 'center' }}>
              <Link href='/' style={{ textDecoration: 'none', color: 'white' }} passHref>FlashIntellect</Link>
            </Typography>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                          sx={{
                            position: 'relative',
                            height: 150,
                            width: 200,
                            '&:hover': {
                              transform: 'scale(1.05)',
                              transition: 'transform 0.3s',
                            },
                          }}
                        >
                            {[...Array(3)].map((_, idx) => (
                                <Card
                                    key={idx}
                                    sx={{
                                        position: 'absolute',
                                        top: `${idx * 8}px`,
                                        left: `${idx * 8}px`,
                                        transform: `rotate(${(-1 + idx) * 2}deg)`,
                                        boxShadow: idx === 2 ? 3 : 1,
                                        zIndex: idx === 2 ? 3 : idx,
                                        width: '100%',
                                        height: '100%',
                                        border: '1px solid black',
                                        backgroundColor: idx === 2 ? theme.palette.secondary.main : '#ffffff',
                                    }}
                                >
                                    {idx === 2 && (
                                        <CardActionArea onClick={() => { handleCardClick(flashcard.name) }}>
                                            <CardContent>
                                                <Typography fontWeight='bold' textAlign='center' color='white' variant='h6'>
                                                    {flashcard.name}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    )}
                                </Card>
                            ))}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
        </ThemeProvider>
    )
}
