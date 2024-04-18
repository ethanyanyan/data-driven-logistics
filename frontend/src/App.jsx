import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import DataDrivenLogisticsRouter from './routes/DataDrivenLogisticsRouter';

function App() {
    return (
        <div>
            <DataDrivenLogisticsRouter />
            <ToastContainer 
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
