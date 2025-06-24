import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/header/Header';
import CategoriasTable from './views/categoria/CategoriasTable';
import RequisitosTable from './views/requisito/RequisitosTable';
import RequisitoForm from './views/requisito/RequisitoForm';
import CategoriaForm from './views/categoria/CategoriaForm';
import TipoRequisitoForm from './views/requisito/TipoRequisitoForm';
import Messages from './components/messages/Messages';
import './App.css';

function App() {
  const [requisitos, setRequisitos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tipoRequisitos, setTipoRequisitos] = useState([]);
  const [editingRequisito, setEditingRequisito] = useState(null);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [editingTipoRequisito, setEditingTipoRequisito] = useState(null);
  const [showRequisitoForm, setShowRequisitoForm] = useState(false);
  const [showCategoriaForm, setShowCategoriaForm] = useState(false);
  const [showTipoRequisitoForm, setShowTipoRequisitoForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8001/api';

  useEffect(() => {
    const fetchRequisitos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/requisito?soloActivos=true`);
        setRequisitos(response.data);
        setError(null);
      } catch (error) {
        setError('Error al cargar los requisitos: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categoria?soloActivos=false`);
        setCategorias(response.data);
      } catch (error) {
        setError('Error al cargar las categorías: ' + (error.response?.data?.message || error.message));
      }
    };

    const fetchTipoRequisitos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tipo-requisito?soloActivos=true`);
        setTipoRequisitos(response.data);
      } catch (error) {
        setError('Error al cargar los tipos de requisitos: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchRequisitos();
    fetchCategorias();
    fetchTipoRequisitos();
  }, []);

  const addRequisito = async (requisito) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/requisito?categoriaId=${requisito.categoriaId}&tipoRequisitoId=${requisito.tipoRequisitoId}`,
        { nombre: requisito.nombre }
      );
      setRequisitos([...requisitos, response.data]);
    } catch (error) {
      throw new Error('Error al agregar el requisito: ' + (error.response?.data?.message || error.message));
    }
  };

  const editRequisito = async (updatedRequisito) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/requisito/${updatedRequisito.id}`, { nombre: updatedRequisito.nombre });
      setRequisitos(
        requisitos.map((req) => (req.id === updatedRequisito.id ? response.data : req))
      );
    } catch (error) {
      throw new Error('Error al actualizar el requisito: ' + (error.response?.data?.message || error.message));
    }
  };

  const deleteRequisito = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este requisito?')) {
      try {
        await axios.delete(`${API_BASE_URL}/requisito/${id}`);
        setRequisitos(requisitos.filter((req) => req.id !== id));
      } catch (error) {
        alert('Error al eliminar el requisito: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const deactivateRequisito = async (id) => {
    if (window.confirm('¿Estás seguro de desactivar este requisito?')) {
      try {
        await axios.patch(`${API_BASE_URL}/requisito/${id}/desactivar`);
        setRequisitos(
          requisitos.map((req) => (req.id === id ? { ...req, activo: false } : req))
        );
      } catch (error) {
        alert('Error al desactivar el requisito: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const addCategoria = async (categoria) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/categoria`, {
        nombre: categoria.nombre,
        nombreCategoriaAnterior: categoria.nombreCategoriaAnterior || null,
        nombreCategoriaFederal: categoria.nombreCategoriaFederal,
        nombreCategoriaEstatal: categoria.nombreCategoriaEstatal,
      });
      setCategorias([...categorias, response.data]);
    } catch (error) {
      throw new Error('Error al agregar la categoría: ' + (error.response?.data?.message || error.message));
    }
  };

  const editCategoria = async (updatedCategoria) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/categoria/${updatedCategoria.id}`, {
        nombre: updatedCategoria.nombre,
        nombreCategoriaAnterior: updatedCategoria.nombreCategoriaAnterior || null,
        nombreCategoriaFederal: updatedCategoria.nombreCategoriaFederal,
        nombreCategoriaEstatal: updatedCategoria.nombreCategoriaEstatal,
      });
      setCategorias(
        categorias.map((cat) => (cat.id === updatedCategoria.id ? response.data : cat))
      );
    } catch (error) {
      throw new Error('Error al actualizar la categoría: ' + (error.response?.data?.message || error.message));
    }
  };

  const deleteCategoria = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await axios.delete(`${API_BASE_URL}/categoria/${id}`);
        setCategorias(categorias.filter((cat) => cat.id !== id));
      } catch (error) {
        alert('Error al eliminar la categoría: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const deactivateCategoria = async (id) => {
    if (window.confirm('¿Estás seguro de desactivar esta categoría?')) {
      try {
        await axios.patch(`${API_BASE_URL}/categoria/${id}/desactivar`);
        setCategorias(
          categorias.map((cat) => (cat.id === id ? { ...cat, activo: false } : cat))
        );
      } catch (error) {
        alert('Error al desactivar la categoría: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const addTipoRequisito = async (tipoRequisito) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tipo-requisito`, tipoRequisito);
      setTipoRequisitos([...tipoRequisitos, response.data]);
    } catch (error) {
      throw new Error('Error al agregar el tipo de requisito: ' + (error.response?.data?.message || error.message));
    }
  };

  const editTipoRequisito = async (updatedTipoRequisito) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tipo-requisito/${updatedTipoRequisito.id}`, { nombre: updatedTipoRequisito.nombre });
      setTipoRequisitos(
        tipoRequisitos.map((tipo) => (tipo.id === updatedTipoRequisito.id ? response.data : tipo))
      );
    } catch (error) {
      throw new Error('Error al actualizar el tipo de requisito: ' + (error.response?.data?.message || error.message));
    }
  };

  const deleteTipoRequisito = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este tipo de requisito?')) {
      try {
        await axios.delete(`${API_BASE_URL}/tipo-requisito/${id}`);
        setTipoRequisitos(tipoRequisitos.filter((tipo) => tipo.id !== id));
      } catch (error) {
        alert('Error al eliminar el tipo de requisito: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const deactivateTipoRequisito = async (id) => {
    if (window.confirm('¿Estás seguro de desactivar este tipo de requisito?')) {
      try {
        await axios.patch(`${API_BASE_URL}/tipo-requisito/${id}/desactivar`);
        setTipoRequisitos(
          tipoRequisitos.map((tipo) => (tipo.id === id ? { ...tipo, activo: false } : tipo))
        );
      } catch (error) {
        alert('Error al desactivar el tipo de requisito: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <div className="app-container">
      <Header
        setShowRequisitoForm={setShowRequisitoForm}
        setShowCategoriaForm={setShowCategoriaForm}
        setShowTipoRequisitoForm={setShowTipoRequisitoForm}
      />
      <Messages loading={loading} error={error} />
      {(showRequisitoForm || editingRequisito) && (
        <RequisitoForm
          addRequisito={addRequisito}
          editRequisito={editRequisito}
          editingRequisito={editingRequisito}
          setEditingRequisito={setEditingRequisito}
          setShowRequisitoForm={setShowRequisitoForm}
          categorias={categorias.filter(cat => cat.activo)}
          tipoRequisitos={tipoRequisitos.filter(tipo => tipo.activo)}
        />
      )}
      {(showCategoriaForm || editingCategoria) && (
        <CategoriaForm
          addCategoria={addCategoria}
          editCategoria={editCategoria}
          editingCategoria={editingCategoria}
          setEditingCategoria={setEditingCategoria}
          setShowCategoriaForm={setShowCategoriaForm}
          categorias={categorias.filter(cat => cat.activo)}
        />
      )}
      {(showTipoRequisitoForm || editingTipoRequisito) && (
        <TipoRequisitoForm
          addTipoRequisito={addTipoRequisito}
          editTipoRequisito={editTipoRequisito}
          editingTipoRequisito={editingTipoRequisito}
          setEditingTipoRequisito={setEditingTipoRequisito}
          setShowTipoRequisitoForm={setShowTipoRequisitoForm}
        />
      )}
      <h2>Requisitos</h2>
      <RequisitosTable
        requisitos={requisitos}
        categorias={categorias}
        tipoRequisitos={tipoRequisitos}
        setEditingRequisito={setEditingRequisito}
        setShowRequisitoForm={setShowRequisitoForm}
        deleteRequisito={deleteRequisito}
        deactivateRequisito={deactivateRequisito}
      />
      <h2>Categorías</h2>
      <CategoriasTable
        categorias={categorias}
        setEditingCategoria={setEditingCategoria}
        setShowCategoriaForm={setShowCategoriaForm}
        deleteCategoria={deleteCategoria}
        deactivateCategoria={deactivateCategoria}
      />
    </div>
  );
}

export default App;