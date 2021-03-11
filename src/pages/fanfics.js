import React from "react"
import DefaultLayout from "../components/default_layout"
import { useStaticQuery, graphql, Link } from "gatsby"

import styles from "../components/fanfics.module.scss"

const FanficsPage = () => {
  const { allFanficsYaml } = useStaticQuery(
    graphql`
    query {
      allFanficsYaml {
        edges {
          node {
            links {
              link
              name
              rehosted
            }
            link
            name
            multiple
            parts
            rehosted
            author
          }
        }
      }
    }`
  )

  return(
  <DefaultLayout title="Fanfics">
    <h1 className={styles.header}>Fanfics</h1>

    {allFanficsYaml.edges.slice(0).reverse().map(({ node }, index) => {

      if(node.parts) {
        return(
        <div className={styles.block} key={node.name}>
          <p className={styles.titleNoLink}>{node.name}</p>
          <p className={styles.author}>{node.author}</p>
          <ul>
            {node.links.map(({ link, name, rehosted }, index) =>(
              <li key={link}>
                {rehosted
                  ? <Link to={link} className={styles.link}>Part {index+1}</Link>
                  : <a href={link} className={styles.link}>Part {index+1}</a>
                }
              </li>
            ))}
          </ul>
        </div>)
      } else if(node.multiple) {
        return(
          <div className={styles.block} key={node.name}>
            <p className={styles.titleNoLink}>{node.name}</p>
            <p className={styles.author}>{node.author}</p>
            <ul>
              {node.links.map(({ link, name, rehosted }) =>(
                <li key={link}>
                  {rehosted
                    ? <Link to={link} className={styles.link}>{name}</Link>
                    : <a href={link} className={styles.link}>{name}</a>
                  }
                </li>
              ))}
            </ul>
          </div>)
      }

      return(
      <div className={styles.block} key={node.name}>
        <p className={styles.title}>
          {node.rehosted
            ? <Link to={node.link}>{node.name}</Link>
            : <a href={node.link}>{node.name}</a>
          }
        </p>
        <p className={styles.author}>{node.author}</p>
      </div>)
    })}

    <p style={{padding: "20px 0"}}>If you'd like a fanfic to be added here or if I'm missing some, contact me on discord!</p>
  </DefaultLayout>)
}

export default FanficsPage