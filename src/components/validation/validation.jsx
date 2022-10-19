import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "./loginForm/loginForm";
import { RegisterForm } from "./registerForm/registerForm";
import { BsArrowLeftSquare } from "react-icons/bs";

async function getData() {
    let response = await fetch('https://api.rawg.io/api/games?key=86ec135292fc49ef82a058bfd5494729', { method: 'GET' });
    let result = response.json();
    return result;
};

export const Validation = () => {
    const [cover, setCover] = useState([]);
    const [random, setRandom] = useState(0);
    const [form, setForm] = useState('signin');

    useEffect(() => {
        getData().then(data => {
            setCover(data.results);
            setRandom((Math.random() * (19 - 0) + 0).toFixed(0));
        }).catch(err => console.error(err));
    }, []);

    const handleFormType = e => setForm(e.target.id);

    while (cover.length === 0) {
        return (
            <main className="main__loader">
                <div className="loader"></div>
                <h1>Loading great things</h1>
            </main>
        );
    };

    return (
        <main className="validation">
            <Link to={'/'} className="back"><BsArrowLeftSquare /></Link>
            <figure>
                <img src={cover[random].background_image} alt={cover[random].name} />
                <figcaption>
                    <h1>Next Game</h1>
                    <span>The best destination to buy new games to competitive prices</span>
                </figcaption>
            </figure>
            {
                form === 'signin' ? <LoginForm handleFormType={handleFormType} /> : <RegisterForm handleFormType={handleFormType} />
            }
        </main>
    );
};