import React from "react";
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

  function DisplayCard(props) {
    return (
    <Card style={{ width: '12rem', border:'none', backgroundColor:'black' }}>
        <Card.Img style={{borderRadius:'20px'}} variant="top" src={props.img} />
        <Card.Body>
            <Card.Title style={{fontSize:'16px', color:'white'}}>{props.title}</Card.Title>
            <Card.Text style={{fontSize:'14px', color:'grey'}}>
            {props.date}
            </Card.Text>
        </Card.Body>
    </Card>
    );
  }

  export default DisplayCard;