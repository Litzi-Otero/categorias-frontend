import React, { useState } from 'react';
import './Form.css';

function RequisitoForm({ addRequisito, editRequisito, editingRequisito, setEditingRequisito, setShowRequisitoForm, categorias, tipoRequisitos }) {
  const [formData, setFormData] = useState(
    editingRequisito || {
      id: null,
      nombre: '',
      categoriaId: '',
      tipoRequisitoId: '',
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.nombre && formData.categoriaId && formData.tipoRequisitoId) {
      try {
        if (editingRequisito) {
          await editRequisito(formData);
        } else {
          await addRequisito(formData);
        }
        setFormData({ id: null, nombre: '', categoriaId: '', tipoRequisitoId: '' });
        setEditingRequisito(null);
        setShowRequisitoForm(false);
      } catch (error) {
        alert('Error al procesar el requisito: ' + (error.response?.data?.message || error.message));
      }
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">{editingRequisito ? 'Editar Requisito' : 'Nuevo Requisito'}</h2>
        <div className="form-group">
          <label className="form-label">Nombre del Requisito *</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Categoría *</label>
          <select
            value={formData.categoriaId}
            onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
            className="input-field"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Tipo de Requisito *</label>
          <select
            value={formData.tipoRequisitoId}
            onChange={(e) => setFormData({ ...formData, tipoRequisitoId: e.target.value })}
            className="input-field"
            required
          >
            <option value="">Selecciona un tipo</option>
            {tipoRequisitos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="custom-button submit-button">
            {editingRequisito ? 'Actualizar' : 'Agregar'}
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingRequisito(null);
              setShowRequisitoForm(false);
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

export default RequisitoForm;