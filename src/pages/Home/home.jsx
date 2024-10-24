import React from 'react';
import { FaComments } from 'react-icons/fa';
import Header from '../../components/Home/header';
import HomePageFeatures from '../../components/Home/HomePageFeatures';
import HomePageFeatures2 from '../../components/Home/HomePageFeatures2';
import HomePageFeatures3 from '../../components/Home/HomePageFeatures3';
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
      <HomePageFeatures2/>
      <HomePageFeatures3/>
    
      <Footer />

      

      <div className="fixed bottom-4 right-4">
      <button
        className="p-3 bg-green-500 rounded-full text-white shadow-lg hover:bg-green-800 focus:outline-none"
        onClick={handleClick}
      >
        <FaComments size={40} />
      </button>
    </div>
    </>
  );
};

export default Home;
