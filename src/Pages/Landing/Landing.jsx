import React, { useState, useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import upload from "../../Images/upload.png";
import detect from "../../Images/detect.png";
import answer from "../../Images/answer.png";
import arrow from "../../Images/arrow.png";
import photo from "../../Images/photo.jpg";
import { storage } from '../../Config/Firebase';
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from "firebase/storage";
import axios from 'axios';

import "./Landing.css";
import Alert from "../../Components/Alert/Alert";

const Landing = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [viewReult, setViewResult] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [url, setUrl] = useState(null);
  const [status, setStatus] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [isGetting, setIsGetting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleReset = ()=>{
    setStatus(null);
    setConfidence(null);
    setViewResult(false);
    setSelectedImage(null);
    setShowAlert(false);
    setIsGetting(false);
    setDownloadUrl(null);
    
  }
  const input = useRef(null);
  const handleInput = (e) => {
    if(e.target.files[0])
    setSelectedImage(e.target.files[0]);
  };
  const onlickImage = () => {
    input.current.click();
    setIsGenerating(false)
  };
  const formatBytes = (bytes) => {
    let decimals = 2;
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `input/${selectedImage.name}`);
    uploadBytes (storageRef, selectedImage).then(()=>{
      getDownloadURL(storageRef).then((url)=>{
        setUrl(url);
      })
      .catch((error) => {
        console.log(error.message);
      })
    })
    setIsGenerating(true);
  }

  const handleResults = async () => {
    setIsGetting(true)
    const res = await axios.post("http://192.168.1.35:5000/predictImage",
    {
      name : selectedImage.name
    }
    )
    setIsGetting(false)
    setViewResult(true);
    setConfidence(res.data.confidence)
    setIsGenerating(true);
    console.log(res.data);
    if(res.data.isFake === "fake"){
      setStatus("danger");
    
    }
    else{
   
      setStatus("success");
    }
    setShowAlert(true)

  }

  const handleShowImage = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `inputimages/${selectedImage.name}`);
    if(status === "danger"){
      const instorageRef = ref(storage, `outputimages/${selectedImage.name}`);
      await getDownloadURL(instorageRef).then((url) => {
        console.log(url)
        setDownloadUrl(url)
      });
    }
    else{
  
      await getDownloadURL(storageRef).then((url) => {
        console.log(url);
        setDownloadUrl(url)
      });
      
    }
    
    
  }
  const contentOne = () => {
    return (
      <div className="Landing-container">
        <div className="header">
          Detect Image Manipulation with Localizing
          <br /> Manipulated Regions
        </div>
        <div className="process">
          <div className="step">
            <img alt="" src={upload} className="step-img" />
            <div>Upload Image</div>
          </div>
          <img alt="" src={arrow} className="arrow" />
          <div className="step">
            <img alt="" src={detect} className="step-img" />
            <div>Detect Image</div>
          </div>{" "}
          <img alt="" src={arrow} className="arrow" />
          <div className="step">
            <img alt="" src={answer} className="step-img" />
            <div>View Results</div>
          </div>
        </div>
        <div className="select-image">
          <div>Select a Image</div>
          <div className="input-container">
            <div className="file-input">
              <input
                ref={input}
                type="file"
                id="actual-btn"
                hidden
                onChange={handleInput}
                accept="image/*"
              />
              <label className="actual-btn" onClick={onlickImage}>
                Choose File
              </label>
              <span id="file-chosen" className="selected-img">
                {!selectedImage
                  ? "No file chosen"
                  : selectedImage.name}
              </span>
            </div>
            { isGenerating ? (
                <div
                className="view-btn"
                onClick={handleResults}
              >
                View Results
              </div> ) : 

              (
                <div
                  className="view-btn"
                onClick={handleSubmit}
                >
                Upload
                </div>
              )

            }
    
          </div>
        </div>
      </div>
    );
  };
  const contentTwo = () => {
    return (
      <div className="Landing-container">
        <div className="view-container">
          <div className="image-container">
            <img
              alt=""
              src={downloadUrl}
              className="image"
            />
          </div>
          <div className="image-details">
            <div className="details">
              <div className="type">Type :</div>
              <div className="value">{selectedImage.type.split("/")[1]}</div>
            </div>
            <div className="details">
              <div className="type">Name :</div>
              <div className="value">{selectedImage.name}</div>
            </div>{" "}
            <div className="details">
              <div className="type">Size :</div>
              <div className="value">{formatBytes(selectedImage.size)}</div>
            </div>
            <div className="details">
              <div className="type">Confidence :</div>
              <div className="value">{confidence}</div>
            </div> 
            <div
              className="generate"
              onClick={handleShowImage}
            >
              Show Image
            </div>         
            <div
              className="generate"
              onClick={handleReset}
            >
              Back to Home
            </div>
          </div>
        </div>
        {showAlert ? <Alert type={status} /> : ""}
      </div>
    );
  };
  const contentToShow = () => {
    return viewReult ? contentTwo() : contentOne();
  };
  
  const getLoader = () => {
    return (
      <div className="loading-wrapper">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };
  return (
    <div className="landing-page">
      <Navbar />
      {isGetting? getLoader(): contentToShow()}
      <Footer />
      
    </div>
  );
};
export default Landing;
