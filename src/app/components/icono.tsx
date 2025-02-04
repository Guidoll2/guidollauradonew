import React from 'react';

const Favico = () => {
  return (
    <div>
      {/* Ruta de acceso al favicon.ico en la carpeta `public` */}
      <link rel="icon" href="/favicon.ico" />
      {/* O, si estás usando una etiqueta `img` */}
      {/* <img src="/favicon.ico" alt="Favicon" /> */}
    </div>
  );
};

export default Favico;