import React from 'react';
import { FaComments } from 'react-icons/fa';
import Header from '../../components/Home/header';
import HomePageFeatures from '../../components/Home/HomePageFeatures';
//import Carousel from '../../components/Home/carousel';
//import ProductSection from '../../components/Home/product';
import Footer from '../../components/Footer/footer';

const Home = () => {

  const handleClick = () => {
    window.location.href = 'https://gsm-mart-chat-app-client.vercel.app/';
  };
  return (
    <>
      <Header />
      <HomePageFeatures />
    
      <Footer />

      <div className="fixed bottom-4 right-4">
      <button
        className="p-3 bg-blue-500 rounded-full text-white shadow-lg hover:bg-blue-600 focus:outline-none"
        onClick={handleClick}
      >
        <FaComments size={24} />
      </button>
    </div>
    </>
  );
};

export default Home;
