import React from 'react';
import './Header.css';

const Header = (props) => {
  return (
    <div className='headerComp'>
        <button onClick={()=>{props.setPage("main")}}>Pagrindinis</button>
{/*         <button>Knygų sąrašas</button> */}
        <input type="text" onChange={(e)=>{props.setSearchTerm(e.target.value)}} value={props.searchTerm} placeholder="Ieškoti"/>
        <select onChange={(e)=>{props.setSearchCategory(e.target.value)}} value={props.searchCategory}>
        <option value="" disabled hidden>Pasirinkti kategoriją</option>
            {props.categories.map((category)=>(
                <option value={category.name}>{category.name}</option>
            ))}
        </select>
        {(props.searchTerm || props.searchCategory) &&<button onClick={()=>{props.clearSearch()}}>Atšaukti paiešką</button>}
        {props.user.type == "admin" &&
        <button onClick={()=>{props.setPage("admin")}}>Valdymas</button>}
        <button onClick={()=>{props.logout()}}>Atsijungti</button>
    </div>
  )
}

export default Header