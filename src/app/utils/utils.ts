function findImagesByMetaData(
  searchTerm: string,
  key: string,
  images: PropsImage[]
) {
  if (typeof images === "undefined") {
    throw new Error("Error: Images must be provided or an empty array");
  }
  const res = images.filter((image) => {
    if (image.author.toLowerCase().includes(searchTerm.toLowerCase()))
      return true;
  });

  return res;
}

export { findImagesByMetaData };
