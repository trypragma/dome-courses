import * as React from "react";
import '../App.css';

const Heading = ({ contractAddress }) => {
    const contractURL = "https://ropsten.etherscan.io/address/" + contractAddress;
    
    return (
        <>
            <h2 style={{ color: 'black', margin: 0 }}>Boring Company 🙄</h2>
            <a href={contractURL} target="blank">
                <p>Contract</p>
            </a>
        </>
    )
}

export default Heading;