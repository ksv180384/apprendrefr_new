import { Route, Routes } from 'react-router-dom';
import Index from '@/views/index/index.jsx';


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Index />} />
            </Routes>
        </>
    )
}

export default App;
