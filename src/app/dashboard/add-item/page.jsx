'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddItemPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: 'General',
    brand: '',
    stock: '',
    features: ''
  });
  const [loading, setLoading] = useState(false);
  
  // New state for dynamic features list
  const [featureInput, setFeatureInput] = useState('');
  const [featuresList, setFeaturesList] = useState([]);

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
    setLoading(true);
    
    // Combine features list into a newline-separated string
    const finalFeatures = featuresList.join('\n');

    try {
      console.log('Submitting form data:', formData);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/items`, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock) || 0,
        features: finalFeatures
      });
      console.log('Server response:', response.data);
      toast.success('Product added successfully!');
      router.push('/items');
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error(error.response?.data?.message || 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
           <div className="bg-blue-600 dark:bg-blue-800 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Add New Product</h2>
            <p className="text-blue-100 mt-2">Enter the details to create a new product</p>
          </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Name & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand Name"
              />
            </div>
          </div>

          {/* Category & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>

          {/* Price & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                required
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Dynamic Features List */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Features</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a feature and press Enter (e.g. Waterproof)"
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
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
              Add key features one by one. They will be displayed as a bulleted list.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed product description..."
            />
          </div>

          <div className="flex justify-end pt-4">
             <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-lg transform transition-all ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1'
            }`}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
