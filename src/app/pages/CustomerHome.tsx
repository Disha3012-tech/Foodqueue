import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter } from 'lucide-react';
import { FoodCard } from '../components/FoodCard';
import { mockStalls } from '../data/mockData';

export const CustomerHome: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Burgers', 'Mexican', 'Pizza', 'Japanese'];

  const filteredStalls = mockStalls.filter((stall) => {
    const matchesSearch = stall.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || stall.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-purple-400 bg-clip-text text-transparent">
              Skip the Line Today
            </span>
            <span className="ml-3">🍔</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            Order digitally and track your food in real-time
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for food stalls..."
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-purple-500/30 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 dark:focus:border-purple-500 focus:ring-2 focus:ring-orange-500/20 dark:focus:ring-purple-500/20 transition-all"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 mb-8 overflow-x-auto pb-2"
        >
          <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-purple-500/20'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Stalls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStalls.map((stall, index) => (
            <FoodCard key={stall.id} stall={stall} index={index} />
          ))}
        </div>

        {filteredStalls.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 dark:text-gray-400 text-xl">No stalls found matching your criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};