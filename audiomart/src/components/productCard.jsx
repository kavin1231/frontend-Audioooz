import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden max-w-sm">
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 aspect-square p-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />

        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="bg-white bg-opacity-90 hover:bg-opacity-100 backdrop-blur-sm rounded-full p-3 shadow-sm hover:shadow-md transition-all duration-200 group">
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-4 left-4">
          <button className="bg-white bg-opacity-90 hover:bg-opacity-100 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-sm hover:shadow-md">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            LEARN MORE
          </button>
        </div>

        <div className="absolute bottom-4 right-4">
          <button className="bg-gray-800 hover:bg-gray-900 text-white rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            BUY NOW
          </button>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <h2 className="text-xl font-normal text-gray-900 leading-tight">
          {product.name}
        </h2>

        {product.description && (
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2">
          <p className="text-2xl font-light text-gray-900">
            ${product.price.toFixed(2)}
          </p>

          <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200">
            <svg
              className="w-5 h-5 text-gray-400 hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
