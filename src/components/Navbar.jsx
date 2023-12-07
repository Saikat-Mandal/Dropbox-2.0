import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { themeState } from '../store/atoms/theme'
import { FaDropbox, FaRegSun, FaRegMoon } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../firebase/auth';
import { useUser } from '../store/selectors/useUser';
import { userState } from '../store/atoms/user';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { IoSunnyOutline } from "react-icons/io5";

function Navbar() {
    const [theme, setTheme] = useRecoilState(themeState)
    const setUser = useSetRecoilState(userState)
    // const resetUser = useResetRecoilState(userState);
    const navigate = useNavigate()
    const user = useRecoilValue(useUser)

    const handleThemeChange = () => {
        setTheme(prev => !prev)
    }


    const onLogout = async () => {
        const { response, error } = await logout()

        if (error) {
            console.log("here");
            console.log(error);
        }
        else {
            // console.log(response);
            navigate("/")
        }

    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            const userCopy = JSON.parse(JSON.stringify(user));
            setUser(userCopy);
        })
    }, [setUser])

    const fontColor = theme ? "text-white" : ""
    const backgroundColor = theme ? "bg-gray-900" : ""
    return (
        <header className={backgroundColor + ` flex items-center justify-between`} >
            <div className=' flex w-4/5 items-center'>
                <Link to="/" className=" text-white bg-blue-700 text-2xl flex items-center justify-center w-12 h-12"><FaDropbox /></Link>
                <h1 className={fontColor + ` text-xl font-bold ml-2 `}>Dropbox</h1>

            </div>
            <div className='flex justify-end items-center w-1/5 cursor-pointer '>
                <span onClick={handleThemeChange} className='mr-6 '>{theme ? <IoSunnyOutline className=' text-white' /> : <FaRegMoon />}</span>
                <div className=' mr-6'>
                    {
                        user !== null ? <Link onClick={onLogout} className={fontColor + ` text-base`}>Logout</Link> : <Link to={"/signup"} className={fontColor + ` text-base`}>Sign in</Link>
                    }


                </div>
            </div>
        </header>
    )
}

export default Navbar