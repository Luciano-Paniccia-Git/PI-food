import React from "react";
import './Paginado.css'
// Declaro el paginado y me traigo los estados locales
export default function Paginado ({currentPage, recipesPerPage, allRecipes, paginado}){
    const pageNumbers = [];
           
    for(let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++){  //el Math.ceil() devuelve el entero mayor o igual más próximo a un número dado.
        //i <= 100/9 = 11.11 => Math.ceil(11.11) = 12
        //Pusheo en el arreglo la cantidad total de paginas que va a tener la app
        pageNumbers.push(i+1);
    }
    return(
        <nav className="paginado__nav">
            <ul className="paginado__ul">
                {
                    //Si tengo el paginado, devolveme con un numero sus respectivas paginas y hacelas linkeables
                    pageNumbers.map(number => (
                            currentPage === number?
                            <li className="selected" key={number}>
                                {<a href="/#" onClick={() => paginado(number)}>{number}</a>}
                            </li>
                            :
                            <li className="paginado__li" key={number}>
                                {<a href="/#" onClick={() => paginado(number)}>{number}</a>}
                            </li>
                    ))
                }
            </ul>
        </nav>
    )
}
