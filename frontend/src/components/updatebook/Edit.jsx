import React, { useEffect, useState } from 'react';
import '../addbook/Add.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Edit = () => {
  const books = {
    book_name: '',
    book_author: '',
    book_parts: '',
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(books);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
    console.log(book);
  };

  useEffect(() => {
    axios
      .get(`https://mern-book-backend-2ccd.onrender.com/getone/${id}`)
      .then((response) => {
        console.log(response.data);
        setBook(response.data.book);
        console.log(id);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`https://mern-book-backend-2ccd.onrender.com/api/update/${id}`, book)
      .then((response) => {
        // console.log(response);
        toast.success(response.data.msg, { position: 'top-center' });
        navigate('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="add-book">
      <Link to={'/'}>Back</Link>
      <h3>Update book</h3>
      <form className="addBookForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="bname">Book name</label>
          <input
            type="text"
            value={book.book_name}
            onChange={inputChangeHandler}
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
            value={book.book_author}
            onChange={inputChangeHandler}
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
            value={book.book_parts}
            onChange={inputChangeHandler}
            name="book_parts"
            id="bparts"
            autoComplete="off"
            placeholder="Number of parts"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Update Book</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
