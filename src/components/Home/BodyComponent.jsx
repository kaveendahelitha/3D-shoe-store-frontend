import React, { useState } from 'react';

const BodyComponent = () => {
  const [readMoreId, setReadMoreId] = useState(null);

  const handleReadMoreClick = (id) => {
    setReadMoreId(readMoreId === id ? null : id); // Toggle read more content
  };

  const materials = [
    {
      id: 'veganoa',
      imgSrc: 'https://d2t2u1vclegqzc.cloudfront.net/designer/materials/veganoa.png',
      title: 'VEGANOA',
      description:
        'One of our most distinctive fabrics. Vegan leather of great resistance and durability made in a sustainable way and imitates conventional leather. This material is anti-scratch and liquid repellent.',
      readMoreContent: (
        <>
          <p>Very easy to clean, just wipe it with a damp cloth and it will be as good as new.</p>
          <p>Available in two types: ROUGH (more texture) and CLEAN (smoother and softer).</p>
        </>
      ),
    },
    {
      id: 'pet',
      imgSrc: 'https://d2t2u1vclegqzc.cloudfront.net/designer/materials/pet.png',
      title: 'PET FABRICS',
      description:
        'Made from recycled ocean plastic. These fabrics simulate denim or similar textures like animal prints.',
    },
    {
      id: 'cork',
      imgSrc: 'https://d2t2u1vclegqzc.cloudfront.net/designer/materials/ecork.png',
      title: 'RECYCLED CORK',
      description:
        'Woven with organic cotton threads, resulting in an extraordinary, soft material that many love.',
    },
    {
      id: 'hemp',
      imgSrc: 'https://d2t2u1vclegqzc.cloudfront.net/designer/materials/hemp.png',
      title: 'HEMP',
      description:
        'A natural fabric alternative to cotton, hemp is sustainably grown and fully biodegradable.',
    },
    {
      id: 'recycled_clothing',
      imgSrc: 'https://d2t2u1vclegqzc.cloudfront.net/designer/materials/recycled.png',
      title: 'RECYCLED CLOTHING',
      description:
        'Unusable clothing is shredded and repurposed into fabrics for making bags or footwear.',
    },
    {
      id: 'bottle_tops',
      imgSrc: 'https://d2t2u1vclegqzc.cloudfront.net/designer/materials/bottle.png',
      title: 'SOLES MADE FROM RECYCLED PLASTIC BOTTLE TOPS',
      description:
        'Soles crafted from recycled rubber and leftover plastic bottle tops.',
    },
    {
      id: 'cork_scraps',
      imgSrc: 'https://d2t2u1vclegqzc.cloudfront.net/designer/materials/sole.png',
      title: 'SOLES WITH RECYCLED CORK SCRAPS',
      description: 'Soles made from recycled cork scraps and rubber.',
    },
  ];

  return (
    <div id="body" className="text-center text-base leading-6 pb-20">
      {/* Header Section */}
      <div
        className="py-16 mb-10 bg-cover bg-gray-800 text-white"
        style={{ backgroundImage: "url('https://d2t2u1vclegqzc.cloudfront.net/info/bg_green.jpg')" }}
      >
        <h1 className="text-4xl font-light uppercase shadow-lg">OUR FABRICS AND MATERIALS</h1>
      </div>

      {/* Body Content */}
      <div className="max-w-3xl mx-auto px-5 mb-10">
        <p>
          When it comes to designing and personalizing your bag or footwear, deciding which fabrics and materials to choose from is key. Here we tell you about the fabrics and materials you'll find in the customizer, along with their most notable features.
        </p>
      </div>

      {/* Grid Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((material) => (
          <MaterialCard
            key={material.id}
            imgSrc={material.imgSrc}
            title={material.title}
            description={material.description}
            readMoreContent={material.readMoreContent}
            readMoreId={material.id}
            readMoreOpen={readMoreId === material.id}
            handleReadMoreClick={handleReadMoreClick}
          />
        ))}
      </div>
    </div>
  );
};

const MaterialCard = ({ imgSrc, title, description, readMoreContent, readMoreId, readMoreOpen, handleReadMoreClick }) => {
  return (
    <div className="relative shadow-md p-6 bg-white text-left">
      <img className="w-full h-40 object-cover mb-4" src={imgSrc} alt={title} /> {/* Image on top */}
      <h4 className="mb-4 text-xl font-medium">{title}</h4>
      <p className="mb-4">{description}</p>
      {readMoreContent && (
        <>
          {!readMoreOpen ? (
            <p>
              <a
                href={`#${readMoreId}`}
                className="text-blue-500 cursor-pointer"
                onClick={() => handleReadMoreClick(readMoreId)}
              >
                Read more
              </a>
            </p>
          ) : (
            <div className="mt-4">{readMoreContent}</div>
          )}
        </>
      )}
    </div>
  );
};

export default BodyComponent;
