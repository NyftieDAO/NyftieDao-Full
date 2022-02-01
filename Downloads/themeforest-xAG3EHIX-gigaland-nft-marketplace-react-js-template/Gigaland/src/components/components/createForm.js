import React from 'react';
import { useMoralisFile } from "react-moralis";
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

// const printAddress = window.ethereum.selectedAddress;


const nft_contract_address = "0x1b4c32f3E9B3803d66919c317CCf0a840bE0625d";

function CreateForm() {
    const { saveFile } = useMoralisFile();

    async function upload() {
        const fileInput = document.getElementById("file");
        const data = fileInput.files[0];
        const name = document.getElementById("name").value;
     
        const imageFile = await saveFile(name, data, { saveIPFS: true }).then(console.log("file uploaded"));

        const imageHash = imageFile.hash();

        const ipfsURI = `https://ipfs.moralis.io:2053/ipfs/${imageHash}`;

        const metadata = {
            "name":document.getElementById("name").value,
            "description":document.getElementById("description").value,
            "image":ipfsURI
          }

        const metadataFile = await saveFile("metadata.json", {base64 : btoa(JSON.stringify(metadata))}, { saveIPFS: true }).then(console.log("metadataFile uploaded"))

        const metadataFileHash = metadataFile.hash();
        const metadataFileURI = `https://ipfs.moralis.io:2053/ipfs/${metadataFileHash}`

        console.log(`metadataFile URI: ${metadataFileURI}`);

        const txt = await mintToken(window.ethereum.selectedAddress, metadataFileURI).then(console.log("minting token"))

        console.log(txt);
    
    }

    async function mintToken(address, _uri){
        const encodedFunction = web3.eth.abi.encodeFunctionCall({
          name: "mintNFT",
          type: "function",
          inputs: [{
            type: 'address',
            name: 'recipient'
            }, {
            type: 'string',
            name: 'tokenURI'
            }]
        }, [address, _uri]);
      
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
            <div className="field-set">
                <h5>Upload file</h5>

                <div className="d-create-file">
                    <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                    <div className='browse'>
                        {/* <input type="button" id="get_file" className="btn-main" value="Browse"/> */}
                        <input id='file' type="file" className="btn-main" />
                    </div>
                </div>

                <div className="spacer-single"></div>

                <h5>Title</h5>
                <input type="text" name="item_title" id="name" className="form-control" placeholder="e.g. 'Crypto Funk" />

                <div className="spacer-10"></div>

                <h5>Description</h5>
                <textarea data-autoresize name="item_desc" id="description" className="form-control" placeholder="e.g. 'This is very limited item'"></textarea>

                <div className="spacer-10"></div>

                <button type="button" id="upload" className="btn-main" onClick={() => upload()}>Create NFT</button>
            </div>


            {/* <div className="mb-3">      
                <div className="form-group">
                    <div className="input-group mb-3">
                        <input id="name" type="text" className="form-control" placeholder="NFT Name" aria-label="URL" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <input id="description" type="text" className="form-control" placeholder="Description" aria-label="URL" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <input type="file" id="file"/>
                    </div>
                </div>
                <div>  
                    <button className="btn btn-primary" id="upload" onClick={() => upload()}>Upload and Mint</button>
                </div>
                <div className="input-group mb-3" id="resultSpace">
                    <button onClick={() => console.log(printAddress)}>Get Account</button>
                </div>
            </div> */}
        </div>
);
}

export default CreateForm;



