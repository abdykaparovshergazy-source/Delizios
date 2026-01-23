import React, { useEffect, useRef, useState } from "react";
import "./block3.css";

function Block3({ cartItems, setCartItems }) {
  const [menu, setMenu] = useState([]);
  const [active, setActive] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [ratings, setRatings] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const topRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ["All", "Dinner", "Lunch", "Dessert", "Drink"];

  useEffect(() => {
    fetch("https://691a97172d8d7855756f5199.mockapi.io/myApi")
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.log(err));
  }, []);

  const filteredMenu = active === "All" ? menu : menu.filter(item => item.category?.trim().toLowerCase() === active.toLowerCase());
  const visibleMenu = active === "All" && !showAll ? filteredMenu.slice(0, 6) : filteredMenu;

  useEffect(() => setShowAll(false), [active]);

  const toggleShow = () => {
    if (showAll) topRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowAll(!showAll);
  };

  const handleRating = (id, value) => {
    setRatings(prev => ({ ...prev, [id]: value }));
  };

  const addToCart = (item) => {
    const existing = cartItems.find(i => i.id === item.id);
    if (existing) {
      setCartItems(cartItems.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }

    setAddedItems(prev => ({ ...prev, [item.id]: true }));

    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 500);
  };

  return (
    <>
      <section className="block3 container" ref={topRef}>
        <h2 className="block3-title">Our popular menu</h2>

        <div className="block3-tabs">
          {categories.map(cat => (
            <button key={cat} className={active === cat ? "active" : ""} onClick={() => setActive(cat)}>{cat}</button>
          ))}
        </div>

        <div className="block3-grid">
          {visibleMenu.map(item => (
            <div className="block3-card" key={item.id}>
              <div className="block3-img" onClick={() => setSelectedItem(item)}>
                <img src={item.image} alt={item.title} />
              </div>

              <h3>{item.title}</h3>

              <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    className={star <= (ratings[item.id] || 0) ? "star active" : "star"}
                    onClick={() => handleRating(item.id, star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p>{item.description}</p>
              <div className="card-bottom">
                <span className="price">{item.price}</span>
                <button
                  className={`order-btn ${addedItems[item.id] ? "added" : ""}`}
                  onClick={() => addToCart(item)}
                >
                  {addedItems[item.id] ? "Added!" : "Order now"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {active === "All" && filteredMenu.length > 6 && (
          <div className="show-more">
            <button onClick={toggleShow} className="show-more-btn">
              {showAll ? "Show less" : "Show more"}
            </button>
          </div>
        )}
      </section>

      {selectedItem && (
        <div className="recipe-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedItem(null)}>×</button>

            <img src={selectedItem.image} alt={selectedItem.title} />

            <h2>{selectedItem.title}</h2>

            <div className="recipe-content">
              <h3>Ingredients</h3>
              <ul>
                {selectedItem.recipe?.ingredients?.map((ing, index) => (
                  <li key={index}>{ing}</li>
                ))}
              </ul>

              <h3>Steps</h3>
              <ol>
                {selectedItem.recipe?.steps?.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default Block3;
