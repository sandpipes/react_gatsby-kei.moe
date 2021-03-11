import React from "react"
import PropTypes from "prop-types"
import SEO from "../../components/seo"

import Navigation from "../navigation"
import styles from "../layout.module.scss"
import "../global.scss"
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css'

const GalleryLayout = ({ children, title }) => {

  return (
    <>
      <Navigation />
      <div className={styles.testBorder}></div>
      <div className={styles.mainContent}>
        <main>
          <SEO title={title}/>
          {children}
        </main>
      </div>
    </>
  )
}

GalleryLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GalleryLayout