'use client';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ItemDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      setDeleting(true);
      try {
          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${id}`);
          
          await Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          
          router.push('/items');
      } catch (error) {
          console.error('Error deleting item:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
          setDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
        <Link href="/items" className="text-blue-600 hover:underline">Back to Items</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
            <Link href="/items" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
            ← Back to list
            </Link>
            <div className="flex gap-3">
                <Link href={`/dashboard/edit-item/${item._id}`} className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-yellow-500/30 flex items-center gap-2">
                <span>Edit</span>
                </Link>
                <button 
                onClick={handleDelete} 
                disabled={deleting}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-red-600/30 disabled:opacity-50 flex items-center gap-2"
                >
                <span>{deleting ? '...' : 'Delete'}</span>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Left: Image */}
            <div className="bg-gray-50 dark:bg-gray-900/50 relative aspect-square lg:aspect-auto h-full min-h-[400px] flex items-center justify-center p-8">
            <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600?text=No+Image';
                }}
            />
            </div>
            
            {/* Right: Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-blue-200 dark:border-blue-800">
                    {item.category}
                </span>
                {item.brand && (
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        Brand: <span className="text-gray-900 dark:text-white font-semibold">{item.brand}</span>
                    </span>
                )}
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">{item.name}</h1>
            
            <div className="flex items-center gap-4 mb-8 text-sm border-b border-gray-100 dark:border-gray-700 pb-8">
                <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400 text-lg">
                        {'★'.repeat(Math.round(item.rating || 4.5))}
                        <span className="text-gray-300 dark:text-gray-600">{'★'.repeat(5 - Math.round(item.rating || 4.5))}</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 ml-2 font-medium">({item.reviews || 0} reviews)</span>
                </div>
                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                <span className={`${(item.stock || 0) > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'} font-bold flex items-center gap-1.5`}>
                    <span className={`w-2 h-2 rounded-full ${(item.stock || 0) > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {(item.stock || 0) > 0 ? `In Stock: ${item.stock}` : 'Out of Stock'}
                </span>
            </div>

            <div className="flex items-end gap-2 mb-8">
                <span className="text-5xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">${item.price}</span>
            </div>
            
            <div className="prose prose-lg prose-blue dark:prose-invert text-gray-600 dark:text-gray-300 mb-10 max-w-none">
                <p className="leading-relaxed">{item.description}</p>
            </div>

            {item.features && (
                <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-2xl mb-10 border border-gray-100 dark:border-gray-700">
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                        Key Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {item.features.split('\n').map((feature, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-gray-700 dark:text-gray-300 text-sm">
                                <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="leading-tight">{feature.replace(/^[•\-\*]\s*/, '')}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-auto">
                <button className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-xl hover:bg-black dark:hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg flex items-center justify-center gap-2">
                <span>Add to Cart</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                </button>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
