import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "../SearchBar/SearchBar";
import { filterRecipesByType, orderRecipes } from "../../redux/actions/actions";
import "./NavBar.css";

function NavBar({paging}) {
  const dispatch = useDispatch();
  let { dietTypes } = useSelector((state) => state);
  const [type, setType] = useState("");
  const [typesArr, setTypesArr] = useState([]);

  const handleOnChange = (e) => {
    setType(e.target.value);
  };

  const handleClickAdd = (e) => {
    if (type && !typesArr.includes(type)) setTypesArr([...typesArr, type]);
    dispatch(filterRecipesByType([...typesArr, type]));
    paging(1)
  };

  const handleClickClear = (e) => {
    setTypesArr([])
    dispatch(filterRecipesByType([]));
    paging(1)
  };

  const resetTypesArr = () => {
    setTypesArr([]);
  };

  const handleOrder = (e) => {
    dispatch(orderRecipes(e.target.value));
    paging(1)
  };

  return (
    <div className="navbar">
      <div>
        <Link to={'/'}>
        </Link>
      </div>

      <div className="custom-dropdown order">
        <select name="select" onChange={handleOrder}>
          <option disabled selected defaultValue>Ordenado por...</option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
          <option value="<HS">Mayor puntaje de salud</option>
          <option value=">HS">Menor puntaje de salud</option>
        </select>
      </div>

      <div className="typeContainer">
        <div className="custom-dropdown types">
          <select onChange={handleOnChange}>
            <option disabled selected defaultValue>Seleccione el tipo para agregar</option>
            {dietTypes.map((e) => {
              return (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button className="btn" onClick={handleClickAdd}>Agregar</button>
        </div>

        <div className="typearr">
          {typesArr?.map((e) => {
            return <span key={e}>-{e}</span>;
          })}
        </div>
        
        <div>
          <button className="btn" onClick={handleClickClear}>Actualizar</button>
        </div>
      </div>
      
      <div>
        <Link to="/create" className="createlink">
          <button  className="btn" type="button">Crear receta</button>
        </Link>
      </div>

      <div>
        <SearchBar reset={resetTypesArr} />
      </div>
    </div>
  );
}

export default NavBar;