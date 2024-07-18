import React from 'react';

const Header = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative overflow-hidden  pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="flex w-[500%] animate-slideLeft">
              <div className="w-full flex-shrink-0">
                <img src="https://d2t2u1vclegqzc.cloudfront.net/home/slides/hz_1.jpg" alt="Slide 1" className="object-cover" />
              </div>
              <div className="w-full flex-shrink-0">
                <img src="https://d2t2u1vclegqzc.cloudfront.net/home/slides/hz_2.jpg" alt="Slide 2" className="object-cover" />
              </div>
              <div className="w-full flex-shrink-0">
                <img src="https://d2t2u1vclegqzc.cloudfront.net/home/slides/hz_3.jpg" alt="Slide 3" className="object-cover" />
              </div>
              <div className="w-full flex-shrink-0">
                <img src="https://d2t2u1vclegqzc.cloudfront.net/home/slides/hz_6.jpg" alt="Slide 4" className="object-cover" />
              </div>
              <div className="w-full flex-shrink-0">
                <img src="https://d2t2u1vclegqzc.cloudfront.net/home/slides/hz_9.jpg" alt="Slide 5" className="object-cover" />
              </div>
            </div>
          </div>
          <div className="relative z-10 mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              FOOTWEAR DESIGNED BY YOU
              <br />
              ..........
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="/customize"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Try It Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
