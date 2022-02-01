import React from 'react';
import { 
    Card,
    Row,
    Col,
    Container
    } from 'react-bootstrap';

function Dashboard() {
    return ( 
        <div>
            <Container>
                <Row>
                    <Col sm={7}>
                        <Card>
                            <table className="table table-hover caption-top">
                                <caption style={{marginLeft: "10px"}}>Your Marketplaces</caption>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Rank</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Total Liquidty</th>
                                        <th scope="col">APY</th>
                                        <th scope="col">NFTs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope="row">1</th>
                                    <td>
                                        <a href='/m/posters'>/m/posters</a>
                                    </td>
                                    <td>$1320</td>
                                    <td>1.2%</td>
                                    <td>4</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">2</th>
                                    <td>
                                        <a href='/m/NFTgame'>/m/NFTgame</a>
                                    </td>
                                    <td>$4570</td>
                                    <td>3.8%</td>
                                    <td>12</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">3</th>
                                    <td>
                                        <a href='/m/MyMarket'>/m/MyMarket</a>
                                    </td>
                                    <td>$1,510,200</td>
                                    <td>50%</td>
                                    <td>1438</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                    </Col>
                    <Col sm={5}>
                        <Card>
                        <table className="table table-hover caption-top">
                                <caption style={{marginLeft: "10px"}}>Upcoming Marketplaces</caption>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Rank</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Total Locked</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope="row">1</th>
                                    <td>
                                        <a href='/m/posters'>/m/posters</a>
                                    </td>
                                    <td>$1.8M</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">2</th>
                                    <td>
                                        <a href='/m/NFTgame'>/m/NFTgame</a>
                                    </td>
                                    <td>$2.3M</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">3</th>
                                    <td>
                                        <a href='/m/MyMarket'>/m/MyMarket</a>
                                    </td>
                                    <td>$13.6M</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;