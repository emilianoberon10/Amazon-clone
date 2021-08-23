const BannerImage = ({ data }) => {
  const { id, url, alt } = data;
  return (
    <div>
      <img loading="lazy" src={url} alt={alt} objectFit="contain" />
    </div>
  );
};

export default BannerImage;
