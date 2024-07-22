import React, { useContext } from 'react';
import AppContext from './AppContext';  

const CreateNote = () => {
    const { setModal } = useContext(AppContext);

    return (
        <div className="create-note"> 
        </div>
    );
};

export default CreateNote;








