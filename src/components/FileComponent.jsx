import React from 'react'

function FileComponent(props) {

    let backGroundColor = ""
    let filename = ""
    if (props.name === "pdf") {
        backGroundColor = "bg-red-500"
        filename = "pdf"
    }
    else if (props.name === "jpeg" || props.name === "jpg" || props.name === "peg") {
        backGroundColor = "bg-orange-400"
        filename = "jpg"
    }
    else if (props.name === "png") {
        backGroundColor = "bg-purple-500"
        filename = "png"
    }
    else if (props.name === "gif") {
        backGroundColor = "bg-red-400"
        filename = "gif"
    }
    else if (props.name === "docx" || props.name === "docs" || props.name === "ent") {
        backGroundColor = "bg-cyan-400"
        filename = "doc"
    }
    return (
        <div className={backGroundColor + " h-10 w-10 rounded-md bg flex items-center justify-center text-white  "}>
            {filename.toUpperCase()}
        </div>
    )
}


export default FileComponent