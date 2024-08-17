'use client'
import { AppBar, Box, Button, Card, CardActionArea, CardContent, Container, createTheme, CssBaseline, Grid, ThemeProvider, Toolbar, Typography, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import { SignedIn, UserButton, useUser } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link"

export default function Flashcard() {
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
                paper: '#84a86f',
            },
            text: {
                primary: '#ffffff',
                secondary: '#111212',
                paper: '#ffffff',
            },
        },
    });

    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [flipped, setFlipped] = useState({}) // Change to object to track flip state of each card
    const [viewAll, setViewAll] = useState(false) // State for toggling between single and all views

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return
            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []

            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() })
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (index) => {
        setFlipped(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const handleNextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
        setFlipped({}) // Reset flip state when changing cards
    }

    const handlePreviousCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length)
        setFlipped({}) // Reset flip state when changing cards
    }

    const toggleView = () => {
        setViewAll(!viewAll)
        setFlipped({}) // Reset flip state when toggling view
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const currentFlashcard = flashcards[currentCardIndex]

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position='sticky' color='primary' sx={{ width: '100%' }}>
                <Toolbar>
                    <IconButton href='/flashcards' color='inherit' edge='start' size='large'>
                        <ArrowBackSharpIcon color="white"></ArrowBackSharpIcon>
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold', textAlign: 'center' }}>
                        <Link href='/' style={{ textDecoration: 'none', color: "white" }} passHref>
                            FlashIntellect
                        </Link>
                    </Typography>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </Toolbar>
            </AppBar>

            <Container maxWidth='lg' sx={{ overflowX: 'hidden', mt: 4 }}>
                <Button variant="outlined" color="primary" onClick={toggleView} sx={{ mb: 4 }}>
                    {viewAll ? "View One by One" : "View All"}
                </Button>

                {viewAll ? (
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                                <Card>
                                    <CardActionArea onClick={() => handleCardClick(index)}>
                                        <CardContent>
                                            <Box sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                    color: '#ffffff',
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                    color: '#ffffff',
                                                },
                                                '& > div > div:nth-of-type(1)': {
                                                    color: '#ffffff',
                                                    backgroundColor: '#ffffff', // White for the front
                                                },
                                                '& > div > div:nth-of-type(2)': {
                                                    backgroundColor: '#ffffff', // White for the back
                                                    transform: 'rotateY(180deg)',
                                                },
                                            }}>
                                                <div>
                                                    <div>
                                                        <Typography variant='h5' component='div' color='black'>
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant='h5' component='div' color='black'>
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
                ) : (
                    <>
                        {flashcards.length > 0 && (
                            <Card>
                                <CardActionArea onClick={() => handleCardClick(currentCardIndex)}>
                                    <CardContent>
                                        <Box sx={{
                                            perspective: '1000px',
                                            '& > div': {
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                width: '100%',
                                                height: '200px',
                                                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                transform: flipped[currentCardIndex] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                color: '#ffffff',
                                            },
                                            '& > div > div': {
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                backfaceVisibility: 'hidden',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 2,
                                                boxSizing: 'border-box',
                                                color: '#ffffff',
                                            },
                                            '& > div > div:nth-of-type(1)': {
                                                color: '#ffffff',
                                                backgroundColor: '#ffffff', // White for the front
                                            },
                                            '& > div > div:nth-of-type(2)': {
                                                backgroundColor: '#ffffff', // White for the back
                                                transform: 'rotateY(180deg)',
                                            },
                                        }}>
                                            <div>
                                                <div>
                                                    <Typography variant='h5' component='div' color='black'>
                                                        {currentFlashcard.front}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='h5' component='div' color='black'>
                                                        {currentFlashcard.back}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button variant='contained' color='primary' onClick={handlePreviousCard} disabled={flashcards.length === 0}>
                                <ArrowBackIcon />
                                Previous
                            </Button>
                            <Button variant='contained' color='primary' onClick={handleNextCard} disabled={flashcards.length === 0}>
                                Next
                                <ArrowForwardIcon />
                            </Button>
                        </Box>
                    </>
                )}
            </Container>
        </ThemeProvider>
    )
}
