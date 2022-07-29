import axios from 'axios';
import {React, Component, useState} from 'react';
import { render } from '@testing-library/react';
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

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import "./App.css";
import Detail from './pages/Details/Detail';

class App extends Component{
  render(){
      return(
        <Router>
          <div className='mainCont'>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                  <Navbar.Brand className='brand' href="/">GETFLIX</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                      <NavDropdown title="Movies" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/list/movie/popular">
                          Popular
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/list/movie/now_playing">
                          Now Playing
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/list/movie/upcoming">
                          Upcoming
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/list/movie/top_rated">
                          Top Rated
                        </NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown title="TV Shows" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/list/tv/popular">
                          Popular
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/list/tv/airing_today">
                          Airing Today
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/list/tv/on_the_air">
                          On TV
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/list/tv/top_rated">
                          Top Rated
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list/:type/:category" element={<List />} />
              <Route path="/detail/:type/:id" element={<Detail />} />
            </Routes>
          </div>
        </Router>
    );
  }
  }

export default App;

