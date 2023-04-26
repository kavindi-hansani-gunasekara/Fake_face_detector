import React, { useState, useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import upload from "../../Images/upload.png";
import detect from "../../Images/detect.png";
import answer from "../../Images/answer.png";
import arrow from "../../Images/arrow.png";
import photo from "../../Images/photo.jpg";

import "./Landing.css";
import Alert from "../../Components/Alert/Alert";

const Landing = () => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [viewReult, setViewResult] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [showAlert, setShowAlert] = useState("");

  const input = useRef(null);
  const handleInput = (e) => {
    setSelectedImage(e.target.files);
  };
  const onlickImage = () => {
    input.current.click();
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
                {selectedImage.length === 0
                  ? "No file chosen"
                  : selectedImage[0].name}
              </span>
            </div>
            <div
              className="view-btn"
              onClick={() => {
                if (selectedImage.length !== 0) {
                  setViewResult(true);
                }
              }}
            >
              View Result
            </div>
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
              src={
                generatedImage === ""
                  ? URL.createObjectURL(selectedImage[0])
                  : generatedImage
              }
              className="image"
            />
          </div>
          <div className="image-details">
            <div className="details">
              <div className="type">Type :</div>
              <div className="value">{selectedImage[0].type.split("/")[1]}</div>
            </div>
            <div className="details">
              <div className="type">Name :</div>
              <div className="value">{selectedImage[0].name}</div>
            </div>{" "}
            <div className="details">
              <div className="type">Size :</div>
              <div className="value">{formatBytes(selectedImage[0].size)}</div>
            </div>
            <div
              className="generate"
              onClick={() => {
                setIsGenerating(true);
                setTimeout(() => {
                  setIsGenerating(false);
                  setGeneratedImage(photo);
                  setShowAlert(true)
                }, 3000);
              }}
            >
              Generate Image
            </div>
          </div>
        </div>
        {showAlert ? <Alert type="success" /> : ""}
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
      {contentToShow()}
      <Footer />
      {isGenerating ? getLoader() : ""}
    </div>
  );
};
export default Landing;
