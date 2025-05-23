"use client";
import Image from "next/image";
import { useEffect } from "react";
import { initMixpanel, track } from "@/utils/mixpanel";

export default function Home() {
  useEffect(() => {
    initMixpanel();
  }, []);

  const handleButtonClick = (buttonType: string) => {
    track('button_click', { type: buttonType });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <main className="space-y-16">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6">Black & White</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">A minimalist design approach</p>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="group relative overflow-hidden rounded-lg"
                onClick={() => track('grid_item_click', { item })}
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-transform group-hover:scale-105">
                  <div className="w-16 h-16 border-2 border-black dark:border-white rounded-full" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 dark:bg-white/50">
                  <span className="text-white dark:text-black font-bold">Hover Effect {item}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Elements */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button 
              className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              onClick={() => handleButtonClick('primary')}
            >
              Primary Button
            </button>
            <button 
              className="px-8 py-4 border-2 border-black dark:border-white rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              onClick={() => handleButtonClick('secondary')}
            >
              Secondary Button
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              className="p-8 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-black dark:hover:border-white transition-colors"
              onClick={() => track('feature_card_click', { card: 'minimalist' })}
            >
              <h3 className="text-2xl font-bold mb-4">Minimalist Design</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Embracing simplicity and clarity through black and white aesthetics.
              </p>
            </div>
            <div 
              className="p-8 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-black dark:hover:border-white transition-colors"
              onClick={() => track('feature_card_click', { card: 'dark_mode' })}
            >
              <h3 className="text-2xl font-bold mb-4">Dark Mode Ready</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seamlessly switch between light and dark themes for optimal viewing.
              </p>
            </div>
          </div>
        </main>

        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Built with Next.js and Tailwind CSS</p>
          <div className="flex justify-center gap-4 mt-4">
            <a 
              href="#" 
              className="hover:text-black dark:hover:text-white transition-colors"
              onClick={() => track('social_link_click', { platform: 'twitter' })}
            >
              Twitter
            </a>
            <a 
              href="#" 
              className="hover:text-black dark:hover:text-white transition-colors"
              onClick={() => track('social_link_click', { platform: 'github' })}
            >
              GitHub
            </a>
            <a 
              href="#" 
              className="hover:text-black dark:hover:text-white transition-colors"
              onClick={() => track('social_link_click', { platform: 'linkedin' })}
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
