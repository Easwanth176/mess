import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Home.css';

export default function Home() {
  const { registrationNumber, personName, Mess, hostel } = useParams();
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [userData, setUserData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    const simulatedUserData = {
      registrationNumber,
      name: personName,
      hostel,
      image: 'base64-encoded-image-data', // Replace with actual base64-encoded image data
    };

    setUserData(simulatedUserData);

    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit' };
      setCurrentDate(now.toLocaleDateString('en-US', dateOptions));
      setCurrentTime(now.toLocaleTimeString('en-US', timeOptions));
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, [registrationNumber, personName, hostel]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateRandomCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
    setVerificationCode(code.toString());
  };

  useEffect(() => {
    generateRandomCode();
  }, []); // Run only once on component mount

  return (
    <div className={`base ${darkMode ? 'dark' : 'light'}`}>
      <button className={`dark-mode-toggle ${selectedFile ? 'hidden' : ''}`} onClick={toggleDarkMode}>
        {darkMode ? 'X' : 'X'}
      </button>
      <div>
        <div className="hname">
          <h7>Mess Pass</h7>
        </div>
        <div className="meal-approved">
          <div className="header">
            <div className="info">
              <h2>{Mess}</h2>
              {userData ? (
                <p>{registrationNumber}</p>
              ) : (
                <p>Loading registration number...</p>
              )}
              {userData ? (
                <p>{personName}</p>
              ) : (
                <p>Loading name...</p>
              )}
              {userData ? (
                <p>{hostel}</p>
              ) : (
                <p>Loading hostel...</p>
              )}
            </div>
            <div className="image-circle">
              {selectedFile ? (
                <img src={selectedFile} alt=''/>
              ) : (
                <>
                  <label htmlFor="file-input" className={`file-input-label ${selectedFile ? 'hidden' : ''}`}>
                    Upload
                  </label>
                  <div></div>
                  <label htmlFor="file-input" className={`file-input-label ${selectedFile ? 'hidden' : ''}`}>
                    Image
                  </label>
                  <div></div>
                  <div></div>
                  <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                  />
                </>
              )}
            </div>
          </div>
          <h3>Meal Approved</h3>
          <div className="sqaure">
            <div className="border">
              <div className="animation-container">
                <div className="green-circle">
                  <div className="tick">&#10004;</div>
                </div>
                <div className="letter">A</div>
                <div className="letter">C</div>
                <div className="letter">C</div>
                <div className="letter">E</div>
                <div className="letter">P</div>
                <div className="letter">T</div>
                <div className="letter">E</div>
                <div className="letter">D</div>
              </div>
            </div>
          </div>
          <div className="body">
            <div className="info">
              <p>Date: <div> {currentDate}</div></p>
              <div className="hr-line"></div>
              <p>Time: <div>{currentTime}</div> </p>
              <p className="verification-code">Verification Code: <div>{verificationCode}</div></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
