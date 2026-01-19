'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: '',
    photoURL: ''
  });

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        setEditForm({
          displayName: currentUser.displayName || '',
          photoURL: currentUser.photoURL || ''
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (!auth.currentUser) return;

      // 1. Update Firebase Profile
      await updateProfile(auth.currentUser, {
        displayName: editForm.displayName,
        photoURL: editForm.photoURL
      });

      // 2. Update Database via Backend
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${auth.currentUser.email}`, {
        name: editForm.displayName,
        photoURL: editForm.photoURL
      });

      // 3. Update Local State
      setUser({
        ...auth.currentUser,
        displayName: editForm.displayName,
        photoURL: editForm.photoURL
      });

      toast.success('Profile updated successfully!', { duration: 2000 });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile', { duration: 2000 });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100 dark:border-gray-700">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="relative">
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=random&color=fff`}
                  alt="Profile" 
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover bg-white"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full"></div>
              </div>
              <div className="hidden sm:block">
                <button 
                  onClick={() => {
                    setEditForm({
                      displayName: user?.displayName || '',
                      photoURL: user?.photoURL || ''
                    });
                    setIsEditing(true);
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors shadow-md"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{user.displayName || 'Anonymous User'}</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">{user.email}</p>
              
              <div className="flex flex-wrap gap-4 text-sm mt-6">
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg text-blue-700 dark:text-blue-300">
                  <span>🆔</span>
                  <span className="font-mono">{user.uid.slice(0, 8)}...</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 px-4 py-2 rounded-lg text-purple-700 dark:text-purple-300">
                  <span>📅</span>
                  <span>Joined {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Profile</h3>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
                  <input 
                    type="text" 
                    value={editForm.displayName}
                    onChange={(e) => setEditForm({...editForm, displayName: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo URL</label>
                  <input 
                    type="url" 
                    value={editForm.photoURL}
                    onChange={(e) => setEditForm({...editForm, photoURL: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="https://example.com/avatar.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">Provide a direct link to an image.</p>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                  >
                    {saving && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Activity Section (Placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>🛍️</span> Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm">You haven't placed any orders yet.</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>⚙️</span> Account Settings
            </h2>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex justify-between items-center group">
                <span>Change Password</span>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex justify-between items-center group">
                <span>Notification Preferences</span>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
