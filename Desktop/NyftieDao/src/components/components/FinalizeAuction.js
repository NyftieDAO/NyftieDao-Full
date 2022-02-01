import React from "react";
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);


function FinalizeAuction() {

    const auction_contract_address = "0x35D7Ef050319Dc6F892470c3270ba546E579A17F";

    async function finalizeAuction(){

    const _auctionId = document.getElementById("auctionNumber").value;
    
    const encodedFunction = web3.eth.abi.encodeFunctionCall({
        name: "finalizeAuction",
        type: "function",
        inputs: [{
        type: 'uint256',
        name: '_auctionId'
        }]
        }, [_auctionId]);

        const transactionParameters = {
        to: auction_contract_address,
        from: window.ethereum.selectedAddress,
        data: encodedFunction
        };
        const txt = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
        });
        return txt
        }

    return ( 
        <div>
            <button className="btn-main" onClick={() => finalizeAuction()}>Finalize Auction</button>
        </div> 
    );
}

export default FinalizeAuction;