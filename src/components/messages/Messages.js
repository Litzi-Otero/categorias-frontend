import React from 'react';

function Messages({ loading, error }) {
  return (
    <>
      {loading && <p className="loading-message">Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
    </>
  );
}

export default Messages;