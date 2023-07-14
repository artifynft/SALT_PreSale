import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { create, all } from "mathjs";

import "../../index";
import "./presalebuy.css";
import MyStopwatch from "../CountDownTimer/Countdown";
import ErrorHandler from "../ErrorHandler/errorhandler";

const math = create(all);

const PreSaleBuy = ({
  expiryTimeStamp,
  connectWallet,
  walletAddress,
  contractAddress,
  contractABI,
}) => {
  const [connectedWallet, setConnectedWallet] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [amount, setAmount] = useState("");
  const [tokensToBuy, setTokensToBuy] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [errors, setErrors] = useState([]);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const calculateTokens = (ethAmount) => {
    var tokenPrice = 0.0001; // NTC as appropriate for token and eth conversion- Represents one token in eth
    var tokenAmount = ethAmount / tokenPrice;
    return tokenAmount;
  };

  const validateAmount = (value) => {
    if (value < 0.00000001) {
      setErrors((prevErrors) => [
        ...prevErrors,
        "The amount you entered is too low. Please provide an amount greater than or equal to 0.00000001.",
      ]);
      return false;
    }

    if (!/^\d*\.?\d*$/.test(value)) {
      setErrors((prevErrors) => [
        ...prevErrors,
        "Invalid amount. Please enter a valid number.",
      ]);
      return false;
    }

    return true;
  };

  const handlePurchase = async () => {
    try {
      if (!connectedWallet) {
        console.error("Please connect wallet to participate in presale");
        setErrors((prevErrors) => [
          ...prevErrors,
          "Error purchasing tokens:",
          "Please connect your wallet before purchasing.",
        ]);
        return;
      }

      if (!validateAmount(amount)) {
        return;
      }

      try {
        const tx = await contract.invest({
          value: ethers.utils.parseEther(amount.toString()),
        });

        await tx.wait();
        setTransactionHash(tx.transactionHash);
      } catch (error) {
        throw error;
      }

      setAmount("");
      setSelectedOption("");
      setTokensToBuy("");
    } catch (error) {
      setErrors((prevErrors) => [
        ...prevErrors,
        "Error purchasing tokens: " + error,
      ]);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    if (option === "ETH") {
      setTokensToBuy(calculateTokens(amount));
    } else if (option === "USDT_ETH") {
      setTokensToBuy(amount);
    } else if (option === "BNB") {
      setTokensToBuy(calculateTokens(amount));
    } else if (option === "USDT_BNB") {
      setTokensToBuy(amount);
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);

    if (selectedOption === "ETH") {
      setTokensToBuy(calculateTokens(event.target.value));
    } else if (selectedOption === "USDT_ETH") {
      setTokensToBuy(event.target.value);
    } else if (selectedOption === "BNB") {
      setTokensToBuy(calculateTokens(event.target.value));
    } else if (selectedOption === "USDT_BNB") {
      setTokensToBuy(event.target.value);
    }
  };

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setConnectedWallet(accounts[0]);
        }
      } catch (error) {
        console.error("Error fetching account:", error);
        setErrors((prevErrors) => [
          ...prevErrors,
          "An error occurred: " + error.message,
        ]);
      }
    };

    fetchAccount();
  }, []);

  // const handleErrorMessageClick = (errorMessage) => {
  //   // Display complete error details in a JavaScript alert
  //   alert(errorMessage);
  // };

  // const formatErrorMessage = (errorText, index) => {
  //   var truncatedErrorMessage = "";
  //   var errorMessage = "";
  //   const words = errorText.split(" ");
  //   if (words.length < 15) {
  //     errorMessage = errorText;
  //   } else {
  //     const errorObjectStartIndex = errorText.lastIndexOf("message") + 9;
  //     const errorObjectEndIndex = errorText.indexOf(
  //       "}}",
  //       errorObjectStartIndex
  //     );
  //     const errorObjectText = errorText.substring(
  //       errorObjectStartIndex,
  //       errorObjectEndIndex
  //     );
  //     var errorObject = errorObjectText.replace(/['"]+/g, "");
  //     errorMessage = errorObject;
  //   }
  //   truncatedErrorMessage = errorObject;
  //   if (words.length >= 36) {
  //     return (
  //       <React.Fragment key={index}>
  //         {truncatedErrorMessage}...
  //         <span
  //           className="error-details-link"
  //           onClick={() => handleErrorMessageClick(errorMessage)}
  //         >
  //           (Click for details)
  //         </span>
  //       </React.Fragment>
  //     );
  //   } else {
  //     return (
  //       <React.Fragment key={index}>{truncatedErrorMessage}</React.Fragment>
  //     );
  //   }
  // };

  // const formatErrorMessage = (errorMessage, index) => {
  //   errorObject = errorMessage;
  //   const reasonMatch = errorMessage.match(/message:="([^"]+)"/);
  //   const reason = reasonMatch ? reasonMatch[1] : "Unknown error";

  //   return (
  //     <React.Fragment key={index}>
  //       {`error: ${reason}`}
  //       <span
  //         className="error-details-link"
  //         onClick={() =>
  //           handleErrorMessageClick(errorObject.originalError.message, index)
  //         }
  //       >
  //         (Click for details)
  //       </span>
  //     </React.Fragment>
  //   );
  // };

  const handleErrorMessageClick = (errorMessage) => {
    // Display complete error details in a JavaScript alert
    alert(errorMessage);
  };

  const formatErrorMessage = (errorText, index) => {
    const words = errorText.split(" ");
    let truncatedErrorMessage = "";
    let errorMessage = "";

    if (words.length < 15) {
      errorMessage = errorText;
      return <React.Fragment key={index}>{errorMessage}.</React.Fragment>;
    } else {
      const errorObjectStartIndex = errorText.lastIndexOf("message") + 9;
      const errorObjectEndIndex = errorText.indexOf(
        "}}",
        errorObjectStartIndex
      );
      const errorObjectText = errorText.substring(
        errorObjectStartIndex,
        errorObjectEndIndex
      );
      const errorObject = errorObjectText.replace(/['"]+/g, "");
      errorMessage = errorObject;
      truncatedErrorMessage = errorObject;

      if (words.length >= 36) {
        return (
          <React.Fragment key={index}>
            {truncatedErrorMessage}...
            <span
              className="error-details-link"
              onClick={() => handleErrorMessageClick(errorMessage)}
            >
              (Click for details)
            </span>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={index}>{truncatedErrorMessage}</React.Fragment>
        );
      }
    }
  };

  const renderErrorMessages = () => {
    return (
      <div className="error">
        {errors.map((errorText, index) => (
          <p key={index}>{formatErrorMessage(errorText, index)}</p>
        ))}
      </div>
    );
  };

  const time = new Date("06-27-2023 03:00 pm");
  time.setSeconds(time.getSeconds() + 10); // 10 minutes timer

  return (
    <div className="presale border_color">
      <div className="componentContainer">
        <MyStopwatch expiryTimestamp={time} />
      </div>
      <div>
        <div className="result">
          {errors.length > 0 && renderErrorMessages()}
          {transactionHash && (
            <div className="success">
              Transaction successful! Transaction hash: {transactionHash}
            </div>
          )}
        </div>
      </div>
      <div className="presale_quote">
        Fast and Reliable : AI KITT
        {connectedWallet ? (
          <>
            <div>
              <h3>Participate with</h3>
              <div className="currencycard">
                <div
                  className={`card${selectedOption === "ETH" ? "active" : ""}`}
                  onClick={() => handleOptionClick("ETH")}
                >
                  <img src="eth_logo32.png" alt="ETH" />
                  <p>ETH</p>
                </div>
                <div
                  className={`card${
                    selectedOption === "USDT_ETH" ? "active" : ""
                  }`}
                  onClick={() => handleOptionClick("USDT_ETH")}
                >
                  <img src="usdt_eth_logo32.png" alt="USDT(ETH)" />
                  <p>USDT(ETH)</p>
                </div>
                <div
                  className={`card${selectedOption === "BNB" ? "active" : ""}`}
                  onClick={() => handleOptionClick("BNB")}
                >
                  <img src="bnb_logo32.png" alt="BNB" />
                  <p>BNB</p>
                </div>
                <div
                  className={`card${
                    selectedOption === "USDT_BNB" ? "active" : ""
                  }`}
                  onClick={() => handleOptionClick("USDT_BNB")}
                >
                  <img src="usdt_bnb_logo32.png" alt="USDT(BNC)" />
                  <p>USDT(BNC)</p>
                </div>
              </div>
            </div>
            {selectedOption && (
              <div className="separator">
                {/* <p>Selected Option: {selectedOption}</p> */}
                <input
                  placeholder="Enter the investment amount"
                  className="address_input border_color"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                />
                <p>Token you will own: {tokensToBuy}</p>
                <button
                  className="kittButtonDiv getOCT_button border_color"
                  onClick={handlePurchase}
                >
                  Purchase Tokens
                </button>
              </div>
            )}
            {transactionHash && (
              <div>
                <p>Transaction Hash: {transactionHash}</p>
                <p>
                  Congratulations! You have successfully purchased KITT tokens.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="kittButtonDiv">
            <button
              className="getOCT_button border_color"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreSaleBuy;
