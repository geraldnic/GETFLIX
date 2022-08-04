import React from "react";
import moment from "moment";
import {Col, 
    Card, 
    ListGroup, 
    ListGroupItem, 
    Container, 
    Row, 
    Image, 
    Button, 
    Modal, 
    Nav, 
    Navbar, 
    NavDropdown
  } from "react-bootstrap";

  import './DisplayCard.css';

  function CastCard(props) {
    return (
      <Card className="mainCard" style={{ width: '10rem', border:'none', backgroundColor:'black'}}>
          <Card.Img style={{borderRadius:'20px'}} variant="top" src={props.img} />
          <Card.Body>
              <Card.Title style={{fontSize:'15px', color:'white'}}>{props.name}</Card.Title>
              <Card.Text style={{fontSize:'14px', color:'grey'}}>
              {props.role}
              </Card.Text>
          </Card.Body>
      </Card>
    );
  }

  export default CastCard;