import React from "react";
import { FaComments } from "react-icons/fa";

const Customize = () => {
  const handleClick = () => {
    window.open('https://gsm-mart-chat-app-client.vercel.app/', '_blank');
  };
  return (
    <>
      <div class="bg-[#182b50] px-8 py-16 font-[sans-serif] mt-12">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 justify-center items-center gap-12">
          <div class="text-center md:text-left">
            <h2 class="text-4xl lg:text-5xl font-extrabold text-white mb-6 md:!leading-[55px]">
              Customize by own
            </h2>
            <p class="text-lg lg:text-xl text-white"></p>
          </div>
          <div class="text-center">
            <img
              src="blue_shoe.png"
              alt="Premium Benefits"
              class="w-full mx-auto"
            />
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
                    data-src="Poimandres.png"
                    loading="lazy"
                    alt="Chelseas"
                    className="lazyload w-48 h-48 md:w-64 md:h-64 object-cover rounded-md"
                    src="Poimandres.png"
                  />
                  <p className="name mt-2 text-sm font-medium">model 1</p>
                </a>
              </li>
              <li className="slide flex-shrink-0">
                <a href="/modelpage-2" className="block text-center">
                  <img
                    data-src="heels_shoes_steve_madden_womens.png"
                    loading="lazy"
                    alt="High tops"
                    className="lazyload w-48 h-48 md:w-64 md:h-64 object-cover rounded-md"
                    src="heels_shoes_steve_madden_womens.png"
                  />
                  <p className="name mt-2 text-sm font-medium">model 2</p>
                </a>
              </li>
              <li className="slide flex-shrink-0">
                <a href="/modelpage-3" className="block text-center">
                  <img
                    data-src="warrior_sneaker.png"
                    loading="lazy"
                    alt="Jada"
                    className="lazyload w-48 h-48 md:w-64 md:h-64 object-cover rounded-md"
                    src="warrior_sneaker.png"
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
  );
};

export default Customize;
