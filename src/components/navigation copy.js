import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"

import 'bootstrap/dist/css/bootstrap.min.css'
import { useStaticQuery, graphql, Link } from "gatsby"

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

    return (
    <Navbar collapseOnSelect expand="lg" className={styles.navbarBlend}>
        <Navbar.Brand as={Link} to="/" className={styles.navBrand}>
            <img alt="Kei-Camp" align="left" src={require('../images/icon.png')}/>
            <h1>{site.siteMetadata.title}</h1>
            <h6>{site.siteMetadata.altDescription}</h6>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className={styles.nav}>
            {allNavigationYaml.edges.map(({node}, index) => {
                if(node.dropdown) {
                    const dropdownTitle = <span className={styles.navbarLinkText}>
                        {node.name}
                        <div className={styles.linkBorder}></div>
                    </span>

                    return(
                        <NavDropdown bsPrefix={`nav-link ${styles.navDropdown}`} title={dropdownTitle} id="collasible-nav-dropdown">
                        {node.dropdown.map(({ name, link }) => (
                            <NavDropdown.Item as={Link} to={link} className={`${styles.navDropdownLink} dropdown-item`}>{name}</NavDropdown.Item>
                        ))}
                        </NavDropdown>
                    )
                }

                return(
                    <div className={(index === 0) ? styles.navbarLinkLast : styles.navbarLink}>
                        <Nav.Link as={Link} to={node.link} className={styles.navLinkContainer}>
                            <span className={styles.navbarLinkText}>
                                {node.name}
                                <div className={styles.linkBorder}></div>
                            </span>
                        </Nav.Link>
                    </div>
                )
            })}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
}

export default Navigation