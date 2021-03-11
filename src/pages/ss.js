import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import styles from "../components/ss.module.scss"
import DefaultLayout from "../components/default_layout"

const ShortStoriesPage = () => {
  const { allShortstoriesYaml } = useStaticQuery(
    graphql`
    query {
    allShortstoriesYaml {
        edges {
            node {
                name
                stories {
                    link
                    name
                    rehosted
                }
            }
        }
    }
    }`)

    return(
    <DefaultLayout title="Short Stories">
    <h1 className={styles.header}>Short Stories</h1>

    {allShortstoriesYaml.edges.map(({ node }) => (
        <div className={styles.block} key={node.name}>
        <p className={styles.volumeName}>{node.name}</p>
        <ul className="square">
            {node.stories.map(({ link, name, rehosted }) => (
            <li key={link}>
                {rehosted
                    ? <Link to={link} className={styles.link}>{name}</Link>
                    : <a href={link} className={styles.link}>{name}</a>
                }
            </li>
            ))}
        </ul>
        </div>
    ))}
    </DefaultLayout>
    )
}

export default ShortStoriesPage