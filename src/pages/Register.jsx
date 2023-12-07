import React, { useState } from 'react'
import { signInWithGoogle, signUpWithEmailPassword } from '../firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Container, TextField, Typography } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil'
import { useTheme } from '../store/selectors/useTheme'
import { FcGoogle } from "react-icons/fc";
import Home from './Home';
import { userState } from '../store/atoms/user';
function Register() {

    // states for email and password 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // router 
    const navigate = useNavigate()

    // theme 
    const theme = useRecoilValue(useTheme)
    const bgColor = theme ? "bg-gray-900" : ""
    const textColor = theme ? "text-white" : ""


    //setting user states 
    const [user, setUser] = useRecoilState(userState)


    // sign up user using email and password 
    const onSignUp = async () => {

        const { response, error } = await signUpWithEmailPassword(email, password)

        if (error) {
            return alert(error);
        }
        else {
            console.log(response);
            navigate("/login")
        }

    }

    // sign in with google 
    const signInWithGoogleFunction = async () => {
        const { response, error } = await signInWithGoogle()
        if (response.user) {
            navigate("/dashboard")
            // console.log(response);
        }
        else {
            return alert(error);
        }
    }


    const styles = {
        color: theme ? "white" : "black",
    }

    return (


        <Home>
            <div className={bgColor + ' w-full flex justify-center h-screen'}>
                <div className="flex md:w-1/3 ">
                    <Container>
                        <Typography variant="h4" gutterBottom className={textColor + " font-bold"}>
                            Signup
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
                                className={" text-white font-normal"}
                                InputProps={{ style: styles }}
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
                                className={" font-normal"}
                                InputProps={{ style: styles }}
                            />

                            <Button variant="contained" className=' bg-blue-700 rounded-none' onClick={onSignUp} >
                                Submit
                            </Button>
                        </form>
                        <div className=' mt-10'>
                            <Button onClick={signInWithGoogleFunction} variant="outlined" className={textColor + ' w-full text-black'} disableElevation >
                                <div className=' flex gap-x-2 items-center'>
                                    <FcGoogle className=' text-2xl' />
                                    <p>Sign In with Google</p>
                                </div>
                            </Button>
                        </div>
                        <p className={textColor + ' py-6 text-center'}>Already have and account ? <Link to="/login" > Click here to login</Link> </p>
                    </Container>

                </div>
            </div>
        </Home>
    )
}

export default Register