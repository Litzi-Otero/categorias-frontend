import React from 'react';
import './CategoriasTable.css'; 

const CategoriasTable = ({
  categorias,
  setEditingCategoria,
  setShowCategoriaForm,
  deleteCategoria,
  deactivateCategoria,
}) => {
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="category-table">
          <thead className="table-header">
            <tr>
              <th>Nombre</th>
              <th>Nombre Anterior</th>
              <th>Nombre Federal</th>
              <th>Nombre Estatal</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-table">
                  No hay categorías disponibles
                </td>
              </tr>
            ) : (
              categorias.map((categoria, index) => (
                <tr
                  key={categoria.id}
                  className={`table-row ${index % 2 === 0 ? 'row-even' : 'row-odd'}`}
                >
                  <td>{categoria.nombre}</td>
                  <td>{categoria.nombreCategoriaAnterior || '-'}</td>
                  <td>{categoria.nombreCategoriaFederal || '-'}</td>
                  <td>{categoria.nombreCategoriaEstatal || '-'}</td>
                  <td>{categoria.activo ? 'Sí' : 'No'}</td>
                  <td className="actions-cell">
                    <button
                      className="custom-button edit-button"
                      onClick={() => {
                        setEditingCategoria(categoria);
                        setShowCategoriaForm(true);
                      }}
                    >
                      <span>Editar</span>
                      <span className="tooltip">Editar categoría</span>
                    </button>
                    <button
                      className="custom-button delete-button"
                      onClick={() => deleteCategoria(categoria.id)}
                    >
                      <span>Eliminar</span>
                      <span className="tooltip">Eliminar categoría</span>
                    </button>
                    {categoria.activo && (
                      <button
                        className="custom-button cancel-button"
                        onClick={() => deactivateCategoria(categoria.id)}
                      >
                        <span>Desactivar</span>
                        <span className="tooltip">Desactivar categoría</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriasTable;