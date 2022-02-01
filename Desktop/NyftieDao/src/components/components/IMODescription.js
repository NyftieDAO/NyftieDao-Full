import React from "react";
import { 
    Card,
    Row,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    ProgressBar
    } from 'react-bootstrap';

function IMOCard(props) {
    return ( 
        <div> 
            <Card className="nft__item " style={{cursor: "pointer"}}>
                <Row>
                    <Col sm={1} style={{margin: "0 auto 1rem auto"}}>
                        <img style={{borderRadius: "50%", borderWidth: "2", width: "40px"}} src="../../../public/img/author/author-1.jpg"></img>
                    </Col>
                    <Col sm={11}>
                        <h2 style={{margin: "auto auto auto 0"}}>{props.imoID}</h2>
                    </Col>
                </Row>
                <Row>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Row>
                <Row style={{display: "inline"}}>
                    <span aria-hidden="true" onClick={()=> window.open("twitter.com", "_blank")} className="social_twitter"/>
                    <span aria-hidden="true" onClick={()=> window.open("twitter.com", "_blank")} className="icon_globe-2"/>
                </Row>
                <Row>
                    <h3 style={{margin: "1rem auto 1rem 0"}}>Sale Details</h3>
                </Row>
                <Row style={{margin: "0 1rem 0 1rem"}}>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    <h4>Access Type:</h4>
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    Open
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    <h4>Sales Cap:</h4>
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    500,000 TKN
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    <h4>Trade Rate:</h4>
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    1 TKN : 1 DAI
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    <h4>Sale Start Date:</h4>
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    Feb 13, 2022 - 11:00 am UTC
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Row>
                <Row>
                    <h3 style={{margin: "1rem auto 1rem 0"}}>Token Details</h3>
                </Row>
                <Row style={{margin: "0 1rem 0 1rem"}}>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    <h4>Token Name:</h4>
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    NewToken (TKN)
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    <h4>Type:</h4>
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    ERC20
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    <h4>Total Supply:</h4>
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    1,000,000
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    <h4>Token Lising:</h4>
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    TBD
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Row>
            </Card>

        </div>
        );
}

export default IMOCard;