import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeScreen } from "./screens/homeScreen";
import { ProductOverviewScreen } from "./screens/productOverviewScreen";
import { ValidationScreen } from "./screens/validationScreen";

export const LayoutScreens = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomeScreen />} />
                <Route exact path="/:destination" element={<HomeScreen />} />
                <Route exact path="/product/:id" element={<ProductOverviewScreen />} />
                <Route exact path="/validation" element={<ValidationScreen />} />
            </Routes>
        </BrowserRouter>
    );
};