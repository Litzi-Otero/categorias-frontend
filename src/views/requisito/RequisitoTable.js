import React from 'react';
import PropTypes from 'prop-types';

function RequisitosTable({ requisitos, setEditingRequisito, setShowRequisitoForm, deleteRequisito, deactivateRequisito }) {
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="category-table">
          <thead>
            <tr className="table-header">
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Tipo de Requisito</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {requisitos.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-table">
                  No hay requisitos registrados.
                </td>
              </tr>
            ) : (
              requisitos.map((requisito, index) => (
                <tr key={requisito.id || index} className={`table-row ${index % 2 === 0 ? 'row-even' : 'row-odd'}`}>
                  <td>{requisito.nombre || 'N/A'}</td>
                  <td>{requisito.categoria?.nombre || 'N/A'}</td>
                  <td>{requisito.tipoRequisito?.nombre || 'N/A'}</td>
                  <td>
                    <span className={`status ${requisito.activo ? 'status-active' : 'status-inactive'}`}>
                      {requisito.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      onClick={() => {
                        setEditingRequisito({
                          id: requisito.id,
                          nombre: requisito.nombre || '',
                          categoriaId: requisito.categoria?.id || '',
                          tipoRequisitoId: requisito.tipoRequisito?.id || '',
                        });
                        setShowRequisitoForm(true);
                      }}
                      className="custom-button edit-button"
                      disabled={!requisito.activo}
                    >
                      Editar
                      <span className="tooltip">Editar Requisito</span>
                    </button>
                    <button
                      onClick={() => deleteRequisito(requisito.id)}
                      className="custom-button delete-button"
                      disabled={!requisito.activo}
                    >
                      Eliminar
                      <span className="tooltip">Eliminar Requisito</span>
                    </button>
                    {requisito.activo && (
                      <button
                        onClick={() => deactivateRequisito(requisito.id)}
                        className="custom-button cancel-button"
                      >
                        Desactivar
                        <span className="tooltip">Desactivar Requisito</span>
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
}

RequisitosTable.propTypes = {
  requisitos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      nombre: PropTypes.string,
      categoria: PropTypes.shape({
        id: PropTypes.number,
        nombre: PropTypes.string,
      }),
      tipoRequisito: PropTypes.shape({
        id: PropTypes.number,
        nombre: PropTypes.string,
      }),
      activo: PropTypes.bool,
    })
  ).isRequired,
  setEditingRequisito: PropTypes.func.isRequired,
  setShowRequisitoForm: PropTypes.func.isRequired,
  deleteRequisito: PropTypes.func.isRequired,
  deactivateRequisito: PropTypes.func.isRequired,
};

export default React.memo(RequisitosTable);