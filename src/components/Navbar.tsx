import React, { useState } from "react";

interface NavbarProps {
  onSearch: (query: string) => void;
  onHomeClick: () => void;
  isSearching: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, onHomeClick, isSearching }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span 
          className="text-2xl font-semibold whitespace-nowrap dark:text-white cursor-pointer"
          onClick={onHomeClick}
        >
          The Best Cinema
        </span>

        <div className="flex-grow flex items-center justify-center">
          <div className="hidden md:flex items-center space-x-24">
            <a 
              href="#" 
              className="text-blue-700 dark:text-blue-500"
              onClick={(e) => {
                e.preventDefault();
                onHomeClick();
              }}
            >
              Home
            </a>
            <a href="#" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">
              About
            </a>
            <a href="#" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">
              FAQ
            </a>
            <a href="#" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">
              Contact Us
            </a>
          </div>
        </div>

        <div className="flex md:order-2 flex-grow justify-end max-w-md">
          <form className="w-full" onSubmit={handleSubmit}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search movies..."
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                disabled={isSearching}
                className="text-white absolute end-0 bottom-0 top-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
              >
                {isSearching ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="md:hidden">
          <button className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};