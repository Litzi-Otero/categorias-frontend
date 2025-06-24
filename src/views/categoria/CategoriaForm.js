import React, { useState, useEffect } from 'react';


function CategoriaForm({
  addCategoria,
  editCategoria,
  editingCategoria,
  setEditingCategoria,
  setShowCategoriaForm,
  categorias,
}) {
  const [formData, setFormData] = useState({
    id: null,
    nombre: '',
    nombreCategoriaAnterior: '',
    nombreCategoriaFederal: '',
    nombreCategoriaEstatal: '',
  });
  const [error, setError] = useState('');

  // Sincronizar formData cuando editingCategoria cambia
  useEffect(() => {
    if (editingCategoria) {
      setFormData({
        id: editingCategoria.id || null,
        nombre: editingCategoria.nombre || '',
        nombreCategoriaAnterior: editingCategoria.nombreCategoriaAnterior || '',
        nombreCategoriaFederal: editingCategoria.nombreCategoriaFederal || '',
        nombreCategoriaEstatal: editingCategoria.nombreCategoriaEstatal || '',
      });
    } else {
      setFormData({
        id: null,
        nombre: '',
        nombreCategoriaAnterior: '',
        nombreCategoriaFederal: '',
        nombreCategoriaEstatal: '',
      });
    }
  }, [editingCategoria]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.nombreCategoriaFederal || !formData.nombreCategoriaEstatal) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }
    setError('');
    try {
      const payload = {
        nombre: formData.nombre,
        nombreCategoriaAnterior: formData.nombreCategoriaAnterior || null, // Enviar null si está vacío
        nombreCategoriaFederal: formData.nombreCategoriaFederal,
        nombreCategoriaEstatal: formData.nombreCategoriaEstatal,
      };
      if (editingCategoria) {
        await editCategoria({ id: formData.id, ...payload });
      } else {
        await addCategoria(payload);
      }
      setEditingCategoria(null);
      setShowCategoriaForm(false);
    } catch (error) {
      setError('Error al procesar la categoría: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCancel = () => {
    setFormData({
      id: null,
      nombre: '',
      nombreCategoriaAnterior: '',
      nombreCategoriaFederal: '',
      nombreCategoriaEstatal: '',
    });
    setEditingCategoria(null);
    setShowCategoriaForm(false);
    setError('');
  };

  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="form-title">
      <form onSubmit={handleSubmit} className="form-container">
        <h2 id="form-title" className="form-title">
          {editingCategoria ? 'Editar Categoría' : 'Nueva Categoría'}
        </h2>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">
            Nombre de la Categoría *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="input-field"
            required
            aria-required="true"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombreCategoriaAnterior" className="form-label">
            Categoría Anterior
          </label>
          <select
            id="nombreCategoriaAnterior"
            name="nombreCategoriaAnterior"
            value={formData.nombreCategoriaAnterior}
            onChange={handleChange}
            className="input-field"
            aria-describedby="categoria-anterior-help"
          >
            <option value="">Ninguna</option>
            {categorias.length > 0 ? (
              categorias
                .filter((cat) => cat.id !== formData.id) // Excluir la categoría actual al editar
                .map((cat) => (
                  <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))
            ) : (
              <option value="" disabled>
                No hay categorías disponibles
              </option>
            )}
          </select>
          <p id="categoria-anterior-help" className="help-text">
            Selecciona una categoría anterior o deja en "Ninguna".
          </p>
        </div>
        <div className="form-group">
          <label htmlFor="nombreCategoriaFederal" className="form-label">
            Categoría Federal *
          </label>
          <input
            type="text"
            id="nombreCategoriaFederal"
            name="nombreCategoriaFederal"
            value={formData.nombreCategoriaFederal}
            onChange={handleChange}
            className="input-field"
            required
            aria-required="true"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombreCategoriaEstatal" className="form-label">
            Categoría Estatal *
          </label>
          <input
            type="text"
            id="nombreCategoriaEstatal"
            name="nombreCategoriaEstatal"
            value={formData.nombreCategoriaEstatal}
            onChange={handleChange}
            className="input-field"
            required
            aria-required="true"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="custom-button submit-button">
            {editingCategoria ? 'Actualizar' : 'Agregar'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="custom-button cancel-button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoriaForm;