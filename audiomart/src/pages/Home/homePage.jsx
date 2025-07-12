import React from "react";
import { Link } from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";

export default function HomePage() {
  const [stopScroll, setStopScroll] = React.useState(false);

  const cardData = [
    {
      title: "Unlock Your Creative Flow",
      image:
        "https://manuals.plus/wp-content/uploads/2023/01/AZATOM-Blackfriars-B2-DAB-DABplus-FM-Radio-with-BT-Wireless-Audio-PRODUCT.jpg",
    },
    {
      title: "Design Your Digital Future",
      image:
        "https://rentprinceav.com/assets/images/product_imgs/1683274055.jpg",
    },
    {
      title: "Build with Passion, Ship with Pride",
      image:
        "https://www.technorent.in/wp-content/uploads/2020/03/dj-light-Rent-Bangalore.jpg",
    },
    {
      title: "Think Big, Code Smart",
      image:
        "https://www.rentacomputer.com/images/products/usbmicrophone1.png",
    },
    {
      title: "Think Big, Code Smart",
      image:
        "https://images.squarespace-cdn.com/content/v1/58669c64197aea52832c9a2e/283cfa39-9ff4-4a38-b16d-1f6aa29bd8cf/mobile-stage-rental-milwaukee-madison-green-bay-wisconsin.png",
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      <Header />

      {/* Body / Hero Section with margins */}
      <main className="my-12 px-4 sm:px-6 lg:px-8">
        <style>{`
          .marquee-inner {
            animation: marqueeScroll linear infinite;
          }
          @keyframes marqueeScroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

        <div
          className="overflow-hidden w-full relative max-w-6xl mx-auto"
          onMouseEnter={() => setStopScroll(true)}
          onMouseLeave={() => setStopScroll(false)}
        >
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
          <div
            className="marquee-inner flex w-fit"
            style={{
              animationPlayState: stopScroll ? "paused" : "running",
              animationDuration: cardData.length * 2500 + "ms",
            }}
          >
            <div className="flex">
              {[...cardData, ...cardData].map((card, index) => (
                <div
                  key={index}
                  className="w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300"
                >
                  <img
                    src={card.image}
                    alt="card"
                    className="w-full h-full object-cover"
                  />
                  <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20">
                    <p className="text-white text-lg font-semibold text-center">
                      {card.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
      </main>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
