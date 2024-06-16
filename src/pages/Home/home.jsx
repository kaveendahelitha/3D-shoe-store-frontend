import React from 'react';

import Header from '../../components/Home/header';
import CarouselIndicatorsOutside from '../../components/Home/carousel';
import Product from '../../components/Home/product';
import Footer from '../../components/Footer/footer';

const Home = () => {


  
  return (
    <>
      
       <div className='mt-9'>
        <Header />
        <CarouselIndicatorsOutside/>
        <Product/>


        <div className="product_selector boot" id="product_selector">
      <p className="subtitle text-lg font-semibold">START DESIGNING</p>
      <p className="title text-2xl font-bold mt-2">CHOOSE A MODEL</p>
      <div className="track mt-4">
        <ul className="list flex space-x-4 overflow-x-auto">
          <li className="slide flex-shrink-0">
            <a href="/en/custom-chelseas/personalize" className="block text-center">
              <img
                data-src="https://d2t2u1vclegqzc.cloudfront.net/home/model-chelsea.jpg"
                loading="lazy"
                alt="Chelseas"
                className="lazyload w-full h-48 object-cover rounded-md"
                src="https://d2t2u1vclegqzc.cloudfront.net/home/model-chelsea.jpg"
              />
              <p className="name mt-2 text-sm font-medium">Chelseas</p>
            </a>
          </li>
          <li className="slide flex-shrink-0">
            <a href="/en/custom-high-tops/personalize" className="block text-center">
              <img
                data-src="https://d2t2u1vclegqzc.cloudfront.net/home/model-boot.jpg"
                loading="lazy"
                alt="High tops"
                className="lazyload w-full h-48 object-cover rounded-md"
                src="https://d2t2u1vclegqzc.cloudfront.net/home/model-boot.jpg"
              />
              <p className="name mt-2 text-sm font-medium">High tops</p>
            </a>
          </li>
          <li className="slide flex-shrink-0">
            <a href="/en/custom-jada-high-tops/personalize" className="block text-center">
              <img
                data-src="https://d2t2u1vclegqzc.cloudfront.net/home/model-jada.jpg"
                loading="lazy"
                alt="Jada"
                className="lazyload w-full h-48 object-cover rounded-md"
                src="https://d2t2u1vclegqzc.cloudfront.net/home/model-jada.jpg"
              />
              <p className="name mt-2 text-sm font-medium">Jada</p>
            </a>
          </li>
        </ul>
      </div>
    </div>                                                                                           

        <Footer/>
        </div>
   
    </>
  );
};

export default Home;
