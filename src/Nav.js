import react, { useState } from "react";
import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare } from "react-icons/fa";
import "./App.css";
const Nav = () => {

const [showMediaIcons,setshowMediaIcons]=useState(false);

    return (
        <>
            <nav className="main-nav">
                <div className="logo ">
                    <h2 style={{marginLeft:"",display:"flex",flexDirection:"row"}}>Chat App</h2>
                </div>
                {/* <div className= {showMediaIcons?"menu-link mobile-menu-link":"menu-link"}>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Services</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div> */}
                {/*social*/}

                {/* <div className="social-media">


                    <ul className="social-media-desktop">
                        <li>
                            <a href="https://www.facebook.com/" target="_next"><FaFacebookSquare className="facebook"/></a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/" target="_next"><FaInstagramSquare className="instagram"/></a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/" target="_next"><FaYoutubeSquare className="youtube"/></a>
                        </li>
                    </ul>

<div className="hamburger-menu">

</div> */}


                {/* </div> */}
            </nav>

            {/* <section className="hero-section">
            <p>Welcome</p>
            <h1>React Nav</h1>
            </section> */}
        </>
    );
};

export default Nav;