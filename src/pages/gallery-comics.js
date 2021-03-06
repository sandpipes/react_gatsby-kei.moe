import React from "react"
import { Link } from "gatsby"

import DefaultLayout from "../components/default_layout"

const IndexPage = () => (
  <DefaultLayout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>

    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </DefaultLayout>
)

export default IndexPage