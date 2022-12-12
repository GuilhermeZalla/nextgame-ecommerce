import { MdOutlineKeyboardBackspace, MdOutlineReviews, MdSportsFootball, MdOutlineTableRows, MdLogin } from "react-icons/md";
import { CgGift, CgBrowser } from "react-icons/cg";
import { FaStar, FaMountain, FaFlagCheckered, FaLinkedinIn } from "react-icons/fa";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { GiChessKnight, GiPistolGun, GiBoxingGlove } from "react-icons/gi";
import { GrTechnology } from "react-icons/gr";
import { BsGrid3X2, BsGithub, BsTelegram } from "react-icons/bs";
import { RiOpenSourceLine } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { TbSwords } from "react-icons/tb";
import { Header } from "../common/header/header";
import { Product } from "./product/product";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

async function getData() {
    let response = await fetch('https://api.rawg.io/api/games?key=86ec135292fc49ef82a058bfd5494729', { method: 'GET' });
    let result = response.json();
    return result;
};

export const Home = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('none');
    let browser = useRef(null);
    let browserNav = useRef(null);
    let browserTitle = useRef(null);
    let browserSubTitle = useRef(null);
    let browserClose = useRef(null);
    let aside = useRef(null);
    let catalog = useRef(null);
    let fullGrid = useRef(null);
    let halfGrid = useRef(null);
    let { destination } = useParams();

    useEffect(() => {
        getData().then(data => {
            setData(data.results);
            if (destination === 'home') {
                openBrowser();
            };
        }).catch(err => console.error(err));
    }, [destination]);

    const openBrowser = () => {
        browserClose.current.style.left = '10px';
        browser.current.style.width = '100%';
        aside.current.classList.add('aside-fade');
        catalog.current.style.opacity = '1';
        catalog.current.style.paddingTop = '15px';
        catalog.current.style.transitionDuration = '1s';
        catalog.current.style.transitionDelay = '500ms';
        browserNav.current.style.opacity = '1';
        browserNav.current.style.transitionDelay = '1s';
        browserTitle.current.style.opacity = '1';
        browserTitle.current.style.transitionDelay = '700ms';
        browserSubTitle.current.style.opacity = '1';
        browserSubTitle.current.style.transitionDelay = '700ms';
    };

    const closeBrowser = () => {
        browserClose.current.style.left = '-50px';
        browser.current.style.width = '0';
        aside.current.classList.remove('aside-fade');
        catalog.current.style.opacity = '0';
        catalog.current.style.paddingTop = '500px';
        catalog.current.style.transitionDuration = '300ms';
        catalog.current.style.transitionDelay = '0ms';
        browserNav.current.style.opacity = '0';
        browserNav.current.style.transitionDelay = '0ms';
        browserTitle.current.style.opacity = '0';
        browserTitle.current.style.transitionDelay = '0ms';
        browserSubTitle.current.style.opacity = '0';
        browserSubTitle.current.style.transitionDelay = '0ms';
        setFilter('none');
    };

    const handleFullGrid = () => {
        catalog.current.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
        catalog.current.style.justifyContent = 'initial';
        fullGrid.current.style.opacity = '1';
        halfGrid.current.style.opacity = '.5';
    };

    const handleHalfGrid = () => {
        catalog.current.style.gridTemplateColumns = 'repeat(1, minmax(150px, 250px))';
        catalog.current.style.justifyContent = 'center';
        fullGrid.current.style.opacity = '.5';
        halfGrid.current.style.opacity = '1';
    };

    const handleFilter = e => setFilter(e.target.name);

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
            <Header openBrowser={openBrowser} />
            <main className="home">
                <figure><img src={data.length === 0 ? null : data[17].background_image} alt={data.name} /></figure>
                <div className="home__container">
                    <article className="home__article">
                        <h1 className="home__title">Next Game</h1>
                        <p className="home__paragraph">The best destination to buy new games to competitive prices. 24 hours support, "best price" guarantee and a flawless UX. Wish for more? Tell us below - or check out our careers.</p>
                    </article>
                    <span className="home__span">
                        <button type="button" onClick={openBrowser}><MdLogin /> Browse</button>
                        <a href="https://guilhermezalla.github.io/" target={'_blank'} rel="noreferrer"><CgBrowser /> Portfolio</a>
                        <a href="https://github.com/GuilhermeZalla" target={'_blank'} rel="noreferrer" hrefLang="en-us"><BsGithub /> Github</a>
                        <a href="https://www.linkedin.com/in/guilhermezalla/" target={'_blank'} rel="noreferrer" hrefLang="en-us"><FaLinkedinIn /> LinkedIn</a>
                    </span>
                </div>
                <article className="home__article">
                    <h2 className="home__subtitle">Quick Navigation</h2>
                    <ul className="home__list">
                        <li className="home__item"><AiFillHome /> Home</li>
                        <li className="home__item">About Us</li>
                        <li className="home__item"><BsTelegram /> Contact</li>
                        <li className="home__item" onClick={openBrowser}><MdLogin /> Browse</li>
                        <li className="home__item"><GrTechnology /> Technologies</li>
                        <li className="home__item"><RiOpenSourceLine /> Our Sources</li>
                    </ul>
                </article>
            </main>
            <div className="browser__container" ref={browser}>
                <section className="browser">
                    <button type="button" onClick={closeBrowser} ref={browserClose}><MdOutlineKeyboardBackspace /></button>
                    <aside className="browser__aside" ref={aside}>
                        <dl className="browser__list">
                            <dt className="browser__list-title">Filters</dt>
                            <dd className="browser__item">
                                <button type="button" name='wishlist' onClick={handleFilter}><CgGift /> Wishlist</button>
                            </dd>
                            <dd className="browser__item">
                                <button type="button" name='ratings' onClick={handleFilter}><FaStar /> Ratings</button>
                            </dd>
                            <dd className="browser__item">
                                <button type="button" name='reviews' onClick={handleFilter}><MdOutlineReviews /> Reviews</button>
                            </dd>
                        </dl>
                        <dl className="browser__list">
                            <dt className="browser__list-title">Genres</dt>
                            <dd className="browser__item">
                                <button type="button" name='action' onClick={handleFilter}><GiBoxingGlove /> Action</button>
                            </dd>
                            <dd className="browser__item">
                                <button type="button" name='strategy' onClick={handleFilter}><GiChessKnight /> Strategy</button>
                            </dd>
                            <dd className="browser__item">
                                <button type="button" name='role-playing-games-rpg' onClick={handleFilter}><TbSwords /> RPG</button>
                            </dd>
                            <dd className="browser__item">
                                <button type="button" name='shooter' onClick={handleFilter}><GiPistolGun /> Shooter</button>
                            </dd>
                            <dd className="browser__item">
                                <button type="button" name='adventure' onClick={handleFilter}><FaMountain /> Adventure</button>
                            </dd>
                            <dd className="browser__item">
                                <button type="button" name='puzzle' onClick={handleFilter}><IoExtensionPuzzleSharp /> Puzzle</button>
                            </dd>
                            <dd className="browser__item">
                                <button type="button" name='racing' onClick={handleFilter}><FaFlagCheckered /> Racing</button>
                            </dd>
                            <dd className="browser__item">
                                <button type="button" name='sports' onClick={handleFilter}><MdSportsFootball /> Sports</button>
                            </dd>
                        </dl>
                    </aside>
                    <div className="browser__div">
                        <h1 className="browser__title" ref={browserTitle}>Trending and interesting</h1>
                        <h2 className="browser__subtitle" ref={browserSubTitle}>Based on player counts and ratings</h2>
                        <div className="browser__nav" ref={browserNav}>
                            <div>
                                <span>Filter by:<strong>{filter === 'role-playing-games-rpg' ? 'rpg' : filter}</strong></span>
                                <button type="button" onClick={() => setFilter('none')}>Clear Filter</button>
                            </div>
                            <span>Display options: <button type="button" onClick={handleFullGrid} ref={fullGrid}><BsGrid3X2 /></button><button type="button" onClick={handleHalfGrid} ref={halfGrid}><MdOutlineTableRows /></button></span>
                        </div>
                        {
                            filter === 'none' ?
                                <div className="browser__catalog" ref={catalog}>
                                    {
                                        data?.map(game => <Product key={game.id} id={game.id} name={game.name} image={game.background_image} />)
                                    }
                                </div>
                                :
                                <div className="browser__catalog" ref={catalog}>
                                    {
                                        data?.map(game => game.genres.map(genre => genre.slug === filter ? <Product key={game.id} id={game.id} name={game.name} image={game.background_image} /> : null))
                                    }
                                </div>
                        }
                    </div>
                </section>
            </div>
        </>
    );
};