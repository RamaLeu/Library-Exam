import React, {useState, useEffect} from 'react';
import Users from './Users';
import './Admin.css';

const Admin = (props) => {
    let [adminPage, setAdminPage] = useState("books");
    let [title, setTitle] = useState("");
    let [image, setImage] = useState("");
    let [author, setAuthor] = useState("");
    let [category, setCategory] = useState("");
    let [books, setBooks] = useState(props.books);
    let [id, setId] = useState("");
    let [editing, setEditing] = useState(false); 
    let [categories, setCategories] = useState([]);
    let [loading, setIsLoading] = useState(true);
    let [categoryName, setCategoryName] = useState("");
    let [categoryId, setCategoryId] = useState("");
    let [categoryEditing, setCategoryEditing] = useState(false);

    function fetchCategories(){
        fetch('http://localhost:3001/api/v1/categories')
        .then(response => response.json())
        .then(data => {
            setCategories(data.categories);
            setIsLoading(false);
        });
    }

    useEffect(() => {
      fetchCategories();
    }, [categories]);
    
    useEffect(() => {
      setBooks(props.books);
    }, [props.books]);
    
    function addBook(e){
        e.preventDefault();
        let data;
        if (editing){
            data = {
                id: id,
                image: image,
                title: title,
                author: author,
                category: category,
            };
            const reqOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            fetch('http://localhost:3001/api/v1/books/change', reqOptions)
                .then(response => response.json())
                .then(data => {
                    setEditing(false);
                    setId("");
                    props.fetch();
                });
        }else{
            data = {
                image: image,
                title: title,
                author: author,
                category: category,
                status: false
            };
            const reqOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            fetch('http://localhost:3001/api/v1/books', reqOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                props.fetch();
            });
        }
    }

    function editBook(id, book){
        setImage(book.image);
        setTitle(book.title);
        setAuthor(book.author);
        setCategory(book.category);
        setId(id);
        setEditing(true);
    }
    function deleteBook(id){
        fetch('http://localhost:3001/api/v1/books/'+ id, {method: 'DELETE'})
            .then(response => response.json())
            .then(data => {
            console.log(data);
            props.fetch();
        });
    }

    function addCategory(e){
        e.preventDefault();
        if (!categoryEditing){
            const reqOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: categoryName
                })
            };
            fetch('http://localhost:3001/api/v1/categories', reqOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                fetchCategories();
            });
        }else{
            const reqOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: categoryId,
                    name: categoryName
                })
            };
            fetch('http://localhost:3001/api/v1/categories', reqOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                fetchCategories();
                setCategoryName("");
                setCategoryEditing(false);
                setCategoryId("");
            });
        }

    }
    function deleteCategory(id){
        fetch('http://localhost:3001/api/v1/categories/'+ id, {method: 'DELETE'})
        .then(response => response.json())
        .then(data => {
        console.log(data);
        fetchCategories();
    });
    }
    function editCategory(id, category){
        setCategoryName(category.name);
        setCategoryId(id);
        setCategoryEditing(true);
    }
  return (
    <>
    {!loading &&
    <div className='homeAdminPanel'>
        <div className="homeAdminNav">
            <button onClick={()=>{setAdminPage("books")}}>Knygos</button>
            <button onClick={()=>{setAdminPage("categories")}}>Kategorijos</button>
            <button onClick={()=>{setAdminPage("users")}}>Vartotojai</button>
        </div>
        {adminPage === "books"&&
        <div className="adminBooks">
            <form onSubmit={(e)=>{addBook(e)}}>
                <input type="text" onChange={(e)=>{setImage(e.target.value)}} value={image} placeholder='Nuotraukos URL' required></input>
                <input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} placeholder='Pavadinimas' required></input>
                <input type="text" onChange={(e)=>{setAuthor(e.target.value)}} value={author} placeholder='Autorius' required></input>
                <select onChange={(e)=>{setCategory(e.target.value)}} value={category} required>
                    <option value="" disabled hidden>Kategorija</option>
                    {categories.map((category)=>(
                        <option value={category.name}>{category.name}</option>
                    ))}
                </select>
                <input type="submit" className='brownBtn' value={!editing ? "Pridėti": "Pakeisti"}/>
            </form>
            <div className='adminBooksList'>
                {books.map((book)=>(
                    <div className='adminSingleBook'>
                        <span>{book.title}</span>
                        <span>{book.author}</span>
                        <span>{book.category}</span>
                        <span>{book.status ? "Rezervuota" : "Laisva"}</span>
                        <button onClick={()=>{editBook(book._id, book)}} className="brownBtn">Keisti</button>
                        <button onClick={()=>{deleteBook(book._id)}} className="brownBtn">Šalinti</button>
                    </div>
                ))}
            </div>
        </div>}
        {adminPage === "categories" &&
        <div className='adminCategories'>
             <form className='adminCategoriesForm' onSubmit={(e)=>{addCategory(e)}}>
                    <input type="text" className='adminCategoriesText' onChange={(e)=>{setCategoryName(e.target.value)}} value={categoryName} placeholder='Pavadinimas'></input>
                    <input type="submit" className="brownBtn adminCategoriesSubmit" value={!categoryEditing ? "Pridėti": "Pakeisti"}></input>
            </form>
            <div className='adminCategoriesList'>
                    {categories.map((category)=>(
                        <div className='adminCategorySingle'>
                        <span>{category.name}</span>
                        <button className="brownBtn" onClick={()=>{editCategory(category._id, category)}}>Keisti</button>
                        <button className="brownBtn"  onClick={()=>{deleteCategory(category._id)}}>Šalinti</button>
                        </div>
                    ))}
            </div>
        </div>}
        {adminPage === "users"&&
        <Users/>}
    </div>}
    </>
  )
}

export default Admin