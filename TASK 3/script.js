const products = [
    { id: 1, name: "Ultra Slim Laptop", price: 999.99, image: "https://www.cnet.com/a/img/resize/239694cfa61a6e05104064eb79a1c7aa5f89410f/hub/2016/06/27/913ece9c-8f68-478d-bb11-600c9463cdb0/super-slim-laptops-05.jpg?auto=webp&width=1200", category: "Electronics" },
    { id: 2, name: "5G Smartphone", price: 499.99, image: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-17174,resizemode-75,msid-101025906/top-trending-products/mobile-phones/top-5-best-selling-5g-smartphones-2023-in-india-unveiling-the-ultimate-flagship-devices.jpg", category: "Electronics" },
    { id: 3, name: "Noise-Canceling Headphones", price: 199.99, image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Bose_QuietComfort_25_Acoustic_Noise_Cancelling_Headphones_with_Carry_Case.jpg", category: "Audio" },
    { id: 4, name: "Fitness Smartwatch", price: 149.99, image: "https://cdn.thewirecutter.com/wp-content/media/2023/06/fitnesstrackers-2048px-09819-2x1-1.jpg?auto=webp&quality=75&crop=1.91:1&width=1200", category: "Wearables" },
    { id: 5, name: "4K Smart TV", price: 799.99, image: "https://res.cloudinary.com/sharp-consumer-eu/image/fetch/w_1100,f_auto,q_auto/https://s3.infra.brandquad.io/accounts-media/SHRP/DAM/origin/a3b0c3c8-6ce9-11ea-aeea-becc10303f49.jpg", category: "Electronics" },
    { id: 6, name: "Wireless Earbuds", price: 129.99, image: "https://cdn.mos.cms.futurecdn.net/iVu7tJS8kEkKJRTgerUaEm.jpg", category: "Audio" },
    { id: 7, name: "Gaming Console", price: 399.99, image: "https://hips.hearstapps.com/hmg-prod/images/gh-index-gamingconsoles-052-print-preview-1659705142.jpg", category: "Gaming" },
    { id: 8, name: "Digital Camera", price: 599.99, image: "https://i.pcmag.com/imagery/roundups/018cwxjHcVMwiaDIpTnZJ8H-22..v1570842461.jpg", category: "Photography" },
  ];
  
  function App() {
    const [cart, setCart] = React.useState([]);
    const [isCartOpen, setIsCartOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredProducts, setFilteredProducts] = React.useState(products);
  
    React.useEffect(() => {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    }, [searchTerm]);
  
    const addToCart = (product) => {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.product.id === product.id);
        if (existingItem) {
          return prevCart.map(item =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevCart, { product, quantity: 1 }];
      });
    };
  
    const removeFromCart = (productId) => {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.product.id === productId);
        if (existingItem && existingItem.quantity > 1) {
          return prevCart.map(item =>
            item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
          );
        }
        return prevCart.filter(item => item.product.id !== productId);
      });
    };
  
    const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  
    return (
      <div>
        <header>
          <div className="container">
            <h1>TechMart</h1>
            <nav>
              <a href="#">Home</a>
              <a href="#">Products</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </nav>
            <button onClick={() => setIsCartOpen(true)}>Cart ({cart.length})</button>
          </div>
        </header>
  
        <section className="hero">
          <div className="container">
            <h2>Welcome to TechMart</h2>
            <p>Discover the latest in tech innovation</p>
            <button>Shop Now</button>
          </div>
        </section>
  
        <main className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
  
          <div className="categories">
            <h2>Categories</h2>
            <div className="category-badges">
              {Array.from(new Set(products.map(p => p.category))).map(category => (
                <span key={category} className="badge" onClick={() => setSearchTerm(category)}>
                  {category}
                </span>
              ))}
            </div>
          </div>
  
          <h2>Featured Products</h2>
          <div className="products">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <span className="badge">{product.category}</span>
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </main>
  
        <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <button onClick={() => setIsCartOpen(false)}>Close</button>
          </div>
          <div className="cart-items">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map(item => (
                <div key={item.product.id} className="cart-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div>
                    <h3>{item.product.name}</h3>
                    <p>${item.product.price.toFixed(2)} x {item.quantity}</p>
                    <button onClick={() => removeFromCart(item.product.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item.product)}>+</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart-total">
            <h3>Total: ${cartTotal.toFixed(2)}</h3>
            <button>Checkout</button>
          </div>
        </div>
  
        <footer>
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>About TechMart</h3>
                <p>Your one-stop shop for the latest technology and gadgets.</p>
              </div>
              <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Products</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Newsletter</h3>
                <p>Stay updated with our latest offers</p>
                <form className="newsletter-form">
                  <input type="email" placeholder="Enter your email" />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 TechMart. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById('root'));