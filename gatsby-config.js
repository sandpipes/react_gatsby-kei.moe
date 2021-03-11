module.exports = {
  siteMetadata: {
    siteUrl: "https://kei.moe",
    title: "Kei-Camp",
    description: "A website dedicated to Kei Karuizawa.",
    altDescription: "A site dedicated to best girl Kei",
    keywords: "Kei-Camp, Kei Camp, Kei Karuizawa, Best girl, Kei, Classroom of the Elite, you-zitsu, COTE, fanfic, fanart",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "gallery",
        path: "./static/assets/images/gallery/",
      },
      __key: "gallery",
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
  ],
};
