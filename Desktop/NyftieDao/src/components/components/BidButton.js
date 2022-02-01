import React from "react";
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);


function BidButton() {

    const auction_contract_address = "0x35D7Ef050319Dc6F892470c3270ba546E579A17F";

    async function placeBid(){

    const _bidAmount = document.getElementById("bidAmount").value;
    const _auctionId = document.getElementById("auctionNumber").value;
    
    const encodedFunction = web3.eth.abi.encodeFunctionCall({
        name: "bidOnAuction",
        type: "function",
        inputs: [{
        type: 'uint256',
        name: '_auctionId'
        }]
        }, [_auctionId]);

        const transactionParameters = {
        to: auction_contract_address,
        from: window.ethereum.selectedAddress,
        data: encodedFunction,
        value: _bidAmount
        };
        const txt = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
        });
        return txt
        }

    function buttonClicked() {
        const auctionNumber = document.getElementById("auctionNumber").value;
        console.log(auctionNumber)
    }

    return ( 
        <div>
            <button className="btn-main" onClick={() => placeBid()}>Place Bid</button>
        </div> 
    );
}

export default BidButton;