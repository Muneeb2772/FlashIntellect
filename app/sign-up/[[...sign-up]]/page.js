'use client';

import React, { useState } from 'react';
import { SignIn } from "@clerk/clerk-react";
import { SignUp } from "@clerk/nextjs";
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import { AppBar, Box, Button, Container, createTheme, CssBaseline, Grid, ThemeProvider, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(true);

    const handleToggle = () => {
        setIsSignUp(!isSignUp);
    };

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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position='sticky' color='primary' sx={{ width: '100%' }}>
                <Toolbar>
                <StyleOutlinedIcon fontSize="large"/>
                    <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                        <Link href='/' style={{ textDecoration: 'none', color: "white" }} passHref>
                            FlashIntellect
                        </Link>
                    </Typography>
                    <Button 
                        variant='contained' 
                        color='secondary' 
                        sx={{ fontWeight: 'bold', margin: '0px 20px 0px 0px' }}
                        onClick={handleToggle}
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth='lg' sx={{ overflow: 'hidden', mt: 4 }}>
                <Box sx={{ 
                    width: '200%', 
                    display: 'flex', 
                    transition: 'transform 0.5s ease', 
                    transform: `translateX(${isSignUp ? '0%' : '-50%'})` 
                }}>
                    {/* Sign Up Section */}
                    <Box sx={{ width: '50%', padding: '20px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%' textAlign='center' borderRadius={2}>
                                    <Typography variant='h2' color='black' sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Sign Up
                                    </Typography>
                                    <SignUp />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%' textAlign='center' borderRadius={2}>
                                    <Typography variant='h4' color='black' sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Learn with Flashcards
                                    </Typography>
                                    <Box sx={{ width: '100%', height: '300px', position: 'relative', perspective: '1000px' }}>
                                        <Box
                                            sx={{
                                                width: '300px',
                                                height: '200px',
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transformStyle: 'preserve-3d',
                                                transform: 'translate(-50%, -50%) rotateX(0deg)',
                                                animation: 'flip 6s infinite',
                                                transition: 'transform 0.5s',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    bgcolor: '#84a86f',
                                                    borderRadius: '16px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.5rem',
                                                    backfaceVisibility: 'hidden',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                }}
                                            >
                                                Flashcard Front
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    bgcolor: 'white',
                                                    border:'1px solid black',
                                                    borderRadius: '16px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'black',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.5rem',
                                                    backfaceVisibility: 'hidden',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    transform: 'rotateX(180deg)',
                                                }}
                                            >
                                                Flashcard Back
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Sign In Section */}
                    <Box sx={{ width: '50%', padding: '20px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%' textAlign='center' borderRadius={2}>
                                    <Typography variant='h4' color='black' sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Learn with Flashcards
                                    </Typography>
                                    <Box sx={{ width: '100%', height: '300px', position: 'relative', perspective: '1000px' }}>
                                        <Box
                                            sx={{
                                                width: '300px',
                                                height: '200px',
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transformStyle: 'preserve-3d',
                                                transform: 'translate(-50%, -50%) rotateX(0deg)',
                                                animation: 'flip 6s infinite',
                                                transition: 'transform 0.5s',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    bgcolor: '#84a86f',
                                                    borderRadius: '16px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.5rem',
                                                    backfaceVisibility: 'hidden',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                }}
                                            >
                                                Flashcard Front
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    bgcolor: 'white',
                                                    border:'1px solid black',
                                                    borderRadius: '16px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'black',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.5rem',
                                                    backfaceVisibility: 'hidden',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    transform: 'rotateX(180deg)',
                                                }}
                                            >
                                                Flashcard Back
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%' textAlign='center' borderRadius={2}>
                                    <Typography variant='h2' color='black' sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Sign In
                                    </Typography>
                                    <SignIn />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

            <style jsx global>{
                `@keyframes flip {
                    0% {
                        transform: translate(-50%, -50%) rotateX(0deg);
                    }
                    50% {
                        transform: translate(-50%, -50%) rotateX(180deg);
                    }
                    100% {
                        transform: translate(-50%, -50%) rotateX(360deg);
                    }
                }`
            }</style>
        </ThemeProvider>
    );
}
