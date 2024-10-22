import React from 'react';

const HomePageFeatures2 = () => {
  return (

      <div className="features mt-6">
        <div className="body_container">
          <ul className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
            <li className="step1 flex flex-col items-center">
              <img
                data-src="https://d2t2u1vclegqzc.cloudfront.net/landing/sustainable.jpg"
                loading="lazy"
                alt="Sustainable materials"
                className="lazyload w-48 h-48 object-cover rounded-lg shadow-lg"
                src="https://d2t2u1vclegqzc.cloudfront.net/landing/sustainable.jpg"
              />
              <span className="mt-4 text-center text-lg font-semibold">
                SUSTAINABLE MATERIALS
              </span>
            </li>
            <li className="step2 flex flex-col items-center mr-4">
              <img
                data-src="https://d2t2u1vclegqzc.cloudfront.net/landing/shipping.jpg"
                loading="lazy"
                alt="Made and delivered in 15/20 days"
                className="lazyload w-48 h-48 object-cover rounded-lg shadow-lg"
                src="srl.png"
              />
              <span className="mt-4 text-center text-lg font-semibold">
                MADE &amp; DELIVERED <br />IN 15/20 DAYS
              </span>
            </li>
            <li className="step3 flex flex-col items-center ml-4">
              <img
                data-src="https://d2t2u1vclegqzc.cloudfront.net/landing/sizes.jpg"
                loading="lazy"
                alt="Sizes from 3 to 17"
                className="lazyload w-48 h-48 object-cover rounded-lg shadow-lg"
                src="https://d2t2u1vclegqzc.cloudfront.net/landing/sizes.jpg"
              />
              <span className="mt-4 text-center text-lg font-semibold">
                SIZES FROM <br />3 TO 17
              </span>
            </li>
          </ul>
        </div>
      </div>
   
  );
};

export default HomePageFeatures2;
