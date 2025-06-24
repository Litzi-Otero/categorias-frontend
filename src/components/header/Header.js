import React from 'react';
import './Header.css';
import '../buttons/Buttons.css'; 

function Header({ setShowRequisitoForm, setShowCategoriaForm, setShowTipoRequisitoForm }) {
  return (
    <div className="header">
      <h1 className="app-title">Gestión de Requisitos de Profesores</h1>
      <div className="header-buttons">
        <button onClick={() => setShowRequisitoForm(true)} className="custom-button add-requisito-button">
          Agregar Requisito
        </button>
        <button onClick={() => setShowCategoriaForm(true)} className="custom-button add-button">
          Agregar Categoría
        </button>
        <button onClick={() => setShowTipoRequisitoForm(true)} className="custom-button add-type-button">
          Agregar Tipo de Requisito
        </button>
      </div>
    </div>
  );
}

export default Header;