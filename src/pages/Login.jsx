import React, { useEffect, useState } from 'react'
import { signInWithEmailPasswordFunction, signInWithGoogle } from '../firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Container, TextField, Typography } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useTheme } from '../store/selectors/useTheme'
import { FcGoogle } from "react-icons/fc";
import Home from './Home'
import { userState } from '../store/atoms/user';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const setUser = useSetRecoilState(userState)
    const navigate = useNavigate()
    const onLogin = async () => {

        const { response, error } = await signInWithEmailPasswordFunction(email, password)

        if (error) {
            return console.log(error);
        }
        else {

            // setUser(response.user)
            navigate("/dashboard")
        }

    }

    const signInWithGoogleFunction = async () => {
        const { response, error } = await signInWithGoogle()
        if (response.user) {
            navigate("/dashboard")
            console.log(response);
        }
        else {
            return console.log(error);
        }
    }


    useEffect(() => {
        onAuthStateChanged(auth, user => {
            const userCopy = JSON.parse(JSON.stringify(user));
            setUser(userCopy);
        })
    }, [setUser])


    const theme = useRecoilValue(useTheme)
    const bgColor = theme ? "bg-gray-900" : ""
    const textColor = theme ? "text-white" : ""
    return (
        <Home>
            <div className={bgColor + ' w-full flex justify-center h-screen'}>
                <div className="flex w-1/3 ">
                    <Container>
                        <Typography variant="h4" gutterBottom className={textColor + " font-bold"}>
                            Login
                        </Typography>
                        <form >
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className={textColor + " font-normal"}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="password"
                                type="text"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className={textColor + " font-normal"}
                            />

                            <Button variant="contained" className=' bg-blue-700 rounded-none' onClick={onLogin} >
                                Login
                            </Button>
                        </form>
                        <div className=' mt-10'>
                            <Button onClick={signInWithGoogleFunction} variant="outlined" className={textColor + ' w-full text-black'} disableElevation >
                                <div className=' flex gap-x-2 items-center'>
                                    <FcGoogle className=' text-2xl' />
                                    <p>Log In with Google</p>
                                </div>
                            </Button>
                        </div>
                        <p className={textColor + ' py-6 text-center'}>Don't have an account ? <Link to="/signup" > Click here to Sign up</Link> </p>
                    </Container>

                </div>
            </div>
        </Home>
    )
}

export default Login