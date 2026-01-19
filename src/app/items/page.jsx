'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

// Define Interface
export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/items`;
        console.log('Fetching items from:', apiUrl);
        const response = await axios.get(apiUrl);
        console.log('API Response:', response.status, response.data);
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          console.error('Received non-array data:', response.data);
          setItems([]);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        if (axios.isAxiosError(error)) {
             console.error('Axios error details:', error.message, error.response?.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">All Products</h1>
      
        {items.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            No items found. Check back later!
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
                <Link href={`/items/${item._id}`} key={item._id} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full transform hover:-translate-y-1">
                    <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300?text=No+Image';
                        }}
                    />
                    <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-700 dark:text-gray-300 shadow-sm">
                        {item.category}
                    </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-500 transition-colors">
                        {item.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow h-10 leading-relaxed">
                        {item.description}
                    </p>
                    <div className="mt-auto flex justify-between items-center border-t border-gray-50 dark:border-gray-700 pt-4">
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">${item.price}</span>
                        <span className="text-sm font-medium text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1">
                            View Details <span>→</span>
                        </span>
                    </div>
                    </div>
                </div>
                </Link>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}
