import React from "react";
import { useMoralis } from "react-moralis";
import { Router, Location, Redirect } from '@reach/router';
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import HeaderLI from './menu/headerLoggedIn';
import Home from './pages/home';
import Explore from './pages/explore';
import Collection from './pages/collection';
import ItemDetail from './pages/ItemDetail';
import Author from './pages/Author';
import User from "./pages/user";
import Wallet from './pages/wallet';
import Listing from "./pages/listing";
import Login from './pages/login';
import LoginTwo from './pages/loginTwo';
import Register from './pages/register';
import Price from './pages/price';
import Works from './pages/works';
import News from './pages/news';
import Create from './pages/create';
import Activity from './pages/activity';
import Contact from './pages/contact';
import ElegantIcons from './pages/elegantIcons';
import EtlineIcons from './pages/etlineIcons';
import FontAwesomeIcons from './pages/fontAwesomeIcons';
import Accordion from './pages/accordion';
import Alerts from './pages/alerts';
import Progressbar from './pages/progressbar';
import Tabs from './pages/tabs';
import { createGlobalStyle } from 'styled-components';
import Market from './pages/Market';
import Swap from './pages/swap';
import IMO from './pages/IMO';
import LaunchPadStart from './pages/launchPadStart';
import LaunchPadToken from './pages/launchPadToken';
import LaunchPadSplitter from './pages/launchPadSplitter';
import LaunchPadNFTContract from './pages/launchPadNFTContract';
import LaunchPadDAO from './pages/launchPadDao';
import LaunchPadVoting from './pages/launchPadVoting';
import DaoGovernor from './pages/daoGovernor';
import DaoGovernorProposals from './pages/daoGovernorProposals';
import DaoGovernorNew from './pages/daoGovernorNew';
import DelegateToken from './pages/delegateToken';
import DaoGovernorAbout from './pages/daoGovernorAbout';
import NewProposal from './pages/newProposal';
import IMOLaunch from './pages/IMOLaunch';



const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0,0), [location])
  return children
}

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routerhang'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

// const LogoutButton = () => {
//     const { logout, isAuthenticating } = useMoralis();
  
//     return (
//       <button onClick={() => logout()} disabled={isAuthenticating}>
//         Log out
//       </button>
//     )
//   };

function App() {
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated ) {
    return (
    <div className="wraper">
        <GlobalStyles />
            <Header/>
            <PosedRouter>
                <Home exact path="/">
                    <Redirect to="/home" />
                </Home>
                <Explore path="/explore" />
                <Collection path="/collection" />
                <ItemDetail path="/ItemDetail/:id" />
                <Author path="/Author" />
                <Wallet path="/wallet" />
                <Listing path="/Listing/:userId"/>
                <Login path="/login" />
                <LoginTwo path="/loginTwo" />
                <Register path="/register" />
                <Price path="/price" />
                <Works path="/works" />
                <News path="/news" />
                <Activity path="/activity" />
                <Contact path="/contact" />
                <ElegantIcons path="/elegantIcons" />
                <EtlineIcons path="/etlineIcons" />
                <FontAwesomeIcons path="/fontAwesomeIcons" />
                <Accordion path="/accordion" />
                <Alerts path="/alerts" />
                <Progressbar path="/progressbar" />
                <Tabs path="/tabs" />
            </PosedRouter>
            <ScrollToTopBtn />
    </div>
    );
  }

  return (
    <div className="wraper">
        <GlobalStyles />
            <HeaderLI/>
            <PosedRouter>
                <Home exact path="/">
                    <Redirect to="/home" />
                </Home>
                <Explore path="/explore" />
                <Collection path="/collection" />
                <ItemDetail path="/ItemDetail/:id" />
                <Author path="/Author/:authorId" />
                <User path="/User/:userId"/>
                <Market path="/m/:marketId"/>
                <Wallet path="/wallet" />
                <Swap path="/swap" />
                <Listing path="/Listing/:userId/:tokenId"/>
                <Login path="/login" />
                <LoginTwo path="/loginTwo" />
                <IMO path="/imo/:imoID"/>
                <Register path="/register" />
                <Price path="/price" />
                <Works path="/works" />
                <News path="/news" />
                <LaunchPadStart path="/launchPadStart"/>
                <LaunchPadSplitter path="/launchpad/splitter"/>
                <LaunchPadToken path="/launchpad/token"/>
                <LaunchPadNFTContract path="/launchpad/NFT"/>
                <LaunchPadDAO path="/launchpad/dao"/>
                <LaunchPadVoting path="/launchpad/voting"/>
                <Create path="/m/:marketId/create" />
                <Activity path="/activity" />
                <DaoGovernor path="/dao/:daoId"/>
                <DaoGovernorProposals path="/dao/:daoId/proposals"/>
                <DaoGovernorNew path="/dao/:daoId/new"/>
                <DelegateToken path="/dao/:daoId/delegate"/>
                <DaoGovernorAbout path="/dao/:daoId/about"/>
                <IMOLaunch path="/imolaunch/:daoId/:tokenId"/>
                <Contact path="/contact" />
                <NewProposal path="/dao/:daoId/proposal/:proposalID" />
                <ElegantIcons path="/elegantIcons" />
                <EtlineIcons path="/etlineIcons" />
                <FontAwesomeIcons path="/fontAwesomeIcons" />
                <Accordion path="/accordion" />
                <Alerts path="/alerts" />
                <Progressbar path="/progressbar" />
                <Tabs path="/tabs" />
            </PosedRouter>
            <ScrollToTopBtn />
            {/* <div>
                <h1>Welcome {user.get("username")}</h1>
                <LogoutButton/>
            </div> */}
    
    </div>
  );
}

export default App;