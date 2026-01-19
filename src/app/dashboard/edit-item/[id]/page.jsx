'use client';

import { useState, useEffect, use } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function EditItemPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: 'Technology',
    brand: '',
    stock: '',
    features: ''
  });

  // New state for dynamic features list
  const [featureInput, setFeatureInput] = useState('');
  const [featuresList, setFeaturesList] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${id}`);
        const item = response.data;
        setFormData({
          name: item.name,
          description: item.description,
          price: item.price,
          imageUrl: item.imageUrl,
          category: item.category,
          brand: item.brand || '',
          stock: item.stock || '',
          features: item.features || ''
        });
        
        // Initialize features list from fetched data
        if (item.features) {
          setFeaturesList(item.features.split('\n').filter((f) => f.trim() !== ''));
        }
      } catch (error) {
        console.error('Error fetching item:', error);
        toast.error('Failed to load item data', { duration: 2000 });
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (featureInput.trim()) {
      setFeaturesList([...featuresList, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    const newList = featuresList.filter((_, i) => i !== index);
    setFeaturesList(newList);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (featureInput.trim()) {
        setFeaturesList([...featuresList, featureInput.trim()]);
        setFeatureInput('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Combine features list into a newline-separated string
    const finalFeatures = featuresList.join('\n');

    try {
      console.log('Updating form data:', formData);
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${id}`, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock) || 0,
        features: finalFeatures
      });
      
      toast.success('Item updated successfully!', { duration: 2000 });
      router.push(`/items/${id}`);
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item. Please try again.', { duration: 2000 });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="bg-blue-600 dark:bg-blue-800 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Edit Item</h2>
            <p className="text-blue-100 mt-2">Update the details of your product</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

               {/* Brand */}
               <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="General">General</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home">Home</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              {/* Image URL */}
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

               {/* Dynamic Features List */}
               <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Features</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a feature and press Enter"
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                {featuresList.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                    {featuresList.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm text-sm">
                        <span>• {feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
               <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
               >
                 Cancel
               </button>
              <button
                type="submit"
                disabled={submitting}
                className={`px-8 py-3 rounded-lg font-semibold text-white transition-all shadow-lg hover:shadow-xl ${
                  submitting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5'
                }`}
              >
                {submitting ? 'Updating...' : 'Update Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
