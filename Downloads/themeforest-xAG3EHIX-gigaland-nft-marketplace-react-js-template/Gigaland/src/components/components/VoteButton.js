import { useNewMoralisObject } from "react-moralis";
import { 
    Card,
    Row,
    Col,
    Container,
    Button,
    Nav,
    Carousel,
    Form,
    ListGroup,
    ListGroupItem,
    ProgressBar
    } from 'react-bootstrap';


function VoteButton() {
    const { isSaving, error, save } = useNewMoralisObject('Proposals');

    function castVote() {
        const voteFor = document.getElementById("voteFor").value;
        const voteAgainst = document.getElementById("voteAgainst").value;
        const voteAbstain = document.getElementById("voteAbstain").value;
        

        console.log(voteFor);

        save({voteFor, voteAgainst, voteAbstain});
        
    }
  
    return (<div>
        {/* <Row>                      
            <button className="btn-main" style={{margin: "0 0 1rem 1rem"}}>For</button>                     
        </Row>
        <Row>
            <button className="btn-main" style={{margin: "0 0 1rem 1rem"}}>Against</button>
        </Row>
        <Row>
            <button className="btn-main" style={{margin: "0 0 1rem 1rem"}}>Abstain</button>
        </Row> */}
        <div>
        <input type="radio" id="voteFor" name="vote" value="1" />
        <label for="for">For</label>
        </div>

        <div>
        <input type="radio" id="voteAgainst" name="vote" value="1" />
        <label for="against">Against</label>
        </div>

        <div>
        <input type="radio" id="voteAbstain" name="vote" value="1" />
        <label for="abstain">Abstain</label>
        </div>
      <button className="btn-main" onClick={() => castVote()} disabled={isSaving}>Cast Vote</button>
    </div>)
}

export default VoteButton;
