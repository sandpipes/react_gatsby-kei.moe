import React from "react"

import GalleryLayout from "../components/gallery/gallery-layout"
import GalleryEditsComponent from "../components/gallery/gallery-edits"

const GalleryEditsPage = () => (
  <GalleryLayout title="Edited Artwork Gallery">
    <GalleryEditsComponent />
  </GalleryLayout>
)

export default GalleryEditsPage