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
import DisplayCard from '../../components/DisplayCard';

const base_image = 'https://www.themoviedb.org/t/p/w220_and_h330_face';

function Home() {
  const [popular, setPopular] = useState({data : []});
  const [top, setTop] = useState({data : []});
  const [trending, setTrending] = useState({data : []});
  const [popularCat, setPopularCat] = useState('movie');
  const [topRatedCat, setTopRatedCat] = useState('movie');

  const fetchPopularTv = () => {
    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
    .then((pop) => {
      setPopular({data:pop.data.results});
      setPopularCat('tv');
    })
    .catch(console.error);
  }

  const fetchPopularMovie = () => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
    .then((pop) => {
      setPopular({data:pop.data.results});
      setPopularCat('movie');
    })
    .catch(console.error);
  }

  const fetchTrTV = () => {
    axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
    .then((tr) => {
      setTop({data:tr.data.results});
      setTopRatedCat('tv');
    })
    .catch(console.error);
  }

  const fetchTrMovie = () => {
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
    .then((tr) => {
      setTop({data:tr.data.results});
      setTopRatedCat('movie');
    })
    .catch(console.error);
  }

  const fetchTrendingDay = () => {
    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
    .then((trend) => {
      setTrending({data:trend.data.results});
    })
    .catch(console.error);
  }

  const fetchTrendingWeek = () => {
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
    .then((trend) => {
      setTrending({data:trend.data.results});
    })
    .catch(console.error);
  }

  console.log(trending);

  useEffect(() => {
    fetchPopularMovie();
    fetchTrMovie();
    fetchTrendingDay();
  }, []);

      return(
        <div>
          <Container fluid className='mainCont'>
            <Container className='searchContainer'>
              <section className='sectionz'>
              {/* <Image className='searchBg' src={searchBackground} style={{width:'100%'}}/> */}
                <div className='searchContent'>
                  <h2 className='searchTitle1'>Welcome.</h2>
                  <h3 className='searchTitle2'>Millions of movies, TV shows, and people to discover. Explore now!</h3>
                  <form className='searchForm'>
                    <input className='searchInput' placeholder='Search for movie, tv show, person...'></input>
                    <Button className='searchButton' variant="success">Search</Button>
                  </form>
                </div>
              </section>
            </Container>
            <Container>
              <div className='selector'>
                <h2 className='sub'>What's Popular</h2>
                <select defaultValue='Movies' size={2}>
                  <option onClick={fetchPopularMovie}>Movies</option>
                  <option onClick={fetchPopularTv}>TV</option>
                </select>
              </div>
              <div>
                <div className='horizontal-scrollable scroller justify-content-center'>
                  {popular.data.map(pop =>
                    <div key={pop.id} className='hs'>
                      <DisplayCard  
                      type={popularCat}
                      id={pop.id}
                      img={base_image + pop.poster_path} 
                      title={pop.original_title || pop.original_name} 
                      date={pop.release_date || pop.first_air_date} />
                    </div>
                  )}
                  </div>
                </div>
                <div style={{marginTop:'70px'}} className='selector'>
                  <h2 className='sub'>Top Rated</h2>
                  <select defaultValue='Movies' size={2}>
                    <option onClick={fetchTrMovie}>Movies</option>
                    <option onClick={fetchTrTV}>TV</option>
                  </select>
                </div>
                <div className='horizontal-scrollable scroller justify-content-center'>
                  {top.data.map(top =>
                    <div key={top.id} className='hs'>
                      <DisplayCard
                        type={topRatedCat} 
                        id={top.id}
                        img={base_image + top.poster_path} 
                        title={top.original_title || top.original_name} 
                        date={top.release_date || top.first_air_date} />
                    </div>
                  )}
                  </div>
                  <div style={{marginTop:'70px'}} className='selector'>
                    <h2 className='sub'>Trending</h2>
                    <select defaultValue='Today' size={2}>
                      <option onClick={fetchTrendingDay}>Today</option>
                      <option onClick={fetchTrendingWeek}>This Week</option>
                    </select>
                  </div>
                  <div className='horizontal-scrollable scroller justify-content-center'>
                    {trending.data.map(trending =>
                      <div key={trending.id} className='hs'>
                        <DisplayCard
                          type={trending.media_type}
                          id={trending.id} 
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

