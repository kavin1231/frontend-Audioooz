import React from "react";

export default function HomePage() {
  const [open, setOpen] = React.useState(false);
  const [stopScroll, setStopScroll] = React.useState(false);

  const cardData = [
    {
      title: "Unlock Your Creative Flow",
      image: "https://images.unsplash.com/photo-1543487945-139a97f387d5?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Design Your Digital Future",
      image: "https://images.unsplash.com/photo-1529254479751-faeedc59e78f?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Build with Passion, Ship with Pride",
      image: "https://images.unsplash.com/photo-1618327907215-4e514efabd41?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Think Big, Code Smart",
      image: "https://images.unsplash.com/photo-1583407723467-9b2d22504831?w=1200&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <div>
      {<header/>}
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
        <a href="#">
          <img className="h-9" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg" alt="logo" />
        </a>
        <div className="hidden sm:flex items-center gap-8">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="relative cursor-pointer">
            <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">3</button>
          </div>
          <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">Login</button>
        </div>
        <button onClick={() => setOpen(!open)} className="sm:hidden">
          <svg width="21" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
          </svg>
        </button>
        <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="overflow-hidden w-full relative max-w-6xl mx-auto my-12" onMouseEnter={() => setStopScroll(true)} onMouseLeave={() => setStopScroll(false)}>
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="marquee-inner flex w-fit" style={{ animationPlayState: stopScroll ? "paused" : "running", animationDuration: cardData.length * 2500 + "ms" }}>
          <div className="flex">
            {[...cardData, ...cardData].map((card, index) => (
              <div key={index} className="w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300">
                <img src={card.image} alt="card" className="w-full h-full object-cover" />
                <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20">
                  <p className="text-white text-lg font-semibold text-center">{card.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
          <div className="md:max-w-96">
            <img className="h-9" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoDark.svg" alt="dummyLogoDark" />
            <p className="mt-6 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
          <div className="flex-1 flex items-start md:justify-end gap-20">
            <div>
              <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
              <ul className="text-sm space-y-2">
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Privacy policy</a></li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
              <div className="text-sm space-y-2">
                <p>+1-212-456-7890</p>
                <p>contact@example.com</p>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-4 text-center text-xs md:text-sm pb-5">
          Copyright 2024 © Company name. All Right Reserved.
        </p>
      </footer>
    </div>
  );
}
 