import React from 'react';

import Header from '../../components/Home/header';
import CarouselIndicatorsOutside from '../../components/Home/carousel';
import Product from '../../components/Home/product';
import Footer from '../../components/Footer/footer';

const Home = () => {
  return (
    <>
      
     
        <Header />
        <CarouselIndicatorsOutside/>
        <Product/>
        <Footer/>
   
    </>
  );
};

export default Home;
