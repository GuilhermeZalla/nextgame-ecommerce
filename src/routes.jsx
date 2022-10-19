<<<<<<< HEAD
import { Routes, Route, HashRouter } from "react-router-dom";
import { HomeScreen } from "./screens/homeScreen";
import { AboutScreen } from "./screens/aboutScreen";
import { ContactScreen } from "./screens/contactScreen";
import { PortfolioScreen } from "./screens/portfolioScreen";

export const LayoutScreens = () => {
    return (
        <HashRouter>
            <Routes>
                <Route exact path={'/'} element={<HomeScreen />} />
                <Route exact path={'/about'} element={<AboutScreen />} />
                <Route exact path={'/contact'} element={<ContactScreen />} />
                <Route exact path={'/portfolio/:section'} element={<PortfolioScreen />} />
            </Routes>
        </HashRouter>
    )
=======
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
>>>>>>> 50ff871da34c8c9698caf8060128bf277db8fdfa
};