import React, { useState, useEffect } from 'react';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./UsersDetails.css"

const UsersDetails = ({match}) =>{
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(false)
    const urlRepo = `https://github.com/${user.login}?tab=repositories`
    useEffect(()=>{
        getUser(match)
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
    
    return (
        <>
            {
                show == false ? 
                <>
                <div className="container mt-4">
                    <Link to={"/"} className="text-dark">
                        <FontAwesomeIcon  icon={faArrowCircleLeft} className="" size="2x"/>
                    </Link>
                    <h1 className="text-center">Usuario encontrado! <FontAwesomeIcon  icon={faGithubAlt} className="" size="2x"/></h1>
                </div>
                <div className="container">
                    <div className="card my-4 border-dark ">
                        <img src={user.avatar_url} className="card-img-left" alt="User Avatar"/>
                        <div className="card-body text-center">
                            <h5 className="card-title">{user.login}</h5>
                            <p className="card-text">{user.bio}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Repositorios: {user.public_repos}</li>
                            <li className="list-group-item">Creado: {user.created_at}</li>
                            <li className="list-group-item">Seguidores: {user.followers}</li>
                        </ul>
                        <div className="card-body text-center">
                            <a href={user.html_url} className="card-link">GitHub</a>
                            <a href={urlRepo} className="card-link">Repositorios</a>
                        </div>
                    </div>
                </div>
                </> : (
                    <div className="text-center mt-5">
                        <FontAwesomeIcon icon={faGithubAlt} className="githubIcon" size="5x" spin/>
                    </div>
                )
            }         
            
        </>
    )
}

export default UsersDetails;