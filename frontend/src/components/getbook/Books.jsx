import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Books.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const Books = () => {
  const [books, setBooks] = useState([]); // Ensure books is always an array
  const [search, setSearch] = useState('');

  // Fetch all books
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getall/');
        console.log('API Response:', response.data); // Debugging
        setBooks(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to fetch books');
      }
    };
    fetchData();
  }, [search]);

  // Delete a book
  const deleteBook = async (bookID) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/delete/${bookID}`
      );
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookID));
      toast.success(response.data.msg, { position: 'top-center' });
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    }
  };

  // Handle input change for search
  const inputHandler = (e) => {
    setSearch(e.target.value);
  };

  // Search function
  const displaySearch = async () => {
    try {
      if (!search.trim()) {
        // If search box is empty, fetch all books again
        const response = await axios.get('http://localhost:8000/api/getall/');
        setBooks(Array.isArray(response.data) ? response.data : []);
      } else {
        // Fetch filtered books based on search query
        const response = await axios.get(
          `http://localhost:8000/api/search/${search}`
        );
        console.log('Search Response:', response.data);

        // Fix: Extract the correct books array
        setBooks(Array.isArray(response.data.books) ? response.data.books : []);
      }
    } catch (error) {
      console.error('Error searching books:', error);
      toast.error('Search failed');
    }
  };

  return (
    <div className="books-table">
      <div className="header-container">
        <Link to={'/add'} className="add-btn">
          <i className="fa-solid fa-plus"></i>
        </Link>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={search}
            onChange={inputHandler}
          />
          <i className="search-icon" onClick={displaySearch}>
            🔍
          </i>
        </div>
      </div>

      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Book Name</th>
            <th>Book Author</th>
            <th>Parts</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(books) && books.length > 0 ? (
            books.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.book_name}</td>
                <td>{book.book_author}</td>
                <td>{book.book_parts}</td>
                <td className="action-btns">
                  <button onClick={() => deleteBook(book._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Link to={`/edit/${book._id}`}>
                    <i className="fa-solid fa-pen"></i>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No books found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
