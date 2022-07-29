import {React, Component, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DisplayCard from '../../components/DisplayCard';

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

function List() {
    let {type} = useParams();
    let {category} = useParams();

    const base_image = 'https://www.themoviedb.org/t/p/w220_and_h330_face';

    const [list, setList] = useState({data : []});

    const fetchList = () => {
        axios.get(`https://api.themoviedb.org/3/${type}/${category}?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
        .then((lst) => {
          setList({data:lst.data.results});
        })
        .catch(console.error);
      }
      console.log(list);

    useEffect(() => {
        fetchList();
        console.log(list);
    }, []);

    return (
        <div>
            <Container>
                <Row>
            {list.data.map(list => 
                <Col md={2}>
                    <DisplayCard img={base_image + list.poster_path} title={list.original_title || list.original_name} date={list.release_date || list.first_air_date}/>
                </Col>
            )}
                </Row>
            </Container>
        </div>
    );
}    

export default List;