import React from 'react';

const CollectionMain = () => {
  const collections = [
    {
      title: 'Men',
      imageUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-mens-still-1.jpg',
      imageHoverUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-mens-hover-d.jpg',
      imageFrontUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2022/04/Footwear-Men2-414x320-2.png',
      link: 'http://www.dsifootcandy.lk/product-category/men/footwear/',
    },
    {
      title: 'Women',
      imageUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-women-still.jpg',
      imageHoverUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-women-hover.jpg',
      imageFrontUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2022/04/Footwear-Women-414x320-2.png',
      link: 'http://www.dsifootcandy.lk/product-category/women/womens-footwear/',
    },
    {
      title: 'Boys',
      imageUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-boy-still.jpg',
      imageHoverUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-boy-hover-blue-light.jpg',
      imageFrontUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2022/04/Collections-boy-shoe-1.png',
      link: 'http://www.dsifootcandy.lk/product-category/boys/footwear-boys/',
    },
    {
      title: 'Girls',
      imageUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-girl-still.jpg',
      imageHoverUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-girl-hover-pink-light.jpg',
      imageFrontUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2022/04/Collections-Girl-shoe-414x320-1.png',
      link: 'http://www.dsifootcandy.lk/product-category/girls/footwear-girls/',
    },
  ];

  return (
    <section className="collection-main p-8">
      <div className="title-block text-center mb-12">
        <div className="tagline text-xl font-medium mb-2">Comfortable & Stylish</div>
        <h2 className="title text-4xl font-bold">Discover Our Footwear Collection</h2>
      </div>

      <div className="collection-main-blocks grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {collections.map((collection, index) => (
          <div key={index} className="collection-main-block text-center group">
            <a className="image-block block relative mb-4" href={collection.link}>
              <span className="right inline-block relative">
                <img className="img-bg w-full" src={collection.imageUrl} alt="" />
                <img className="img-bg-hover w-full absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" src={collection.imageHoverUrl} alt="" />
                <img className="img-bg-front w-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:translate-y-4" src={collection.imageFrontUrl} alt="" />
              </span>
            </a>
            <h3 className="text-2xl font-semibold mb-2">{collection.title}<span className="block text-lg font-normal">Collection</span></h3>
            <div className="btn-holder">
              <a href={collection.link} className="btn btn-dsi text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded">Explore Collection</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionMain;
