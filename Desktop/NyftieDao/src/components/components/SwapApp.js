import React from 'react';
import { 
    Card,
    Row,
    Col,
    Container,
    Image,
    } from 'react-bootstrap';

function SwapApp() {
    return ( 
    <div>
        <Card>
            <Row>
                <Col md={3}>
                    <Card className="mx-3 mt-3" style={{height: '50px' }}>
                        <h3 className="mx-auto my-auto">Swap</h3>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="mx-3 mt-3">
                        <ul className="list-inline mb-0">
                            <li className='list-inline-item'><Image src="./img/author/author-1.jpg" className="mx-3 my-3" style={{width: '80px' }} rounded /></li>
                            <li className='list-inline-item '>
                                <p className='my-0'>Swap from:</p>
                                <h3 className='mt-1'>ETH</h3>
                            </li>
                            <li className='list-inline-item ml-auto mr-0'>
                                <input type="text"></input>
                            </li>
                        </ul>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Image src="./img/misc/icons8-up-down-arrow-100.png" className="mx-auto mt-3"style={{width: '75px' }} />
            </Row>
            <Row>
                <Col>
                    <Card className="mx-3 my-3">
                        <ul className="list-inline mb-0">
                            <li className='list-inline-item'><Image src="./img/author/author-1.jpg" className="mx-3 my-3" style={{width: '80px' }} rounded /></li>
                            <li className='list-inline-item '>
                                <p className='my-0'>Swap to:</p>
                                <h3 className='mt-1'>ETH</h3>
                            </li>
                            <li className='list-inline-item ml-auto mr-0'>
                                <input type="text"></input>
                            </li>
                        </ul>
                    </Card>
                </Col>
            </Row>
        </Card>
    </div> 
    );
}

export default SwapApp;