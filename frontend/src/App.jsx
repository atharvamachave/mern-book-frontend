import { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Books from './components/getbook/Books';
import Add from './components/addbook/Add';
import Edit from './components/updatebook/Edit';

function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <Books />,
    },
    {
      path: '/add',
      element: <Add />,
    },
    {
      path: '/edit/:id',
      element: <Edit />,
    },
  ]);

  return (
    <>
      <div className="App">
        <RouterProvider router={route}></RouterProvider>
      </div>
    </>
  );
}

export default App;
