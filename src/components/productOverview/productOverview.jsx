import { Header } from "../common/header/header";
import { Link, useParams } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

let options = document.getElementsByName('option');

async function getData(id) {
    let response = await fetch(`https://api.rawg.io/api/games/${id}?key=86ec135292fc49ef82a058bfd5494729`, { method: 'GET' });
    let result = response.json();
    return result;
};

async function getImages() {
    let response = await fetch(`https://api.rawg.io/api/games?key=86ec135292fc49ef82a058bfd5494729`, { method: 'GET' });
    let result = response.json();
    return result;
};

async function addNewProduct(email, id, name, price) {
    let response = await fetch(`http://localhost:3001/accounts/cart/${email}/${id}/${name}/${price}`, {
        method: "POST",
        mode: "cors",
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let result = response.json();
    return result;
};

async function addNewWishlistItem(email, id, name, price) {
    let response = await fetch(`http://localhost:3001/accounts/wishlist/${email}/${id}/${name}/${price}`, {
        method: "POST",
        mode: "cors",
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let result = response.json();
    return result;
};

async function removeWishlistItem(email, name) {
    let response = await fetch(`http://localhost:3001/accounts/remove-item/${email}/${name}`, {
        method: "DELETE",
        mode: "cors",
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let result = response.json();
    return result;
};

export const ProductOverview = () => {
    const [data, setData] = useState([]);
    const [images, setImages] = useState([]);
    const [option, setOption] = useState(1);
    const [heart, setHeart] = useState(<AiOutlineHeart />);
    let { id } = useParams();
    let description = useRef(null);
    let more = useRef(null);
    let less = useRef(null);

    useEffect(() => {
        getData(Number(id)).then(data => setData(data)).catch(err => console.error(err));
        getImages().then(images => {
            for (let i = 0; i < images.results.length; ++i) {
                if (images.results[i].id === Number(id)) {
                    setImages(images.results[i].short_screenshots);
                };
            };
        }).catch(err => console.error(err));
    }, [id]);

    const showMoreDetails = () => {
        description.current.style.height = '360px';
        more.current.style.display = 'none';
        less.current.style.display = 'flex';
    };

    const hideDetails = () => {
        description.current.style.height = '200px';
        more.current.style.display = 'flex';
        less.current.style.display = 'none';
    };

    const handleOption = e => {
        setOption(e.target.value);
        e.target.style.backgroundColor = '#20ffe1';
        for(let i = 0; i < options.length; ++i){
            if(options[i] !== e.target){
                options[i].style.backgroundColor = '#808080';
            }
        }
    };

    const addToCart = () => {
        addNewProduct(localStorage.getItem('user'), data?.id, data?.name, 59).then(res => console.log(`Item added to cart.`)).catch(err => console.error(err));
    };

    const addToWishlist = () => {
        if (localStorage.getItem('user') !== null) {
            if (heart.type.name === 'AiOutlineHeart' || heart.type.name === '') {
                addNewWishlistItem(localStorage.getItem('user'), data?.id, data?.name, 59).then(res => console.log("Item added to wishlist.")).catch(err => console.error(err));
                setHeart(<AiFillHeart className="wishlisted" />);
            } else {
                setHeart(<AiOutlineHeart />);
                removeWishlistItem(localStorage.getItem('user'), data?.name).then(() => console.log('Item removed from wishlist.')).catch(err => console.error(err));
            }
        } else {
            window.alert("You need to be logged to add a item to wishlist.");
        }
    };

    while (images.length === 0) {
        return (
            <main className="main__loader">
                <div className="loader"></div>
                <h1>Loading great things</h1>
            </main>
        );
    };

    return (
        <>
            <Header />
            <main className="main__product">
                <span><Link to={`/${'home'}`}><FaArrowLeft /> Store</Link> <h1 className="main__title">{data?.name}</h1></span>
                <div className="main__container">
                    <div className="main__slider">
                        <figure><img src={images[option]?.image} alt={data?.name} /></figure>
                        <span>
                            <button type="button" name='option' value={1} onClick={handleOption}></button>
                            <button type="button" name='option' value={2} onClick={handleOption}></button>
                            <button type="button" name='option' value={3} onClick={handleOption}></button>
                            <button type="button" name='option' value={4} onClick={handleOption}></button>
                        </span>
                    </div>
                    <div>
                        <article className="main__article">
                            <h2 className="main__subtitle">About</h2>
                            <p className="main__paragraph" ref={description}>{data?.description_raw}</p>
                            <footer className="main__article-footer">
                                <button type="button" onClick={showMoreDetails} ref={more}>More <MdOutlineKeyboardArrowDown /></button>
                                <button type="button" className="less" onClick={hideDetails} ref={less}>Less <MdOutlineKeyboardArrowUp /></button>
                            </footer>
                        </article>
                        <div>
                            <span>$59 &nbsp;&nbsp;<button type="button" onClick={addToWishlist}>{heart}</button></span>
                            <button type="button" name='add' onClick={addToCart}>Add</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};