import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ResidentInfo = ({ location }) => {
    const[residentInfo, setResidentInfo] = useState({});
    
    useEffect(()=> {
    axios.get(location)
        .then(res => setResidentInfo(res.data))
    }, [location])

    console.log(residentInfo)
    return (
        <div className='col-6 col-md-4 card-df'>
            <p>{residentInfo.status == "Alive" ? <div className='green'>Vivo</div> : residentInfo.status == "Dead" ? <div className='red'>Muerto</div> : <div className='sub-text'>No info</div>}</p>
            <img src={residentInfo.image} alt="" />
            <h3>{residentInfo.name}</h3>
            <h5><div className='sub-text'>Type</div>{residentInfo.species}</h5>
            <h5><div className='sub-text'>Origin</div>{residentInfo.origin?.name}</h5>
            <h5><div className='sub-text'>Episodes where appear</div>{residentInfo.episode?.length}</h5>
        </div>
        //no me actualiza, siempre salen los mismos personajes, probable error en use effect.
    );
};

export default ResidentInfo;