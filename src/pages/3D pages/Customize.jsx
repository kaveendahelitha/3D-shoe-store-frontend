import React from 'react';
import { FaComments } from 'react-icons/fa';

const Customize = () => {

  const handleClick = () => {
    window.location.href = 'https://gsm-mart-chat-app-client.vercel.app/';
  };
  return (
    <>

    


    <div class="bg-[#182b50] px-8 py-16 font-[sans-serif] mt-12">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 justify-center items-center gap-12">
        <div class="text-center md:text-left">
          <h2 class="text-4xl lg:text-5xl font-extrabold text-white mb-6 md:!leading-[55px]">Customize by own</h2>
          <p class="text-lg lg:text-xl text-white"></p>
          
        </div>
        <div class="text-center">
          <img src="blue_shoe.png" alt="Premium Benefits" class="w-full mx-auto" />
        </div>
      </div>
    </div>

       


    <div className="container flex flex-col justify-center items-center">
    <div className="product_selector boot" id="product_selector">
      <p className="subtitle text-lg font-semibold">START DESIGNING</p>
      <p className="title text-2xl font-bold mt-2">CHOOSE A MODEL</p>
      <div className="track mt-4">
        <ul className="list flex space-x-4 overflow-x-auto">
          <li className="slide flex-shrink-0">
            <a href="/modelpage-1" className="block text-center">
              <img
                data-src="https://d2t2u1vclegqzc.cloudfront.net/home/model-chelsea.jpg"
                loading="lazy"
                alt="Chelseas"
                className="lazyload w-full h-48 object-cover rounded-md"
                src="https://d2t2u1vclegqzc.cloudfront.net/home/model-chelsea.jpg"
              />
              <p className="name mt-2 text-sm font-medium">model 1</p>
            </a>
          </li>
          <li className="slide flex-shrink-0">
            <a href="/modelpage-2" className="block text-center">
              <img
                data-src="https://d2t2u1vclegqzc.cloudfront.net/home/model-boot.jpg"
                loading="lazy"
                alt="High tops"
                className="lazyload w-full h-48 object-cover rounded-md"
                src="https://d2t2u1vclegqzc.cloudfront.net/home/model-boot.jpg"
              />
              <p className="name mt-2 text-sm font-medium">model 2</p>
            </a>
          </li>
          <li className="slide flex-shrink-0">
            <a href="/modelpage-3" className="block text-center">
              <img
                data-src="https://d2t2u1vclegqzc.cloudfront.net/home/model-jada.jpg"
                loading="lazy"
                alt="Jada"
                className="lazyload w-full h-48 object-cover rounded-md"
                src="https://d2t2u1vclegqzc.cloudfront.net/home/model-jada.jpg"
              />
              <p className="name mt-2 text-sm font-medium">model 3</p>
            </a>
          </li>
        </ul>
      </div>
    </div> 
    </div>


    <div className="fixed bottom-4 right-4">
      <button
        className="p-3 bg-green-500 rounded-full text-white shadow-lg hover:bg-green-800 focus:outline-none"
        onClick={handleClick}
      >
        <FaComments size={40} />
      </button>
    </div>
    </>
  )
}

export default Customize