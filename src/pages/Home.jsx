import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import { useRecoilValue } from 'recoil';
import { useTheme } from '../store/selectors/useTheme';
import Navbar from '../components/Navbar';
import { useUser } from '../store/selectors/useUser';

function Home({ children }) {


    const theme = useRecoilValue(useTheme)
    const user = useRecoilValue(useUser)
    const fontColor = theme ? "text-white" : ""
    const bgColor = theme ? "bg-gray-900" : ""

    return (
        <div className=' h-screen w-screen'>

            <Navbar />
            {
                children ? children : <div className={bgColor + ` h-full`}>
                    <div className=' flex flex-col h-3/4'>
                        <div className=' flex flex-col '>
                            <div className=' flex flex-col md:flex-row'>
                                <div className=' md:w-1/2 p-10 md:p-6 bg-zinc-800 text-white w-full'>
                                    <h1 className=' text-3xl py-6 font-bold' >Welcome to Dropbox</h1>
                                    <h1 className=' text-3xl py-1 font-bold' >Storing everything for you and your buisness needs. All in one place</h1>

                                    <p className='pb-6'>Enhance your personal storage with dropbox , Offering a simple and efficeint way to upload , organise and access files from anywhere . Securely store
                                        important documents and media, and experience the convinence of easy file management and sharing in one centralized solution.
                                    </p>
                                    {
                                        user !== null ? <Link to="/dashboard" >
                                            <Button variant="contained" className=' bg-blue-700 rounded-none' endIcon={<FaArrowRight />}>
                                                Go to dashboard
                                            </Button>
                                        </Link> : <Link to="/signup" >
                                            <Button variant="contained" className=' bg-blue-700 rounded-none' endIcon={<FaArrowRight />}>
                                                Try for free
                                            </Button>
                                        </Link>
                                    }

                                </div>
                                <div className='md:w-1/2 h-full w-full bg-zinc-900 flex items-center justify-center' >
                                    <video autoPlay loop muted >
                                        <source src='https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4'
                                            type='video/mp4'
                                        />
                                    </video>
                                </div>
                            </div>
                            <div className={fontColor + ' text-center'}>
                                <h1 className=' font-bold '>Disclaimer</h1>
                                <p>This project is for learning purposes only</p>
                            </div>
                        </div>

                    </div>


                </div >

            }
        </div>
    )
}

export default Home