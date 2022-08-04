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

import {Link, Navigate} from "react-router-dom";

  import './DisplayCard.css';

  function DisplayCard(props) {
    return (
    <Link style={{textDecoration:'none' }} to={`/detail/${props.type}/${props.id}`}>
      <Card className="mainCard" style={{ width: '10rem', border:'none', backgroundColor:'black'}}>
          <Card.Img style={{borderRadius:'20px'}} variant="top" src={props.img} />
          <Card.Body>
              <Card.Title style={{fontSize:'15px', color:'white'}}>{props.title}</Card.Title>
              <Card.Text style={{fontSize:'14px', color:'grey'}}>
              ({moment(props.date).format('YYYY')})
              </Card.Text>
          </Card.Body>
      </Card>
    </Link>
    );
  }

  export default DisplayCard;