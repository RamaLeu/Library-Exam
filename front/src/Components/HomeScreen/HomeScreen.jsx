import React from 'react';
import { useState, useEffect } from 'react';
import Admin from './Admin/Admin';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import './HomeScreen.css';


const HomeScreen = (props) => {
    let [shownBooks, setShownBooks] = useState([]);
    let [allBooks, setAllBooks] = useState([]);
    let [categories, setCategories] = useState([]);
    let [loading, setIsLoading] = useState(true);
    let [page, setPage] = useState("main");
    let [searchTerm, setSearchTerm] = useState("");
    let [searchCategory, setSearchCategory] = useState("");

    function fetchData(){
        fetch('http://localhost:3001/api/v1/books')
        .then(response => response.json())
        .then(data => {
            setShownBooks(data.books);
            setAllBooks(data.books);
            setIsLoading(false);
        });
    }

    function fetchCategories(){
        fetch('http://localhost:3001/api/v1/categories')
        .then(response => response.json())
        .then(data => {
            setCategories(data.categories);
            setIsLoading(false);
        });
    }
    useEffect(() => {
        fetchData();
        fetchCategories();
    }, []);

    useEffect(() => {
        let bookList = [];
        if(searchCategory){
            allBooks.map((book)=>{
                if (book.category === searchCategory){
                    bookList.push(book);
                }
            });
        }
      if(searchTerm){
        let tempArray = [];
        if(searchCategory){
            bookList.map((book)=>{
                if (book.title.toLowerCase().includes(searchTerm.toLowerCase())){
                    tempArray.push(book);
                }
            })
        }else{
            allBooks.map((book)=>{
                if (book.title.toLowerCase().includes(searchTerm.toLowerCase())){
                    tempArray.push(book);
                }
            })
        }
        setShownBooks(tempArray);
      }else if(searchCategory && !searchTerm){
        setShownBooks(bookList);
      }else{
        setShownBooks(allBooks);
      }
    }, [searchTerm, searchCategory]);
    
    
    function reserveBook(id, book){
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                status: true
            })
        };
        fetch('http://localhost:3001/api/v1/books', requestOptions)
            .then(response => response.json())
            .then(data => {
                fetchData();
                const reqOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userEmail: props.user.email,
                        userID: props.user.id,
                        book: book,
                        date: Date.now(),
                    })
                };
                fetch('http://localhost:3001/api/v1/reserve', reqOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    });
            });
    }
    function logout(){
        props.setUser();
    }
    function clearSearch(){
        setSearchCategory("");
        setSearchTerm("");
    }
  return (
    <div className='homePage'>
        {page === "main" ? 
        <Header user={props.user} setPage={setPage} setSearchTerm={setSearchTerm} logout={logout} categories={categories} setSearchCategory={setSearchCategory} clearSearch={clearSearch} searchCategory={searchCategory} searchTerm={searchTerm}/>:
        <div className="adminMainNav"><button onClick={()=>{setPage("main")}} className="adminMainBtn">Pagrindinis</button></div>}
        {page ==="main"&&
        <div className='homeBooksList'>
            {!loading &&
            shownBooks.map((book)=>(
                <div className="homeSingleBook">
                    <div className='singleBookImg'>
                        <img src={book.image} alt="book"/>
                    </div>
                    <div className="singleBookText">
                    <span>{book.title}</span>
                    <span>{book.author}</span>
                    <span>{book.category}</span>
                    <span>{book.status ? "Rezervuota" : "Laisva"} {book.status}</span>
                    {!book.status && <button onClick={()=>{reserveBook(book._id, book)}}>Rezervuoti</button>}</div>
                </div>
            ))}
        </div>}
        {page ==="admin"&&
        <Admin books={allBooks} fetch={fetchData}/>}</div>
  )
}

export default HomeScreen