'use client'

import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, createTheme, CssBaseline, Divider, Grid, ThemeProvider, Toolbar, Typography, Card, CardContent, CardActions } from "@mui/material";
import Link from "next/link";
import IconButton from '@mui/material/IconButton';
import getStripe from '@/utils/get-stripe';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';



export default function Home() {
  
  const [isPaid, setIsPaid] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const res = await fetch(`/api/getUserStatus?userId=${user.id}`);
        const data = await res.json();
        if (data.subscriptionStatus === 'paid') {
          setIsPaid(true);
        } else {
          router.push('/'); // Redirect to pricing page if not paid
        }
      } catch (error) {
        router.push('/');
      }
    };

    checkUserStatus();
  }, [user]);


  
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
        secondary: '#e5e7eb',
      },
    },

  });

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions',{
      method:'POST',
      headers:{
        origin:'http://localhost:3000',
      },
    })
    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSessionJson.statusCode === 500){
      console.error(checkoutSessionJson.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error){
      console.warn(error.message)
    }

  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='sticky' color='primary' sx={{ width: '100%' }}>
        <Toolbar>
        <StyleOutlinedIcon fontSize="large"/>
          <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold', textAlign:'center' }}><Link href='/' style ={{textDecoration:'none', color:"white"}} passHref> FlashIntellect
          </Link></Typography>
          <SignedOut>
            <Button color='secondary' variant='contained' sx={{
              fontWeight: 'bold',
            }}><Link href='/sign-up' style ={{textDecoration:'none', color:"white"}} passHref> Sign Up
                              </Link></Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Container maxWidth='lg' sx={{ overflowX: 'hidden' }}>
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' margin='20px' height='30vh' textAlign='center' borderRadius={2}>
          <Typography variant='h2' color='black' sx={{
            fontWeight: 'bold',
            mt: 2,
            fontSize: { xs: '2rem', md: '3rem' },
          }}>
            Welcome to FlashIntellect!
          </Typography>
          <Typography variant='h6' component='h2' padding='5px' gutterBottom color='black' sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1rem', md: '1.25rem' },
          }}>
            Your own thoughts made into flashcards for your benefits!
          </Typography>
          <SignedOut>
          <Button variant="contained" color='primary' sx={{ mb: 2 }}><Link href='/sign-up' style ={{textDecoration:'none', color:"white"}} passHref> Login To start!
          </Link> </Button></SignedOut>
          
          <SignedIn>
          <Button variant="contained" color='primary' sx={{ mb: 2 }}><Link href='/generate' style ={{textDecoration:'none', color:"white"}} passHref> Get Started
          </Link> </Button>
          </SignedIn>
        </Box>
        <Divider color='secondary.main'></Divider>

        {/* Feature Section */}
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center' mt="15px">
          <Typography variant='h4' color='black' fontWeight='bold' sx={{ mb: 4 }}>Features</Typography>
          <Grid container spacing={4} display='flex' justifyContent='center'>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <Typography variant='h5' color='black' fontWeight='bold'>Easy Input</Typography>
                <Typography variant='body1' color='black' mt={1}>
                  Input your text and let the AI do the rest.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <Typography variant='h5' color='black' fontWeight='bold'>Smarter and Better</Typography>
                <Typography variant='body1' color='black' mt={1}>
                  Perfect for studying, our AI makes your work easy to understand and concise.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <Typography variant='h5' color='black' fontWeight='bold'>Access Anywhere</Typography>
                <Typography variant='body1' color='black' mt={1}>
                  Access your flashcards anywhere, anytime, and study at your convenience.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider color='secondary.main' sx={{ mt: 8 }}></Divider>

        {/* Pricing Section */}
        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Typography variant='h4' color='black' fontWeight='bold' sx={{ mb: 4 }}>Pricing</Typography>
          <Grid container spacing={4} display='flex' justifyContent='center'>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
                <CardContent>
                  <Typography variant='h5' fontWeight='bold'>Basic</Typography>
                  <Typography variant='h6' color={theme.palette.text.secondary}>
                    Free
                  </Typography>
                  <Typography variant='body1' mt={1}>
                    Basic features and limited storage.
                  </Typography>
                  <Typography variant='body1' mt={1} textAlign='center'> Every signedin account has it.</Typography>
                </CardContent>
                <CardActions>
                <Button variant="contained" color='primary' sx={{ mb: 2 }} fullWidth ><Link href='/free-generate' style ={{textDecoration:'none', color:"white"}} passHref> Generate
                </Link> </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
                <CardContent>
                  <Typography variant='h5' fontWeight='bold'>Pro</Typography>
                  <Typography variant='h6' color={theme.palette.text.secondary}>
                    $4.99/month
                  </Typography>
                  <Typography variant='body1' mt={1}>
                    More flashcards, More storage.
                  </Typography>
                </CardContent>
                <CardActions>
                <Button
                    fullWidth
                    variant='contained'
                    color='secondary'
                    onClick={handleSubmit}
                    disabled={isPaid ===true}
                  >
                    {isPaid === true ? 'Paid' : 'Choose Pro'}

                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
