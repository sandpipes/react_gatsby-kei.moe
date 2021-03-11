/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import icon from "../images/icon.png"
import manropeFont from "../fonts/Manrope-Latin.woff2"

function SEO({ description, lang, meta, title }) {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        keywords
                    }
                }
            }
        `
    )

    const metaDescription = description || site.siteMetadata.description
    const metaKeywords = site.siteMetadata.keywords
    const defaultTitle = site.siteMetadata?.title
    const pageTitle = title ? `${title} - ${defaultTitle}` : `${defaultTitle} - A website dedicated to best girl Kei Karuizawa.`

    
    return (
        <Helmet
            defer={false}
            htmlAttributes={{
                lang,
            }}
            title={pageTitle}
            link={[
                {
                    "rel": "icon", 
                    "type": "image/png", 
                    "href": icon
                },
                {
                    "rel": "preload",
                    "href": manropeFont,
                    "as": "font",
                    "crossorigin": ""
                }
            ]}
            meta={[
                {
                    name: `viewport`,
                    content: `width=device-width, initial-scale=1`
                },
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    name: `keywords`,
                    content: metaKeywords,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    property: `og:title`,
                    content: pageTitle,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:url`,
                    content: `https://kei.moe/`,
                },
                {
                    property: `og:site_name`,
                    content: `Kei-Camp`,
                },
                {
                    property: `og:image`,
                    content: icon,
                },
                {
                    property: `og:image:width`,
                    content: `400`,
                },
                {
                    property: `og:image:height`,
                    content: `400`,
                },
                {
                    name: `og:locale`,
                    content: `en_US`,
                },
            ].concat(meta)}
        />
    )
    /*
   return(
       <head>
            <meta charset="utf-8"/>
            <title>{pageTitle}</title>
            <link rel="icon" href={icon}/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="description" content={metaDescription}/>
            <meta name="keywords" content={metaKeywords}/>

            <meta property="og:type" content="website"/>
            <meta property="og:title" content={pageTitle}/>
            <meta property="og:description" content={metaDescription}/>
            <meta property="og:url" content="https://kei.moe/"/>
            <meta property="og:site_name" content="Kei-Camp"/>
            <meta property="og:image" content={icon}/>
            <meta property="og:image:width" content="400"/>
            <meta property="og:image:height" content="400"/>
            <meta property="og:locale" content="en_US"/>
       </head>
   )*/
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
}

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
}

export default SEO