import axios from 'axios';
import {React, Component, useState, useEffect} from 'react';
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

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import DisplayCard from '../components/DisplayCard';

const base_image = 'https://www.themoviedb.org/t/p/w220_and_h330_face'

function Home() {
  const [popular, setPopular] = useState({data : []});
  const [top, setTop] = useState({data : []});
  const [trending, setTrending] = useState({data : []});
  const [popularCat, setPopularCat] = useState('movie');
  const [trCat, setTrCat] = useState('movie');
  const [trendingCat, setTrendingCat] = useState('day');

  const popularTV = () => {
    setPopularCat('tv');
    fetchPopularController();
    console.log(popularCat);
  }

  const fetchPopularChannel = () => {
    
  }

  const fetchPopularController = () => {
    fetchPopular();
  }
  console.log(popularCat);



  const popularMovie = async () => {
    setPopularCat('movie');
    await fetchPopular();
  }

  const trMovie = () => {
    setTrCat('movie');
    console.log(trCat);
    fetchTr();
  }

  const trTV = () => {
    setTrCat('tv');
    console.log(trCat);
    fetchTr();
  }

  const trendingDay = () => {
    setTrendingCat('day');
    console.log(trendingCat);
    fetchTrending();
  }

  const trendingWeek = () => {
    setTrendingCat('week');
    console.log(trendingCat);
    fetchTrending();
  }

  const fetchPopular = () => {
    axios.get(`https://api.themoviedb.org/3/${popularCat}/popular?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
    .then((pop) => {
      setPopular({data:pop.data.results});
    })
    .catch(console.error);
  }
  console.log(popular);


  const fetchTr = () => {
    axios.get(`https://api.themoviedb.org/3/${trCat}/top_rated?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
    .then((tr) => {
      setTop({data:tr.data.results});
    })
    .catch(console.error);
  }

  const fetchTrending = () => {
    axios.get(`https://api.themoviedb.org/3/trending/all/${trendingCat}?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
    .then((trend) => {
      setTrending({data:trend.data.results});
    })
    .catch(console.error);
  }

  useEffect(() => {
    fetchPopular();
    fetchTr();
    fetchTrending();
  }, []);

  console.log(trending);

      return(
        <div>
          <Container fluid className='mainCont'>
            <Container>
              <div className='selector'>
                <h2 className='sub'>What's Popular</h2>
                <select size={2}>
                  <option onClick={popularMovie} selected>Movies</option>
                  <option onClick={popularTV}>TV</option>
                </select>
              </div>
              <div>
                <div className='horizontal-scrollable scroller justify-content-center'>
                  {popular.data.map(pop =>
                    <div key={pop.id} className='hs'>
                      <DisplayCard img={base_image + pop.poster_path} title={pop.original_title || pop.original_name} date={pop.release_date || pop.first_air_date} />
                    </div>
                  )}
                  </div>
                </div>
                <div style={{marginTop:'70px'}} className='selector'>
                  <h2 className='sub'>Top Rated</h2>
                  <select size={2}>
                    <option onClick={trMovie} selected>Movies</option>
                    <option onClick={trTV}>TV</option>
                  </select>
                </div>
                <div className='horizontal-scrollable scroller justify-content-center'>
                  {top.data.map(top =>
                    <div key={top.id} className='hs'>
                      <DisplayCard 
                        img={base_image + top.poster_path} 
                        title={top.original_title || top.original_name} 
                        date={top.release_date || top.first_air_date} />
                    </div>
                  )}
                  </div>
                  <div style={{marginTop:'70px'}} className='selector'>
                    <h2 className='sub'>Trending</h2>
                    <select size={2}>
                      <option onClick={trendingDay} selected>Today</option>
                      <option onClick={trendingWeek}>This Week</option>
                    </select>
                  </div>
                  <div className='horizontal-scrollable scroller justify-content-center'>
                    {trending.data.map(trending =>
                      <div key={trending.id} className='hs'>
                        <DisplayCard 
                          img={base_image + trending.poster_path} 
                          title={trending.original_title || trending.original_name} 
                          date={trending.release_date || trending.first_air_date} />
                      </div>
                    )}
                    </div>
                  
            </Container>
          </Container>
        </div>
      )
    }
  

export default Home;

