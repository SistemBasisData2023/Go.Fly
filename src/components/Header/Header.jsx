import React , {useRef, useEffect} from "react";
import {Container, Row, Button} from 'reactstrap'
import {NavLink, Link} from 'react-router-dom'

import logo from "../../assets/images/logo1.png"
import './header.css'

const Header = () => {

    const headerRef = useRef(null)

    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
                headerRef.current.classList.add('sticky_header')
            } else {
                headerRef.current.classList.remove('sticky_header')
            }
        })
    }

    useEffect(() => {
        stickyHeaderFunc()

        return window.removeEventListener('scroll', stickyHeaderFunc)
    })

    return <header className="header" ref={headerRef}>
        <Row>
            <div className="nav_wrapper d-flex align-items-center
            justify-content-between">

                {/* Logo Start*/}
                <Link to='/flight'>
                    <div className="Logo">
                        <img src={logo} alt=""/>
                    </div>
                </Link>
                {/* Logo End */}

                {/* Menu Start*/}
                <div className="Navigation">
                    <ul className="menu d-flex align-items-center gap-5">
                    </ul>
                </div>
                {/* Menu End */}
                
                <div className="nav_right d-flex align-items-center gap-4">
                    <div className="nav_btn d-flex align-items-center gap-4">
                        <Button className="btn secondary_btn"><Link to='/login'>Login</Link></Button>
                        <Button className="btn primary_btn"><Link to='/register'>Register</Link></Button>
                    </div>
                </div>
            </div>
        </Row>
    </header>
};

export default Header;