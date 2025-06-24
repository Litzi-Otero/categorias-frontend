import React, { useState } from 'react';

function TipoRequisitoForm({ addTipoRequisito, editTipoRequisito, editingTipoRequisito, setEditingTipoRequisito, setShowTipoRequisitoForm }) {
  const [nombre, setNombre] = useState(editingTipoRequisito ? editingTipoRequisito.nombre : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre.trim()) {
      try {
        if (editingTipoRequisito) {
          await editTipoRequisito({ id: editingTipoRequisito.id, nombre });
        } else {
          await addTipoRequisito({ nombre });
        }
        setNombre('');
        setEditingTipoRequisito(null);
        setShowTipoRequisitoForm(false);
      } catch (error) {
        alert('Error al procesar el tipo de requisito: ' + (error.response?.data?.message || error.message));
      }
    } else {
      alert('Por favor, ingresa un nombre para el tipo de requisito.');
    }
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">{editingTipoRequisito ? 'Editar Tipo de Requisito' : 'Nuevo Tipo de Requisito'}</h2>
        <div className="form-group">
          <label className="form-label">Nombre del Tipo *</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="custom-button submit-button">
            {editingTipoRequisito ? 'Actualizar' : 'Agregar'}
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingTipoRequisito(null);
              setShowTipoRequisitoForm(false);
            }}
            className="custom-button cancel-button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default TipoRequisitoForm;