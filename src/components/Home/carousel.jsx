import React, { useEffect } from "react";
import Glide from "@glidejs/glide";

const Carousel = () => {
  useEffect(() => {
    const slider = new Glide(".glide-05", {
      type: "carousel",
      focusAt: "center",
      perView: 3,
      autoplay: 3000,
      animationDuration: 700,
      gap: 24,
      breakpoints: {
        1024: {
          perView: 2,
        },
        640: {
          perView: 1,
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <div className="glide-05 relative w-full my-8">
      <div className="overflow-hidden" data-glide-el="track">
        <ul className="flex relative w-full overflow-hidden p-0">
          {['carousel-image-03.jpg', 'carousel-image-04.jpg', 'carousel-image-05.jpg', 'carousel-image-01.jpg', 'carousel-image-02.jpg'].map((src, index) => (
            <li key={index} className="flex-shrink-0 w-full">
              <img
                src={`https://Tailwindmix.b-cdn.net/carousel/${src}`}
                className="m-auto max-h-full w-full max-w-full"
                alt={`Slide ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full items-center justify-center gap-2" data-glide-el="controls[nav]">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            className="group p-4"
            data-glide-dir={`=${index}`}
            aria-label={`goto slide ${index + 1}`}
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default  Carousel;
