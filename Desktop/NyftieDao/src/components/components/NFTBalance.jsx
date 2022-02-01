import React, { useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Card, Image, Tooltip, Modal } from "react-bootstrap";
import { useNFTBalance } from "../hooks/useNFTBalance";
import styled from "styled-components";
// import { FileSearchOutlined, SendOutlined, ShoppingCartOutlined } from "@ant-design/icons";
// import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
// import { getExplorer } from "helpers/networks";
// import AddressInput from "./AddressInput";
// const { Meta } = Card;

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 260px;
  overflow: hidden;
  border-radius: 8px;
`;

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1000px",
    gap: "10px",
  },
};

function NFTBalance(props) {
  const { account } = useMoralisWeb3Api();
  const { NFTBalance } = useNFTBalance();
//   const { chainId }  = useMoralisDapp();
  const { Moralis } = useMoralis();
  const [visible, setVisibility] = useState(false)
  const [receiverToSend, setReceiver] = useState(null)
  const [amountToSend, setAmount] = useState(null)
  const [nftToSend, setNftToSend] = useState(null)
  const [isPending, setIsPending] = useState(false)

  async function transfer(nft, amount, receiver) {
    const options = {
      type: nft.contract_type,
      tokenId: nft.token_id,
      receiver: receiver,
      contractAddress: nft.token_address,
    };

    if(options.type === "erc1155") {
      options.amount = amount;
    }

    setIsPending(true);
    await Moralis.transfer(options)
      .then((tx) => {
        console.log(tx);
        setIsPending(false);
      })
      .catch((e) => {
        alert(e.message);
        setIsPending(false);
      });
  }

  const handleTransferClick = (nft) => {
    setNftToSend(nft)
    setVisibility(true)
  }

  const handleChange = (e) => {
    setAmount(e.target.value)
  } 

  console.log(NFTBalance);
  console.log(account);
  return (
    <>
      <div className='row'>
        {NFTBalance && 
          NFTBalance.map( (nft, index) => (
            <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="nft__item">
                    <div className="nft__item_wrap">
                      <Outer>
                        <span>
                            <img src={nft.image} className="lazy nft__item_preview" alt=""/>
                        </span>
                      </Outer>
                    </div>
                    <div className="nft__item_info">
                        <span onClick={()=> window.open(nft.token_uri, "_self")}>
                            <h4>{nft.metadata.name}</h4>
                        </span>
                        {/* <div className="nft__item_price">
                            {nft.price}<span>{nft.bid}</span>
                        </div> */}
                        {/* <div className="nft__item_action">
                            <span onClick={()=> window.open(nft.bidLink, "_self")}>Place a bid</span>
                        </div> */}                           
                    </div> 
                </div>
            </div>  
        ))}
        
    </div>
    <Modal
        title={`Transfer ${nftToSend?.name || "NFT"}`}
        visible={visible}
        onCancel={() => setVisibility(false)}
        onOk={() => transfer(nftToSend,amountToSend,receiverToSend)}
        confirmLoading={isPending}
        okText="Send"
      >
        {/* <AddressInput autoFocus placeholder="Receiver" onChange={setReceiver} /> */}
        <input type="text" placeholder="Address"></input>
        {nftToSend && nftToSend.contract_type === "erc1155" && <input placeholder="amount to send" onChange={(e) => handleChange(e)}/>}
      </Modal>
      {/* <div style={styles.NFTs}>
        {NFTBalance &&
          NFTBalance.map((nft, index) => (
            <Card>
              <img src={nft.image} width="200"/>
              <h4>{nft.name}</h4>
              <h4>{nft.token_address}</h4>
            </Card>
          ))}
      </div>
      <Modal
        title={`Transfer ${nftToSend?.name || "NFT"}`}
        visible={visible}
        onCancel={() => setVisibility(false)}
        onOk={() => transfer(nftToSend,amountToSend,receiverToSend)}
        confirmLoading={isPending}
        okText="Send"
      >
        <AddressInput autoFocus placeholder="Receiver" onChange={setReceiver} />
        <input type="text" placeholder="Address"></input>
        {nftToSend && nftToSend.contract_type === "erc1155" && <input placeholder="amount to send" onChange={(e) => handleChange(e)}/>}
      </Modal> */}
    </>
  );
}

export default NFTBalance;
