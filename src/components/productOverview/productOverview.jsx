import { Header } from "../common/header/header";
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

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

export const ProductOverview = () => {
    const [data, setData] = useState([]);
    const [images, setImages] = useState([]);
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

    while (data.length === 0) {
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
                        <figure><img src={images[0]?.image} alt={data?.name} /></figure>
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
                            <span>$41.99 &nbsp;&nbsp;<button type="button"><FaHeart /></button></span>
                            <span>Add</span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};