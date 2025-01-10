// import logo from './logo.svg';
import {ShopPage} from './components/ShopPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage} from "./components/LoginPage";
import {SellPage} from "./components/SellPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ShopPage/>}/>
                <Route path={"/item/:id"} element={<ShopPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/sell" element={<SellPage/>}/>
                <Route path="/*" element={<h1>404 Not Found</h1>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
