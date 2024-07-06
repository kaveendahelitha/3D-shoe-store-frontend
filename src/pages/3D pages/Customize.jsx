import React from 'react'

const Customize = () => {
  return (
    <>

    <div className="flex flex-col md:flex-row justify-center items-center px-4 py-8 ">
      <div className="banner-desc md:w-1/2 flex flex-col items-center gap-4">
        <h1 className="text-thin text-4xl font-light">
          <strong>See</strong>
          &nbsp;everything with&nbsp;
          <strong>Clarity</strong>
        </h1>
        <p className="text-gray-700 text-lg">
          Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered.
        </p>
        
      </div>
      <div className="banner-img md:w-1/2">
        <img src="https://www.kindpng.com/picc/m/1-18288_nike-shoes-hd-png-transparent-png.png" alt="Banner Image" className="w-full h-auto object-cover rounded-lg" />
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
              <p className="name mt-2 text-sm font-medium">Chelseas</p>
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
              <p className="name mt-2 text-sm font-medium">High tops</p>
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
              <p className="name mt-2 text-sm font-medium">Jada</p>
            </a>
          </li>
        </ul>
      </div>
    </div> 
    </div>
    </>
  )
}

export default Customize