import React from 'react';

const HomePageFeatures3 = () => {
  return (

    <div class="bg-gray-100 px-6 py-12 font-sans">
    <div class="lg:max-w-7xl max-w-lg mx-auto px-6 py-8 bg-white rounded-lg shadow-md">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div class="max-h-80">
          <img src="home.jpg" alt="Image" class="rounded-md object-cover w-full h-full" />
        </div>
        <div>
          <h2 class="text-3xl font-extrabold text-purple-700 mb-4">Unique Footwear for Unique Companies</h2>
          <p class="text-gray-600 text-sm leading-6">
            At <span class="font-bold">Gold Mart</span>, we understand that your company’s image is crucial. That’s why we offer <span class="font-bold">customized footwear</span> that reflects the identity of your business.
            <br /><br />
            Our shoes are crafted with care, using <span class="font-bold">sustainable and recycled materials</span> and an eco-friendly, handcrafted process.
          </p>
          <ul class="list-disc text-sm text-gray-600 space-y-2 pl-4 mt-6">
            <li>Comfortable, durable footwear for your team.</li>
            <li>Reflects your brand’s unique identity.</li>
            <li>Sustainably made with recycled materials.</li>
            <li>Handcrafted for a perfect fit.</li>
          </ul>
          
        </div>
      </div>
    </div>
  </div>
  
   
  );
};

export default HomePageFeatures3;
