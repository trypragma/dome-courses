import * as React from "react";
import '../App.css';

const WalletHeader = ({currAddress}) => {
    
    return (
        <div className="WalletContainer">
            <button title="Connect Wallet">
                {currAddress ? "Your Address: " + currAddress.substring(0,10) + "..." : "Connect Wallet"}
            </button>
        </div>
    )
}

export default WalletHeader;