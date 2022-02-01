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

function OfferingCard() {
    return ( 
        <div> 
            <Card className="nft__item " style={{cursor: "pointer"}}>
                <span onClick={()=> window.open("/imo/VRCasino", "_self")}>
                    <Row>
                        <Col sm={7}>
                            <h3 style={{margin: "0 auto 0 auto"}}>VR Casino</h3>
                            <span>$TKN</span>
                        </Col>
                        <Col sm={5}>
                            <div style={{width: "80px"}}>
                                <img style={{borderRadius: "50%", border: "1px solid $gray"}} src="../../../public/img/author/author-1.jpg" alt=""/>
                            </div>
                        </Col>
                    </Row>
                </span>
                <Row style={{display: "inline"}}>
                    <span aria-hidden="true" onClick={()=> window.open("twitter.com", "_blank")} className="social_twitter"/>
                    <span aria-hidden="true" onClick={()=> window.open("twitter.com", "_blank")} className="icon_globe-2"/>
                </Row>
                <Row>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </Row>
                <Row>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    Total Raise:
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    $500,000
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    Start Date:
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    Feb 13, 2022
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    Trade Rate:
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    1 TKN : 1 DAI
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <p style={{textAlign: "end"}}>45%</p>
                            <ProgressBar animated now={45} />
                        </ListGroupItem>
                    </ListGroup>
                </Row>
            </Card>

        </div>
        );
}

export default OfferingCard;