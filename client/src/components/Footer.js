import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa';

function Footer() {
    return (
        <React.Fragment>
            <div className="footer">
                <div className="container">
                    <div className="row">

                        <div className="col-md-4">
                            <div className="yolomy-div">
                                <div className="yolomy">TechNova</div>
                                <p className="yolomy-desc">
                                    WE ARE TECHNOVA - WE UNDERSTAND <br />
                                    INNOVATION AND FUTURE. WE CRAFT OUR <br />
                                    EXPERIENCE WITH PRECISION. <br />
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <p className="text-center yolomy">Connect With Us</p>
                            <br />

                            <div className="d-flex justify-content-center icons-container">
                                <a href="https://facebook.com" className="socio-icon"><FaFacebookF /></a>
                                <a href="https://twitter.com" className="socio-icon"><FaTwitter /></a>
                                <a href="https://instagram.com" className="socio-icon"><FaInstagram /></a>
                                <a href="https://pinterest.com" className="socio-icon"><FaPinterestP /></a>
                                <a href="https://youtube.com" className="socio-icon"><FaYoutube /></a>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="footer-links-slogan float-md-right">
                                <div className="footer-links text-center">
                                    CREDITS | PRIVACY | ABOUT | CONTACT
                                </div>
                                <div className="slogan yolomy">
                                    TechNova: The Future is Now
                                </div>
                            </div>
                        </div>

                        <div className="hide-on-mobile">
                            &nbsp;
                        </div>

                        <div className="col-12">
                            <p className="text-center copyrights">COPYRIGHT, TECHNOVA INC</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Footer;
