import axios from 'axios';
import {React, Component, useState, useEffect} from 'react'; 
import moment from "moment";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

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
import movieThumb from '../../assets/movie.jpg';
import avatar from '../../assets/avatar.jpg';
import castImg from '../../assets/cast.jpg';

  function Detail() {
    const base_image = 'https://www.themoviedb.org/t/p/w300';
    const base_backdrop = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';
    const base_avatar = 'https://image.tmdb.org/t/p/w45_and_h45_face';
    const base_youtube ='https://www.youtube.com/embed/';
    let testingLink = "/https://www.gravatar.com/avatar/6e7edad7bbe0c";
    testingLink = testingLink.replace('/https', 'https');
    console.log(testingLink);

    const [details, setDetails] = useState({data : []});
    const [rec, setRec] = useState({data: []});
    const [genres, setGenres] = useState({data:[]});
    const [crews, setCrews] = useState({data:[]});
    const [cast, setCast] = useState({data:[]});
    const [reviews, setReviews] = useState({data: []});
    const [video, setVideo] = useState({data: []});
    const [gallery, setGallery] = useState({data: []});

    let {id} = useParams();
    let {type} = useParams();   

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
        .then((det) => {
            setDetails({data:det.data});
            setGenres({data:det.data.genres});
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
        })
        .catch(console.error);

        axios.get(`https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
        .then((rev) => {
            setReviews({data:rev.data.results});
        })
        .catch(console.error);

        axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
        .then((vd) => {
            setVideo({data:vd.data.results});
        })
        .catch(console.error);

        axios.get(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=0594de7fc8c74e81a956ee14a5b952bd`)
        .then((gal) => {
            setGallery({data:gal.data.results});
        })
        .catch(console.error);
      }, []);

      console.log(gallery);

      const director = crews.data.filter(dir => {
        return dir.job == 'Director';
      })
      
      const writer = crews.data.filter(wr => {
        return wr.job == "Writer";
      })

      const trailer = video.data.filter(tr => {
        return tr.type == "Trailer";
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
                                            {director.map((dir, i) =>
                                                <span key={i}>{dir.original_name}<br /></span> 
                                            )}
                                        </Col>
                                        }
                                        {writer.length >= 1 &&
                                        <Col md={6} xs={6}>
                                        <h6>Writer :</h6>
                                            <Row>
                                                {writer.map((wr, i) =>
                                                    <Col md={12} key={i}>
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
                <Row>
                    <Col lg={8}>
                        <div className='trailerContainer'>
                            <h2 style={{paddingTop:'10px', paddingLeft:'10px'}}>Trailers</h2>
                            <Swiper
                            modules={[Navigation]}
                            slidesPerView={1}
                            loop={true}
                            navigation
                            className='trailerSwiper'
                            >
                                {trailer.map(trailers =>
                                    <SwiperSlide key={trailers.id}>
                                        <iframe width="550" height="412" className='trailerVid' src={base_youtube + trailers.key} />
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='sideDetail'>
                            <div className='sideReview'>
                                <h2 className='sideTitle'>Reviews</h2>
                                <div className='reviewContainer outerScroller'>
                                {reviews.data.map(rev =>
                                    <div key={rev.id} style={{marginBottom:"30px"}}>
                                        <Row>
                                            <Col md={2}>
                                            {rev.author_details.avatar_path ?
                                                <>
                                                {rev.author_details.avatar_path.slice(0,6) == '/https' ?
                                                    <Image src={rev.author_details.avatar_path.replace('/https', 'https')} className='avtBig' roundedCircle/>
                                                    : 
                                                    <Image src={base_avatar + rev.author_details.avatar_path} roundedCircle/>  
                                                }
                                                </>
                                                :
                                                <Image src={avatar} roundedCircle/>
                                            }
                                            </Col>
                                            <Col md={10}>
                                                <h5 style={{color: '#F93800'}}>{rev.author_details.username}</h5>
                                                <p style={{marginTop:'-10px', color: '#F93800'}}>{moment(rev.created_at).format('MMMM Do, YYYY')}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <div className='reviewContent scroller'>
                                                    <p>{rev.content}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <h2 style={{marginTop:'50px'}}>Cast</h2>
                    <div className='horizontal-scrollable scroller justify-content-center'>
                        {cast.data.map(cast => 
                        <div key={cast.id} className='hs'>
                            {cast.profile_path ? 
                                <CastCard 
                                img={base_image + cast.profile_path}
                                name={cast.name}
                                role={cast.character}
                                />
                            :
                                <CastCard 
                                img={castImg}
                                name={cast.name}
                                role={cast.character}
                                />
                            }    
                        </div>
                        )}
                    </div>
                    <h2 style={{marginTop:'30px'}}>Recomendations</h2>
                    <div className='horizontal-scrollable scroller justify-content-center'>
                        {rec.data.map(rec => 
                        <div key={rec.id} onClick={() => window.location.reload(false)} className='hs'>
                            {rec.poster_path !== null &&
                                <DisplayCard
                                type={rec.media_type}
                                id={rec.id}
                                img={base_image + rec.poster_path}
                                title={rec.original_name || rec.original_title}
                                date={rec.first_air_date || rec.release_date}
                                />
                            }     
                            {rec.poster_path == null &&
                                <DisplayCard
                                type={rec.media_type}
                                id={rec.id}
                                img={movieThumb}
                                title={rec.original_name || rec.original_title}
                                date={rec.first_air_date || rec.release_date}
                                />
                            }
                        </div>
                        )}
                    </div>
                </Row>
            </Container>
        </Container>
    );
  }

  export default Detail;
  