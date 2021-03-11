import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Masonry from 'react-masonry-css'
import ImageFade from '../image'
import styles from "./gallery.module.scss"

import $ from 'jquery' 

const GalleryOfficialComponent = () => {
  const basePath = "/assets/images/gallery/";

  const { images } = useStaticQuery(
    graphql`
    query {
      images:allFile(filter: {
        extension: {regex: "/(jpg)|(jpeg)|(png)|(gif)/"},
        sourceInstanceName: {eq: "gallery"},
        relativeDirectory: {eq: "official"}})
      {
        edges {
          node {
            relativePath
            name
            ext
          }
        }
      }
    }
  `);

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    600: 1
  };

  if (typeof window !== `undefined`) {
    window.jQuery = window.$ = require('jquery');
    const fancybox = require('@fancyapps/fancybox');
  }

  return(
  <div id="officialGallery">
    <h1 className={styles.title}>Official Manga/Anime/Other Artwork</h1>
    <div className={styles.galleryMain}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonryGrid}
          columnClassName={styles.masonryGridCol}
        >
        {images.edges.map(({ node }) => {
          const newLink = `<a target='_blank' href=${basePath + node.relativePath}>Full Image</a>`;
          return(
          <div key={node.relativePath} className={styles.imageContainer}>
            <a data-fancybox="gallery" data-caption={newLink} href={basePath + node.relativePath}>
              <ImageFade className={styles.pic} src={`${basePath}thumbnails/official/${node.name + ".jpg"}`}/>
            </a>
          </div>)
        })}
        </Masonry>
      </div>
  </div>
  )
}

export default GalleryOfficialComponent