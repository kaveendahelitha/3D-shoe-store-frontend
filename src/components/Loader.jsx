import React from 'react';


const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full border-b-2 border-blue-500 w-10 h-10"></div>
        </div>
    );
};

export default Loader;