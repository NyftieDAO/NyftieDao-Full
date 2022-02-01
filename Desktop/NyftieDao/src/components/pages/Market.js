import React from 'react';
import SliderMainZero from '../components/SliderMainZero';
import FeatureBox from '../components/FeatureBox';
import CarouselCollection from '../components/CarouselCollection';
import ColumnNew from '../components/ColumnNew';
import AuthorList from '../components/authorList';
import Footer from '../components/footer';

const Market= (props) => (
  <div>
      <section className="jumbotron no-bg bg-gray">
         {/* <h1 className="mt-3 text-center">/m/{props.marketId}</h1> */}
        <SliderMainZero marketID={props.marketId}/>
      </section>

      <section className='container-fluid'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Hot Collections</h2>
              <div className="small-border"></div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <CarouselCollection/>
            </div>
          </div>
        </div>
      </section>

      <section className='container-fluid bg-gray'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Popular Items</h2>
              <div className="small-border"></div>
            </div>
          </div>
        </div>
       <ColumnNew/>
      </div>
      </section>


      <section className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Top Sellers</h2>
              <div className="small-border"></div>
            </div>
          </div>
          <div className='col-lg-12'>
            <AuthorList/>
          </div>
        </div>
      </section>

      <section className='container-fluid bg-gray'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Create and sell your NFTs</h2>
              <div className="small-border"></div>
            </div>
          </div>
        </div>
        <div className='container'>
          <FeatureBox/>
        </div>
      </section>

    <Footer />

  </div>
);
export default Market;
// function Market(props) {
//     console.log(props);
//     return ( 
//         <div>
//             <h3>MarketPlace {props.marketId}</h3>
//         </div>
//     );
// }

// export default Market;