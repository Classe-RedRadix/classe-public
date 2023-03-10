const useGenerateImageCandidates = imagesMetadata =>
  imagesMetadata
    .map(imageMetaData => {
      const widthDescriptor = `${imageMetaData.width}w`
      return `${imageMetaData.src} ${widthDescriptor}`
    })
    .join(', ')

export default useGenerateImageCandidates
