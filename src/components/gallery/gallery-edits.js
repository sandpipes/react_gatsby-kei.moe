import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Masonry from 'react-masonry-css'
import ImageFade from '../image'
import styles from "./gallery.module.scss"

import $ from 'jquery' 

const GalleryEditsComponent = () => {
  const basePath = "/assets/images/gallery/";

  const { images, allEditsSourcesYaml } = useStaticQuery(
    graphql`
    query {
      images:allFile(filter: {
        extension: {regex: "/(jpg)|(jpeg)|(png)|(gif)/"},
        sourceInstanceName: {eq: "gallery"},
        relativeDirectory: {eq: "edits"}})
      {
        edges {
          node {
            relativePath
            name
            ext
          }
        }
      }

      allEditsSourcesYaml {
        edges {
          node {
            edited
            link
            name
            sources
            thumbnail
            ytlink
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

  var sourcesMap = {};
  var ytEdits = [];
  for(var i = 0; i < allEditsSourcesYaml.edges.length; i++) {
    var { node } = allEditsSourcesYaml.edges[i];
    if(node.name !== null)
      sourcesMap[node.name] = node;
    else if(node.externalVid !== null)
      ytEdits.push(node);
  }

  var editItems = images.edges.map(({ node }) => {
    var newLink = "<a target='_blank' href=" + basePath + node.relativePath + ">Full Image</a>";
    const key = node.name + node.ext;

    if(sourcesMap[key]) {
      const source = sourcesMap[key];
      if(source.artist != null)
        newLink += "</br> " + source.artist;
      else if(source.sources != null) {
        newLink += " - Sources: ";
        for(var i = 0; i < source.sources.length; i++)
          newLink += " <a target='_blank' href='" + source.sources[i] + "'>" + (i+1).toString() + "</a>";
      } else if(source.link != null)
        newLink += " - <a target='_blank' href='" + source.link + "'>Source</a>"
      
      if(source.edited)
        newLink += "</br> Edited by: " + source.edited;
    }

    return(
    <div key={node.relativePath} className={styles.imageContainer}>
      <a data-fancybox="gallery" data-caption={newLink} href={basePath + node.relativePath}>
        <ImageFade className={styles.pic} src={`${basePath}thumbnails/edits/${node.name + ".jpg"}`}/>
      </a>
    </div>)
  });

  const len = editItems.length;

  for(var i = 0; i < ytEdits.length; i++) {
    const vid = ytEdits[i];
    var newLink = "<a target='_blank' href='" + vid.ytlink + "'>Direct Link</a>";

    if(vid.edited)
      newLink += "</br> Edited by: " + vid.edited;

    const ytItem = (
      <div key={vid.ytlink} className={styles.imageContainer}>
        <a data-fancybox="gallery" data-caption={newLink} href={vid.ytlink}>
          <ImageFade className={styles.pic} src={vid.thumbnail}/>
        </a>
      </div>
    );
    editItems[len + i] = ytItem;
  }

  if (typeof window !== `undefined`) {
    window.jQuery = window.$ = require('jquery');
    const fancybox = require('@fancyapps/fancybox');
  }

  return(
  <div id="editsGallery">
    <h1 className={styles.title}>Edited Official LN/Manga/Anime Artwork</h1>
    <div className={styles.galleryMain}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonryGrid}
          columnClassName={styles.masonryGridCol}
        >
        {editItems}
        </Masonry>
      </div>
  </div>
  )
}

export default GalleryEditsComponent