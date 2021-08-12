import React, { useState } from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './SearchBar.css'

const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false)
    

    const getUsers = async (name) =>{
        setShow(true)
        await axios.get(`https://api.github.com/search/users?q=${name}`)
        .then(response=>{
            setUsers(response.data.items)
            setShow(false)
        })
    };
    function handleSubmit(e) {
        e.preventDefault();
        if (searchText == "noloro"){
            toast.error("No tienes permitido buscarnos!!")
        }else if (searchText.length >= 4){
            getUsers(searchText)
        }else {
            toast.warn("El nombre de usuario tiene que tener un minimo de 4 caracteres") 
        }
    }

    
    return (
        <>
            <ToastContainer/>
            <div className="container">
                <h1 className="text-center mt-5">Buscador de usuarios de GitHub <FontAwesomeIcon  icon={faGithubAlt} className="" size="2x"/></h1>
            </div>
            <div className="searchBar mt-5">
                <div >
                    <Form className="form-inline" onSubmit={handleSubmit}>
                        <Row className="align-items-center">
                            <Col xm="auto">
                                <input type="search" className="form-control" placeholder="Search User by name..." onChange={(e => {setSearchText(e.target.value)})}/> 
                            </Col>
                            <Col xs="auto">
                                <Button type="submit" className="form-control btn btn-success"><FontAwesomeIcon  icon={faSearch} /></Button>
                            </Col>                          
                        </Row>
                    </Form>
                </div>
            </div>
            <div className="container my-4">
                <ul className="list-group">
                    {
                        users == false ? null : (
                            users.slice(0,10).map((user, index)=>
                                <li key={index} className="list-group-item list-group-item-action searchresult">
                                    <Link to={`/users/${user.login}`} className="row">
                                        <FontAwesomeIcon  icon={faAddressCard} className="adressCard col-sm"/>
                                        <p className="col-sm pt-3">Name: {user.login}</p>
                                        <p className="col-sm pt-3">Id: {user.id}</p> 
                                    </Link>
                                </li>    
                            )
                        )
                    }
                </ul>
            </div>
            
            {
                show == false ? null : (
                    <div className="text-center mt-5">
                        <FontAwesomeIcon icon={faGithubAlt} className="githubIcon" size="5x" spin/>
                    </div>
                )
            }         
        </>
    )
}

export default SearchBar;