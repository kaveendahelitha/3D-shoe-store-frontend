import React from 'react';
import Header from '../../components/Home/header';
import HomePageFeatures from '../../components/Home/HomePageFeatures';
import Carousel from '../../components/Home/carousel';
import ProductSection from '../../components/Home/product';
import Footer from '../../components/Footer/footer';

const Home = () => {
  return (
    <div className="mt-9">
      <Header />
      <HomePageFeatures />
      <Carousel />
      <ProductSection />
      <Footer />
    </div>
  );
};

export default Home;
