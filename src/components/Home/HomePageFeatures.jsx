import React from 'react';

const HomePageFeatures = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row">
        <FeatureCard
          link="https://bata.lk/product-category/men/"
          imageSrc="https://bata.lk/wp-content/uploads/2024/05/bata-mens-2-scaled.jpg"
        />
        <FeatureCard
          link="https://bata.lk/product-category/women/"
          imageSrc="https://bata.lk/wp-content/uploads/2024/05/bata-womens-1-1-scaled.jpg"
        />
        <FeatureCard
          link="https://bata.lk/product-category/children/"
          imageSrc="https://bata.lk/wp-content/uploads/2024/05/BATA-KID-2-scaled.jpg"
        />
      </div>
    </section>
  );
};

const FeatureCard = ({ link, imageSrc }) => (
  <div className="flex-1 flex items-center justify-center p-4">
    <a href={link} className="block group">
      <div className="elementor-widget-container transition transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
        <img
          loading="lazy"
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    </a>
  </div>
);

export default HomePageFeatures;
