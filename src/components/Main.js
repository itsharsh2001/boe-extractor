import React, { useState, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { jwtDecode } from "jwt-decode";


import classes from "./Main.module.css";
import logo from "../assets/NewAnimation.gif";

function Main() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const isTokenExpired = (t) => Date.now() >= jwtDecode(t || "null").exp * 1000;
  // const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    
    let token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      navigate("/login");
    }
    
  }, []);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
    // console.log('slected files', selectedFiles);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    console.log('selected files', selectedFiles);

    for (const file of selectedFiles) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/process",
        formData,
        {
          responseType: 'arraybuffer',
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // console.log(response.status);

      // if(response.status=='401'){
      //   localStorage.removeItem('token');
      //   navigate('/login');
      // }

     // Create a Blob from the array buffer
     const excelBlob = new Blob([response.data], { type: 'application/zip' });

     // Create a download link and trigger the download
     const url = window.URL.createObjectURL(excelBlob);
     const a = document.createElement('a');
     a.href = url;
     a.download = 'output.zip';
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);

      // console.log(response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <>
      <main className={classes.main}>
            <h4>Bail Of Entry Data Extraction</h4>
        <div>
          <span>

            <input
              type="file"
              name="data"
              id="data"
              multiple
              onChange={handleFileChange}
              // accept=".csv, .xlsx"
            />
            <button onClick={handleUpload}>Upload</button>
          </span>
        </div>

        {/* {selectedFiles.length!==0 && selectedFiles.map((id,val)=>{
          return (
            <p>{val}</p>
          )
        })} */}
      </main>
    </>
  );
}

export default Main;
