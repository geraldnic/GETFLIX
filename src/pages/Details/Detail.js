import axios from 'axios';
import {React, Component, useState, useEffect} from 'react'; 
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

  import { IoStar } from 'react-icons/io5';

  import { useParams } from 'react-router-dom';

  import "./Detail.css";
import CastCard from '../../components/CastCard';
import DisplayCard from '../../components/DisplayCard';

  function Detail() {
    const base_image = 'https://www.themoviedb.org/t/p/w300';
    const base_backdrop = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';
    const [details, setDetails] = useState({data : []});
    const [rec, setRec] = useState({data: []});
    const [genres, setGenres] = useState({data:[]});
    const [crews, setCrews] = useState({data:[]});
    const [cast, setCast] = useState({data:[]});
    let {id} = useParams();
    let {type} = useParams();
    



    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
        .then((det) => {
            setDetails({data:det.data});
            setGenres({data:det.data.genres});
            console.log(det);
        })
        .catch(console.error);

        axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
        .then((creds) => {
            setCrews({data:creds.data.crew});
            setCast({data:creds.data.cast})
        })
        .catch(console.error);

        axios.get(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
        .then((recs) => {
            setRec({data:recs.data.results});
            console.log(recs);
        })
        .catch(console.error);
      }, []);

      const director = crews.data.filter(dir => {
        return dir.job == 'Director';
      })
      
      const writer = crews.data.filter(wr => {
        return wr.job == "Writer";
      })

    return (
        <Container fluid>
            <Container fluid className='mainDetailContainer' style={{backgroundImage:`url(${base_backdrop}${details.data.backdrop_path})`}}>
                <div className='inner'>
                    <Row>
                        <Col md={5} lg={4}>
                            <div className='outerImage'>
                                <div className='mainImage'>
                                    <Image style={{width: '280px'}} src={base_image + details.data.poster_path}/>
                                </div>
                            </div>
                        </Col>
                        <Col md={7} lg={7}>
                            <div className='outerDesc'>
                                <div className='mainDesc'>
                                    <h2>{details.data.original_title || details.data.original_name} ({moment(details.data.date).format('YYYY')})</h2>
                                    <p>{details.data.tagline}</p>
                                    {genres.data.map(genre => 
                                        <p key={genre.id} className='genres'>{genre.name}</p>
                                    )}
                                    <br />
                                    {type == 'movie' &&
                                            <p className='duration'>Runtime: {details.data.runtime} mins</p>
                                    }
                                    {type == 'tv' &&
                                            <p className='duration'>{details.data.number_of_seasons} seasons / {details.data.number_of_episodes} episodes</p>
                                    }
                                    <p className='duration'><IoStar /> {parseFloat(Math.round(details.data.vote_average*10)/10).toFixed(1)}</p>
                                    <h4>Overview</h4>
                                    <p>{details.data.overview}</p>
                                    <Row>
                                        {director.length >= 1 &&
                                        <Col md={6} xs={6}>
                                            <h6>Director : </h6>
                                            {director.map(dir =>
                                                <span>{dir.original_name}<br /></span> 
                                            )}
                                        </Col>
                                        }
                                        {writer.length >= 1 &&
                                        <Col md={6} xs={6}>
                                        <h6>Writer :</h6>
                                            <Row>
                                                {writer.map(wr =>
                                                    <Col md={12}>
                                                        <span>{wr.original_name}</span>
                                                    </Col>
                                                )}
                                            </Row>
                                        </Col>
                                        } 
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Container>
                <h2 style={{marginTop:'50px'}}>Cast</h2>
                <div className='horizontal-scrollable scroller justify-content-center'>
                    {cast.data.map(cast => 
                    <div key={cast.id} className='hs'>
                        <CastCard 
                        img={base_image + cast.profile_path}
                        name={cast.name}
                        role={cast.character}
                        />
                    </div>
                    )}
                </div>
                <h2 style={{marginTop:'30px'}}>Recomendations</h2>
                <div className='horizontal-scrollable scroller justify-content-center'>
                    {rec.data.map(rec => 
                    <div key={rec.id} className='hs'>
                        <DisplayCard
                        type={type}
                        id={rec.id}
                        img={base_image + rec.poster_path}
                        title={rec.original_name || rec.original_title}
                        date={rec.first_air_date || rec.release_date}
                        />
                    </div>
                    )}
                </div>
            </Container>
        </Container>
    );
  }

  export default Detail;
  