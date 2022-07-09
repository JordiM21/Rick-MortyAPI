import React from 'react';

const Location = ({location}) => {
    return (
        <div className='row w-50 mx-auto location-card'>
            <p className='col-3 centrado'><strong>Name:</strong> {location.name}</p>
            <p className='col-3 centrado'><strong>Type:</strong> {location.type}</p>
            <p className='col-3 centrado'><strong>Dimension:</strong> {location.dimension}</p>
            <p className='col-3 centrado'><strong>Population:</strong> {location.residents?.length}</p>
        </div>
    );
};

export default Location;