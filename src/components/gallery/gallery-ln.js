import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Masonry from 'react-masonry-css'
import ImageFade from '../image'
import styles from "./gallery.module.scss"

import $ from 'jquery' 

const basePath = "/assets/images/gallery/";

function breakpointCol(length) {
  if(length < 4) {
    return({
      default: length,
      600: 1
    })
  }

  return ({
    default: 4,
    1024: 3,
    768: 2,
    600: 1
  })
}

function getLNImages(ln, images) {

  var items = [];
  for (var i = 0; i < images.edges.length; i++) {
    var {node} = images.edges[i];
    if(!node.relativePath.startsWith(ln)) continue;

    items.push(node);
  }

  return(
  <div className={styles.galleryMain}>
    <Masonry
      breakpointCols={breakpointCol(items.length)}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridCol}
    >
      {items.map((node) => {
        const newLink = `<a target='_blank' href=${basePath + node.relativePath}>Full Image</a>`;
        return(
        <div key={node.relativePath} className={styles.imageContainer}>
          <a data-fancybox="gallery" data-caption={newLink} href={basePath + node.relativePath}>
            <ImageFade className={styles.pic} src={`${basePath}thumbnails/${ln}/${node.name + ".jpg"}`}/>
          </a>
        </div>)
      })}
    </Masonry>
  </div>)
}

const GalleryLNComponent = () => {

  const { images } = useStaticQuery(
    graphql`
    query {
      images:allFile(filter: {
        extension: {regex: "/(jpg)|(jpeg)|(png)|(gif)/"},
        sourceInstanceName: {eq: "gallery"},
        relativeDirectory: {regex: "/^LN.*\\\\w+/"}})
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

  if (typeof window !== `undefined`) {
    window.jQuery = window.$ = require('jquery');
    const fancybox = require('@fancyapps/fancybox');
  }

  return(
  <div id="LNGallery">
    <h1 className={styles.title}>Official Light Novel Illustrations</h1>
    <h4 className={styles.volTitle}>Volume 2</h4>
    {getLNImages("LN_v2", images)}

    <h4 className={styles.volTitle}>Volume 4</h4>
    {getLNImages("LN_v4.0", images)}

    <h4 className={styles.volTitle}>Volume 4.5</h4>
    {getLNImages("LN_v4.5", images)}

    <h4 className={styles.volTitle}>Volume 5</h4>
    {getLNImages("LN_v5", images)}

    <h4 className={styles.volTitle}>Volume 6</h4>
    {getLNImages("LN_v6", images)}

    <h4 className={styles.volTitle}>Volume 7</h4>
    {getLNImages("LN_v7.0", images)}

    <h4 className={styles.volTitle}>Volume 8</h4>
    {getLNImages("LN_v8", images)}

    <h4 className={styles.volTitle}>Volume 9</h4>
    {getLNImages("LN_v9", images)}

    <h4 className={styles.volTitle}>Volume 11</h4>
    {getLNImages("LN_v11.0", images)}

    <h4 className={styles.volTitle}>Volume 11.5</h4>
    {getLNImages("LN_v11.5", images)}

    <h4 className={styles.volTitle}>Volume 11.75</h4>
    {getLNImages("LN_v11.75", images)}

    <h4 className={styles.volTitle}>Volume 12 (2nd Year, Vol. 1)</h4>
    {getLNImages("LN_v12", images)}

    <h4 className={styles.volTitle}>2nd Year, Volume 3</h4>
    {getLNImages("LN_Y2_v3", images)}
  </div>
  )
}

export default GalleryLNComponent