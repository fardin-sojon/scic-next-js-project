import Link from 'next/link';
// db imports removed as we use external API now

async function getLatestItems() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`, { cache: 'no-store' });
    if (!res.ok) {
      return [];
    }
    const items = await res.json();
    return items.slice(0, 4);
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return [];
  }
}

export default async function Home() {
  const latestItems = await getLatestItems();

  return (
    <div className="flex flex-col gap-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* 1. Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-r from-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
            Discover Exceptional Items
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light">
            Curated collection of premium products delivered with speed and care.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/items" className="px-8 py-3 bg-white text-blue-900 font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg transform hover:scale-105">
              Browse Items
            </Link>
            <Link href="/login" className="px-8 py-3 border border-white/50 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm">
              Join Us
            </Link>
          </div>
        </div>
      </section>

      {/* 1.5 Latest Products Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Latest Arrivals
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Check out our newest additions to the collection.Handpicked just for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestItems.length > 0 ? (
            latestItems.map((item) => (
                <div key={item._id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 font-sans transform hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden group-hover:opacity-90 transition-opacity bg-gray-100 dark:bg-gray-700">
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/400'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-600">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="p-5">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1" title={item.name}>
                      {item.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 h-10 leading-snug">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        ${item.price}
                      </span>
                      <Link 
                        href={`/items/${item._id}`}
                        className="text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
                      >
                        View Details <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">No items found. Be the first to add one!</p>
              <Link href="/dashboard/add-item" className="inline-block mt-4 text-blue-600 font-bold hover:underline">
                Add Item
              </Link>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
            <Link 
              href="/items" 
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:py-3 md:px-8 md:text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              See All Items
            </Link>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Premium Quality', desc: 'We source only the finest materials.', icon: '💎' },
            { title: 'Fast Shipping', desc: 'Delivery within 24 hours guaranteed.', icon: '🚀' },
            { title: '24/7 Support', desc: 'Our team is here to help anytime.', icon: '🎧' },
          ].map((feature, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. About Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="h-96 rounded-3xl overflow-hidden relative shadow-2xl skew-x-1 border-4 border-white dark:border-gray-700">
              <img 
                src="/about_us.png" 
                alt="About Us" 
                className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-sm">Our Story</span>
            <h2 className="text-4xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">Driven by Passion, Defined by Quality</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              We started with a simple mission: to make high-quality products accessible to everyone. 
              Our journey began in a small garage and has now grown into a global community.
            </p>
            <button className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center gap-2">
              Learn More <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Stats Section */}
      <section className="py-16 bg-blue-900 dark:bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '10k+', label: 'Happy Customers' },
            { number: '500+', label: 'Products' },
            { number: '99%', label: 'Satisfaction' },
            { number: '24h', label: 'Support Time' },
          ].map((stat, i) => (
             <div key={i}>
               <div className="text-4xl md:text-5xl font-bold mb-2 text-blue-300">{stat.number}</div>
               <div className="text-blue-100 font-medium">{stat.label}</div>
             </div>
          ))}
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: 1, name: 'Sarah Johnson', role: 'Verified Buyer', img: '/testimonials/user1.png', text: '"Absolutely amazing service! The product quality exceeded my expectations."' },
            { id: 2, name: 'Michael Chen', role: 'Tech Enthusiast', img: '/testimonials/user2.png', text: '"Fast shipping and great communication. Will definitely shop here again!"' },
            { id: 3, name: 'Alex Davila', role: 'Frequent Shopper', img: '/testimonials/user3.png', text: '"The selection is incredible. I found exactly what I was looking for."' }
          ].map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">{item.text}</p>
              <div className="flex items-center gap-3">
                 <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                />
                <div>
                   <div className="font-bold text-sm text-gray-900 dark:text-white">{item.name}</div>
                   <div className="text-xs text-gray-500 dark:text-gray-400">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-20 bg-indigo-50/50 dark:bg-gray-800/30">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How long does shipping take?', a: 'We ship all orders within 24 hours. Domestic delivery takes 2-3 business days.' },
              { q: 'What is your return policy?', a: 'You can return any item within 30 days for a full refund, no questions asked.' },
              { q: 'Do you offer international shipping?', a: 'Yes, we ship to over 50 countries worldwide.' },
            ].map((faq, i) => (
              <details key={i} className="group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm cursor-pointer border border-gray-100 dark:border-gray-700">
                <summary className="flex justify-between items-center font-bold text-gray-800 dark:text-gray-200 list-none group-open:text-blue-600 dark:group-open:text-blue-400 transition-colors">
                  {faq.q}
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-blue-100 mb-8">Join thousands of satisfied customers today and experience the difference.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/items" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              Shop Now
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900 transition-colors border border-blue-500">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
