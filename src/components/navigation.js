import React, { useState } from 'react';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Modal from "react-bootstrap/Modal"

import 'bootstrap/dist/css/bootstrap.min.css'
import { useStaticQuery, graphql, Link } from "gatsby"
import { globalHistory as history } from '@reach/router'

import styles from "./navbar.module.scss"

const Navigation = () => {
    const { allNavigationYaml, site } = useStaticQuery(
        graphql`
        query {
            allNavigationYaml {
                edges {
                  node {
                    name
                    link
                    dropdown {
                      link
                      name
                    }
                  }
                }
            }
            site {
                siteMetadata {
                    title
                    altDescription
                }
            }
        }`
    )

    // Handling modal for nav bar when collapsed
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { location } = history;

    return (
    <>
    <Navbar collapseOnSelect expand="lg" className={styles.navbarBlend}>
        <Navbar.Brand as={Link} to="/" className={styles.navBrand}>
            <img alt="Kei-Camp" align="left" src={require('../images/icon.png')}/>
            <p className={styles.brandTitle}>{site.siteMetadata.title}</p>
            <p className={styles.brandDescription}>{site.siteMetadata.altDescription}</p>
        </Navbar.Brand>
        <button className={`navbar-toggler ${styles.navBarToggler}`} onClick={handleShow} aria-label="Toggle navigation">
            <span className={styles.navBarToggleIcon}></span>
        </button>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className={styles.nav}>
            {allNavigationYaml.edges.map(({node}, index) => {
                if(node.dropdown) {
                    const dropdownTitle = <span className={styles.navbarLinkText}>
                        {node.name}
                        <div className={styles.linkBorder} style={location.pathname === node.link ? { borderBottom: '1px solid', width: '100%' } : {} }></div>
                    </span>

                    return(
                        <NavDropdown bsPrefix={`nav-link ${styles.navDropdown}`} title={dropdownTitle} id="collasible-nav-dropdown" key={node.name}>
                        {node.dropdown.map(({ name, link }) => (
                            <NavDropdown.Item as={Link} to={link} className={`${styles.navDropdownLink} dropdown-item`} key={node.name}>{name}</NavDropdown.Item>
                        ))}
                        </NavDropdown>
                    )
                }

                return(
                    <div className={(index === 0) ? styles.navbarLinkLast : styles.navbarLink} key={node.name}>
                        <Nav.Link as={Link} to={node.link} className={styles.navLinkContainer}>
                            <span className={styles.navbarLinkText}>
                                {node.name}
                                <div className={styles.linkBorder} style={location.pathname === node.link ? { borderBottom: '1px solid', width: '100%' } : {} }></div>
                            </span>
                        </Nav.Link>
                    </div>
                )
            })}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    <Modal show={show} onHide={handleClose} contentClassName={styles.modalContent} centered={true}>
        <Modal.Body>
            <ul>
            {allNavigationYaml.edges.map(({node}) => (
                <Link to={node.link} className={styles.modalLink} key={node.link}><li>{node.name}</li></Link>
            ))}
            </ul>
        </Modal.Body>
    </Modal>
    </>
    )
}

export default Navigation