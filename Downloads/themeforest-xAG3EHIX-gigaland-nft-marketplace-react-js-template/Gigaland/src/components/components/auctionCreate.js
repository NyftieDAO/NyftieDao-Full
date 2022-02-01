import React from 'react';
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

function AuctionCreate() {
    
    const auction_contract_address = "0x35D7Ef050319Dc6F892470c3270ba546E579A17F"

    async function createAuction(){

        const _nftAddress =  document.getElementById("nftAddress").value;
        const _nftID =  document.getElementById("nftID").value;
        const _auctionTitle =  document.getElementById("auctionTitle").value;
        const _metadata =  document.getElementById("metadata").value;
        const _startPrice =  document.getElementById("startPrice").value;
        const _biddingTime =  document.getElementById("biddingTime").value;

        const bn = web3.utils.toBN(_startPrice).toString();
        console.log(bn);
        
        const encodedFunction = web3.eth.abi.encodeFunctionCall({
          name: "createAuction",
          type: "function",
          inputs: [{
            type: 'address',
            name: '_deedRepositoryAddress'
            }, {
            type: 'uint256',
            name: '_deedId'
            }, {
            type: 'string',
            name: '_auctionTitle'
            },{
            type: 'string',
            name: '_metadata'
            },{
            type: 'uint256',
            name: '_startPrice'
            },{
            type: 'uint256',
            name: '_biddingTime'
            }]
        }, [_nftAddress, _nftID, _auctionTitle, _metadata, bn, _biddingTime]);

      
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
            <h5>Auction Title</h5>
            <input type="text" name="item_title" id="auctionTitle" className="form-control" placeholder="e.g. 'Crypto Funk" />

            <div className="spacer-10"></div>

            <h5>Auction Starting Price</h5>
            <input type="text" name="item_title" id="startPrice" className="form-control" placeholder="e.g. 'Crypto Funk" />

            <div className="spacer-10"></div>

            <h5>Auction Duration</h5>
            <input type="text" name="item_title" id="biddingTime" className="form-control" placeholder="e.g. 'Crypto Funk" />

            <div className="spacer-10"></div>

            <button className="btn-main" onClick={() => createAuction()}>Create Auction</button>
        </div>
     );
}


export default AuctionCreate;

