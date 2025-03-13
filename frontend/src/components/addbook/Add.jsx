import React, { useEffect, useState } from 'react';
import './Add.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Add = () => {
  const books = {
    book_name: '',
    book_author: '',
    book_parts: '',
  };

  const [book, setBook] = useState(books);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  useEffect(() => {
    // console.log(book);
  }, [book]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://mern-book-backend-2ccd.onrender.com/api/create/',
        book
      );

      toast.success(response.data.msg, { position: 'top-center' });
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);

      // Show error toast only when the request fails
      toast.error(
        error.response?.data?.msg || 'Failed to add book. Please try again.',
        { position: 'top-center' }
      );
    }
    navigate('/');
  };

  return (
    <div className="add-book">
      <Link to={'/'}>Back</Link>
      <h3>Add new book</h3>
      <form className="addBookForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="bname">Book name</label>
          <input
            type="text"
            onChange={inputHandler}
            name="book_name"
            id="bname"
            autoComplete="off"
            placeholder="book name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="bname">Book Author</label>
          <input
            type="text"
            onChange={inputHandler}
            name="book_author"
            id="aname"
            autoComplete="off"
            placeholder="Book Author"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="bname">Number of parts</label>
          <input
            type="text"
            onChange={inputHandler}
            name="book_parts"
            id="bparts"
            autoComplete="off"
            placeholder="Number of parts"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Add Book</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
