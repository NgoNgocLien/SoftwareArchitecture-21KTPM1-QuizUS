import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
