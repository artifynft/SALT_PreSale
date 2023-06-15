import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./presale.css";

const Presale = ({ getOCTHandler, txData, walletAddress }) => {
  return (
    <div>
      <div className="presale border_color">
        <div className="presale_quote">Fast and Reliable</div>
        <div>
          <div className="inputAddressDiv ">
            <input
              type="text"
              className="address_input border_color"
              placeholder="Enter your wallet address (0x...)"
              defaultValue={walletAddress}
            />
          </div>
        </div>

        <div>
          <div className="kittButtonDiv border_color">
            <button
              className="getOCT_button border_color"
              onClick={getOCTHandler}
            >
              Get AI KITT
              {/* Get KITT */}
            </button>
          </div>
        </div>

        <div className="tx_data">Transaction Data</div>
        <div className="tx_hash">
          {txData ? txData : "-transaction address to be displayed here-"}
        </div>
      </div>
    </div>
  );
};

export default Presale;
