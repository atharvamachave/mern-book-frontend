import express from 'express';
import {
  create,
  deleteBook,
  getAll,
  getOne,
  search,
  update,
} from '../controller/booksController.js';

const route = express.Router();

route.post('/create', create);
route.get('/getall', getAll);
route.get('/getone/:id', getOne);
route.put('/update/:id', update);
route.delete('/delete/:id', deleteBook);
route.get('/search/:bname', search);

export default route;
