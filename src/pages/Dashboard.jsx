import React, { useEffect, useState, useCallback } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRecoilValue } from 'recoil';
import { useTheme } from '../store/selectors/useTheme';
import Home from './Home';
import { addDataToFirebase, deleteDataFromFirebase, getFirebaseData } from '../firebase/firestore';
import { useUser } from '../store/selectors/useUser';
import { Button } from '@mui/material';
import { auth } from '../firebase/config';
import { useDropzone } from 'react-dropzone'
import { downloadFile, uploadFile } from '../firebase/storage';
import { Link } from 'react-router-dom';

function Dashboard() {

    const theme = useRecoilValue(useTheme)
    const bgColor = theme ? "bg-gray-900" : ""
    const textColor = theme ? "text-white" : ""


    // states for the file type 

    const [fileState, setFileState] = useState(null)
    const [filename, setFileName] = useState("")
    const [fileUrl, setFileUrl] = useState("")
    const [size, setSize] = useState(0)
    const [type, setType] = useState("")



    const userId = auth?.currentUser?.uid
    const uid = useRecoilValue(useUser)?.uid


    const [filesArray, setFilesArray] = useState([])

    // add data to firebase database 
    const addData = async (gotUrl) => {
        const { docs, error } = await addDataToFirebase(filename, gotUrl, size, type, userId)
        getData()
    }

    const getData = async () => {
        const documents = await getFirebaseData(uid)
        setFilesArray(documents)
    }

    // delete date from firebase database 
    const deleteData = async (docId) => {
        await deleteDataFromFirebase(docId)
        getData()
    }

    const uploadFileToFirebase = async () => {
        try {
            await uploadFile(fileState)
            const gotUrl = await downloadFile(fileState)
            setFileUrl(gotUrl)
            addData(gotUrl)
        } catch (error) {
            console.log(error);
        }

    }




    useEffect(() => {
        // const getDataRealTime = async () => {
        //     const doc = await getDataRealTime()
        //     console.log(doc);
        // }
        // getDataRealTime()
        getData()
    }, [])


    const onDrop = useCallback(acceptedFiles => {
        // console.log(acceptedFiles[0]);
        setFileState(acceptedFiles[0])
        setFileName(acceptedFiles[0].name)
        setSize(acceptedFiles[0].size)
        setType(acceptedFiles[0].type.slice(-3))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })




    return (
        <Home>
            <div className={bgColor + ' h-screen w-full'}>



                <div className='h-1/3 bg-slate-100 cursor-pointer'>
                    <div {...getRootProps()} className='w-full  h-full flex items-center justify-center' >
                        <input {...getInputProps()} />
                        {
                            filename ?
                                <p>{filename}</p> :
                                <p> drag and drop files here</p>
                            // filename ? { filename } : <p>Drag here to set file</p>
                        }
                    </div>
                </div>
                <div className='pt-6 px-6 flex justify-end'>
                    {/* <Button variant='contained' onClick={addData} className='bg-blue-800' >Upload</Button> */}
                    <Button variant='contained' onClick={uploadFileToFirebase} className='bg-blue-800' >Upload</Button>
                </div>

                {/* files show below  */}
                <div className=' p-10'>
                    <p className={textColor + ' font-bold pb-4'}>All files</p>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell align="right">Filename</TableCell>
                                    <TableCell align="right">Date added</TableCell>
                                    <TableCell align="right">Size</TableCell>
                                    <TableCell align="right">Link</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filesArray.map((file) => (
                                    <TableRow
                                        key={file.docId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="file">
                                            {file.doc.type}
                                        </TableCell>
                                        <TableCell align="right">{file.doc.filename}</TableCell>
                                        <TableCell align="right">
                                            <div className=' flex flex-col'>
                                                <p>{file.doc.createdAtDate}</p>
                                                <p>{file.doc.createdAtTime}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">{file.doc.size}</TableCell>
                                        <TableCell align="right">
                                            <Link className=' text-sky-500' to={file.doc.link} target='_blank' >Download</Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" onClick={() => deleteData(file.docId)} >delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </div>
        </Home>
    )
}

export default Dashboard