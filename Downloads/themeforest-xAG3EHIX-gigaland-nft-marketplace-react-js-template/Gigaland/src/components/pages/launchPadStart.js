import React from 'react';
import { Link } from '@reach/router';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import WalletButton from "../components/walletButton";
// import { Button} from 'react-bootstrap';

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

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const LaunchPadStart = () => (
<div>
<GlobalStyles/>
  <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'./img/background/subheader.jpg'})`}}>
    <div className='mainbreadcumb'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className="col-lg-5 text-light wow fadeInRight" data-wow-delay=".5s">
              <div className="spacer-10"></div>
              <h1>Launch Your own MetaMarket and Create a DAO to Govern it</h1>
              <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.</p>
          </div>
          <div className="col-lg-4 offset-lg-2 wow fadeIn" data-wow-delay=".5s">
            <div className="box-login">
              <h3 className="mb10">Get Started</h3>
              <p>Use an account that has completed KYC or create a new account <NavLink to="/register">here</NavLink> .</p>
              <Link className="btn-main" to="/launchpad/splitter">Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</div>

);
export default LaunchPadStart;