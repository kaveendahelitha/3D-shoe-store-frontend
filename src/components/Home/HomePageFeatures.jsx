
import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for client-side routing

const CollectionMain = () => {
  const collections = [
    {
      title: 'Men',
      imageUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-mens-still-1.jpg',
      imageHoverUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-mens-hover-d.jpg',
      imageFrontUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2022/04/Footwear-Men2-414x320-2.png',
      link: '/category/men', // Updated link
    },
    {
      title: 'Women',
      imageUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-women-still.jpg',
      imageHoverUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-women-hover.jpg',
      imageFrontUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2022/04/Footwear-Women-414x320-2.png',
      link: '/category/women', // Updated link
    },
    {
      title: 'Kids', // Changed from 'Boys' to 'Kid'
      imageUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-boy-still.jpg',
      imageHoverUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-boy-hover-blue-light.jpg',
      imageFrontUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2022/04/Collections-boy-shoe-1.png',
      link: '/category/kids', // Updated link
    },
    {
      title: 'Girls', // Changed from 'Girls' to 'Girl'
      imageUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-girl-still.jpg',
      imageHoverUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2021/10/Collections-girl-hover-pink-light.jpg',
      imageFrontUrl: 'https://www.dsifootcandy.lk/wp-content/uploads/2022/04/Collections-Girl-shoe-414x320-1.png',
      link: '/category/girl', // Updated link
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
            <Link className="image-block block relative mb-4" to={collection.link}>
              <span className="right inline-block relative">
                <img className="img-bg w-full" src={collection.imageUrl} alt={`${collection.title} Collection`} />
                <img
                  className="img-bg-hover w-full absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  src={collection.imageHoverUrl}
                  alt={`${collection.title} Collection Hover`}
                />
                <img
                  className="img-bg-front w-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:translate-y-4"
                  src={collection.imageFrontUrl}
                  alt={`${collection.title} Front`}
                />
              </span>
            </Link>
            <h3 className="text-2xl font-semibold mb-2">
              {collection.title}
              <span className="block text-lg font-normal">Collection</span>
            </h3>
            <div className="btn-holder">
              <Link to={collection.link} className="btn btn-dsi text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded">
                Explore Collection
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionMain;
