import React from "react";
import { 
    Card,
    Row,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    ProgressBar,
    Button
    } from 'react-bootstrap';

function IMOCard(props) {
    return ( 
        <div> 
            <Card className="nft__item " style={{cursor: "pointer"}}>
                <Row>
                    <Col sm={3} style={{margin: "0 auto 1rem auto"}}>
                        <img style={{borderRadius: "50%", borderWidth: "2", width: "60px"}} src="../../../public/img/author/author-1.jpg"></img>
                    </Col>
                    <Col sm={9}>
                        <h3 style={{margin: "0 auto 0 auto"}}>{props.imoID}</h3>
                        <span>$TKN</span>
                    </Col>
                </Row>
                <Row>
                    <Card style={{margin: "1rem auto 1rem auto", height: "50px", backgroundColor: "grey", color: "white"}}>
                        <Row style={{margin: "auto 0 auto 0"}}>
                            <Col sm={6}>
                                WhiteListed:
                            </Col>
                            <Col style={{textAlign: "end"}} sm={6}>
                                Not WhiteListed
                            </Col>
                        </Row>
                    </Card>
                </Row>
                <Row>
                    <button className="btn-main" style={{margin: "0 auto 1rem auto", width: "100%", height: "50px"}}>Buy Token</button>
                </Row>
                <Row>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    Raise Target:
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    <h4>$500,000</h4>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    Start Date:
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    <h4>Feb 13, 2022</h4>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col sm={6}>
                                    Trade Rate:
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    <h4>1 TKN : 1 DAI</h4>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem >
                            <p style={{textAlign: "end", fontSize: "12px", marginBottom: "0"}}>0%</p>
                            <ProgressBar animated now={0} />
                            <Row style={{fontSize: "12px"}}>
                                <Col sm={6}>
                                    0 DAI
                                </Col>
                                <Col style={{textAlign: "end"}} sm={6}>
                                    0/500,000
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