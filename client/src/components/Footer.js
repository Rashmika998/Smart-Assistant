import React from 'react'
import { Link } from 'react-router-dom';
import './css/app.css'

export default function Footer() {
    return (
        <div className="footer" style={{color:"white"}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="#" style={{textDecoration:"none",color:"white"}}>Home</Link></li>
                            <li><Link to="#"  style={{textDecoration:"none",color:"white"}}>About</Link></li>
                            <li><Link to="#" style={{textDecoration:"none",color:"white"}}>Admin Login</Link></li>
                            <li><Link to="#" style={{textDecoration:"none",color:"white"}}>Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Contact</h5>
                        <address>
                            <i className="fa fa-phone fa-lg"></i> : +94 71 459 8010<br />
                            <i className="fa fa-envelope fa-lg"></i> : <a href="mailto:ikman.lk" style={{textDecoration:"none",color:"white"}}>
                                ikman.lk</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-google" href="http://google.com/+" style={{textDecoration:"none",color:"white"}}><i className="fa fa-google-plus"></i></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/" style={{textDecoration:"none",color:"white"}}><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/" style={{textDecoration:"none",color:"white"}}><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/" style={{textDecoration:"none",color:"white"}}><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-google" href="http://youtube.com/" style={{textDecoration:"none",color:"white"}}><i className="fa fa-youtube"></i></a>
                            <a className="btn btn-social-icon" href="#" style={{textDecoration:"none",color:"white"}}><i className="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>© Copyright 2022 Smart Assitant</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
