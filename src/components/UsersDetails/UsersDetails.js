import React, { useState, useEffect } from 'react';
import { faGithubAlt, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col } from "react-bootstrap";
import "./UsersDetails.css"

const UsersDetails = ({match}) =>{
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(false)
    const [showRepos, setShowRepos] = useState(false)
    const [userRepos, setUserRepos] = useState([]);
    
    useEffect(()=>{
        getUser(match);
        getRepos(match);
    },[])
    
    const getUser = async (match) =>{
        setShow(true)
        await axios.get(`https://api.github.com/users/${match.params.user}`)
        .then(response=>{
            setUser(response.data)          
            console.log(response.data)
            setShow(false)
        })
    };

    const getRepos = async (match) =>{
        await axios.get(`https://api.github.com/users/${match.params.user}/repos`)
        .then(response=>{
            setUserRepos(response.data)          
            console.log(response.data)
        })
    };
    return (
        <>
            {
                show == false ? 
                    <>
                        <div className="container mt-4">
                            <Link to={"/"} className="text-light">
                                <FontAwesomeIcon  icon={faArrowCircleLeft} className="" size="2x"/>
                            </Link>
                            <h1 className="text-center">Usuario encontrado! <FontAwesomeIcon  icon={faGithubAlt} className="" size="2x"/></h1>
                        </div>
                        <div  className="container text-center my-4">
                            <div className="detail ">
                                <img src={user.avatar_url} className="rounded-circle imgAvatar" alt="User Avatar"/>
                                <h5 className="mt-3">Usuario: {user.login}</h5>
             
                                <ul className="list-group mt-3 light">
                                    <li className="list-group-item">Repositorios: {user.public_repos}</li>
                                    <li className="list-group-item">Creado: {user.created_at}</li>
                                    <li className="list-group-item">Seguidores: {user.followers}</li>
                                    <li className="list-group-item">
                                        <div className="card-body text-center light p-0">
                                            <a href={user.html_url} className="card-link light"><FontAwesomeIcon icon={faGithub} size="3x"/></a>
                                            <button className="card-link light btn btn-dark mb-3" onClick={()=>setShowRepos(!showRepos)}>Repositorios</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                    </> : (
                        <div className="text-center mt-5">
                            <FontAwesomeIcon icon={faGithubAlt} className="githubIcon" size="5x" spin/>
                        </div>
                        )
                    
            }
            {
                showRepos == false ? null : (
                    <div className="mt-3 repoBox mx-auto">
                        
                        {userRepos.map((repo) => (
                            <Card key={repo.id} className="light container my-3 boxShadow">
                                <Card.Body>
                                    <Container>
                                        <Row>
                                            <Col xs={8} lg={10}>
                                                <Card.Title>{repo.name}</Card.Title>
                                                <div className="text-info">{repo.description}</div>
                                                {repo.language && <div className="language rounded">{repo.language}</div>}
                                            </Col>
                                            <Col xs={4} lg={2} className="d-flex flex-column">
                                            <Card.Text>
                                                <FontAwesomeIcon  icon={faCodeBranch} className="" /> {repo.forks_count}
                                            </Card.Text>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>
                            </Card>
                            ))
                        }
                    </div>
                )
            }         
        </>
    )
}

export default UsersDetails;