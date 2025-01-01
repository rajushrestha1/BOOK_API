import React, { useState } from 'react';
import BookList from './components/BookList';
import Cart from './components/Cart';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Book Store</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BookList addToCart={addToCart} />
          <Cart cart={cart} />
        </div>
      </main>
    </div>
  );
};

export default App;



import React from 'react';

const books = [
  { id: 1, title: 'The Great Gatsby', price: 10.99 },
  { id: 2, title: '1984', price: 8.99 },
  { id: 3, title: 'To Kill a Mockingbird', price: 12.99 },
];

const BookList = ({ addToCart }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Available Books</h2>
      <ul>
        {books.map((book) => (
          <li
            key={book.id}
            className="flex justify-between items-center p-2 border-b last:border-none"
          >
            <div>
              <h3 className="font-medium">{book.title}</h3>
              <p className="text-sm text-gray-600">${book.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => addToCart(book)}
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;


