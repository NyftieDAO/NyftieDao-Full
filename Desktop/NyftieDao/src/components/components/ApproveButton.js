import React from "react";
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);


function ApproveButton() {

    const nft_contract_address = "0x1b4c32f3E9B3803d66919c317CCf0a840bE0625d";

    async function approveAuction(){

    const _to = "0x35D7Ef050319Dc6F892470c3270ba546E579A17F";
    const _tokenId = document.getElementById("tokenId").value;
    
    const encodedFunction = web3.eth.abi.encodeFunctionCall({
        name: "approve",
        type: "function",
        inputs: [{
            type: 'address',
            name: 'to'
            }, {
            type: 'uint256',
            name: 'tokenId'
            }]
        }, [_to, _tokenId]);

        const transactionParameters = {
        to: nft_contract_address,
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
            <button className="btn-main" onClick={() => approveAuction()}>Approve Auction</button>
        </div> 
    );
}

export default ApproveButton;