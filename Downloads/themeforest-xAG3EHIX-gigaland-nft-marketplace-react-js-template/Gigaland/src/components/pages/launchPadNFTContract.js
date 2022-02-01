import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useMoralis, useNewMoralisObject } from "react-moralis";
import styled from "styled-components";
import { Link, navigate } from '@reach/router';
import Web3 from 'web3';
import NFTRoyalty from "../../abi/NFTRoyalty.json";
import { 
    Card,
    Row,
    Col,
    Spinner
    } from 'react-bootstrap';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const NavLink = props => (
    <Link 
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          className: isCurrent ? 'active' : 'non-active',
        };
      }}
    />
  );
  
const web3 = new Web3(window.ethereum);

function Button({ isLoading, children, ...props }) {
  return (
    <button type="button" className="btn-main" {...props}>
      {isLoading ? <Spinner animation="border" /> : children}
    </button>
  );
}

const Collection= function(props) {

  const [isButtonLoading, setIsButtonLoading] = React.useState(false);

  const { user, Moralis } = useMoralis();

  const { isSaving, error, save } = useNewMoralisObject('RoyaltyNFT');
  // let userAddress = ""

  // if (!user) {
  //   userAddress = "not signed in"
  // }
  // else {
  //   userAddress = user.get("ethAddress")
  // }

  // Create token instance
  let nftContract = new web3.eth.Contract(
    NFTRoyalty.abi
    );
  nftContract.options.data = NFTRoyalty.bytecode;

  let splitterAdddress = localStorage.getItem('splitter')

  const testWeb3 = () => {
    const name = document.getElementById("name").value;
    const symbol = document.getElementById("symbol").value;
    const royalty = document.getElementById("royalty").value;

    nftContract.deploy({
        arguments: [name, symbol, royalty, splitterAdddress]
      })
      .send({
        from: window.ethereum.selectedAddress
      })
      .then(function(newContractInstance){

        localStorage.setItem('NFTtoken', newContractInstance.options.address);

        let NFTAddress = newContractInstance.options.address

        save({name, symbol, royalty, NFTAddress, splitterAdddress})

        setIsButtonLoading(false);
    });
  }; 

  return (
  <div>
  <GlobalStyles/>

    <section className='contatiner no-bottom' style={{height: "100vh", padding: "0 0 0 0"}}>
        <Card style={{margin: "7rem"}}>
            <h2 className="text-center" style={{margin: "3rem 0 3rem 0"}}>Create Your Royalty NFT</h2>
            <div className="field-set" style={{margin: "0 5rem 0 5rem"}}>
              <p>
                This is the base NFT contract that you will use to mint your NFTs in the future. You will not be minting your NFTs right now.
              </p>
                <Row>
                    <Col sm={8}>
                        <h5>NFT Name</h5>
                        <input type="text" name="token_name" id="name" className="form-control" placeholder="e.g. 'Dogecoin'" />
                    </Col>
                    <Col sm={4}>
                        <h5>NFT Symbol</h5>
                        <input type="text" name="token_symbol" id="symbol" className="form-control" placeholder="e.g. 'D'" />
                    </Col>
                </Row>
                <div className="spacer-10"></div>

                <h5>Royalty Percentage</h5>
                <p>This is the royalty percent of each transaction that your NFT will generate. 
                  Remeber your IDL investors will want to have a decent return on their investement 
                  and the greater the profit generated from royalties the more valuable your 
                  governance token will become. </p>
                <input type="number" name="token_symbol" id="royalty" className="form-control" placeholder="50000" />

                <Button
                  style={{margin: "1rem auto"}}
                  onClick={() => {
                    setIsButtonLoading(true);
                    testWeb3();
                  }}
                  isLoading={isButtonLoading}
                >
                  Deploy NFT Contract
                </Button>
            </div>
            <NavLink to={`/launchpad/dao`} style={{textAlign: "end", margin: "1rem"}}>
                Step 2: Create DAO Governance Contract
                <span aria-hidden="true" className="arrow_carrot-right"></span>
            </NavLink>  
        </Card>
    </section>

  </div>
  );
}
export default Collection;

