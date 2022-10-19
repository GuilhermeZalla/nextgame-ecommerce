import { useRef, useState, useEffect } from "react";
import { IoGameControllerOutline, IoBagSharp } from "react-icons/io5";
import { MdOutlineShoppingCart, MdOutlineLogout, MdOutlineKeyboardBackspace } from "react-icons/md";
import { BiJoystickAlt } from "react-icons/bi";
import { HiOutlineArrowRight } from "react-icons/hi";
import { CartItem } from "./cartItem/cartItem";
import { Link } from "react-router-dom";

async function getUsername(email) {
    let response = await fetch(`http://localhost:3001/accounts/username/${email}`, {
        method: "GET",
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

async function getCart(email) {
    let response = await fetch(`http://localhost:3001/accounts/user_cart/${email}`, {
        method: "GET",
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

async function clearCart(email) {
    let response = await fetch(`http://localhost:3001/accounts/empty-cart/${email}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    let result = response.json();
    return result;
};

async function defineLogin(email) {
    let response = await fetch(`http://localhost:3001/accounts/${email}/${false}`, {
        method: "PATCH",
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

export const Header = ({ openBrowser }) => {
    const [cart, setCart] = useState([]);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState('');
    const [controller, setController] = useState(0);
    const [total, setTotal] = useState(0);
    let cartModal = useRef(null);
    let cartList = useRef(null);
    let cartHeader = useRef(null);
    let cartFooter = useRef(null);
    let list = useRef(null);
    let close = useRef(null);

    useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            setLogin(true);
            getUsername(localStorage.getItem('user')).then(res => setUser(res[0].username)).catch(err => console.error(`New Error: ${err}`));
            getCart(localStorage.getItem('user')).then(res => setCart(res)).catch(err => console.error(`New Error: ${err}`));
        } else {
            setLogin(false);
            setCart([]);
        }
    }, [controller]);

    const openCart = () => {
        if (login) {

            cartModal.current.style.display = 'flex';
            cartHeader.current.style.transitionDelay = '400ms';
            cartFooter.current.style.transitionDelay = '400ms';
            list.current.style.transitionDelay = '330ms';

            setTotal(cart.length * cart[0]?.price);

            setTimeout(() => {

                cartList.current.style.width = '400px';
                cartList.current.style.opacity = '1';
                cartHeader.current.style.opacity = '1';
                cartFooter.current.style.opacity = '1';
                list.current.style.paddingTop = '0';
                list.current.style.opacity = '1';
                close.current.style.left = '0';

            }, 100);
        } else {
            window.alert("You need to be logged to use your shopping cart.");
        }
    };

    const closeCart = () => {
        cartList.current.style.width = '0';
        cartList.current.style.opacity = '0';
        cartFooter.current.style.transitionDelay = '0ms';
        cartHeader.current.style.transitionDelay = '0ms';
        list.current.style.transitionDelay = '0ms';
        cartFooter.current.style.opacity = '0';
        cartHeader.current.style.opacity = '0';
        list.current.style.opacity = '0';
        list.current.style.paddingTop = '200px';
        close.current.style.left = '-40px';
        setTimeout(() => {
            cartModal.current.style.display = 'none';
        }, 500);
    };

    const handleClearCart = () => {
        clearCart(localStorage.getItem('user')).then(res => console.log("Cart is now empty.")).catch(err => console.log(`New Error: ${err}`));
        setController(1);
        setTotal(0);
    };

    const handleLogout = () => {
        defineLogin(localStorage.getItem('user')).then(res => console.log("User logout.")).catch(err => console.error(`New Error: ${err}`));
        localStorage.removeItem('user');
        setController(1);
    };

    return (
        <header className="header">
            <nav className="header__navbar">
                <ul className="header__list">
                    <li className="header__item"><IoGameControllerOutline /> Next Game</li>
                    <li className="header__item"><button type="button" name='browse' onClick={openBrowser}><MdOutlineShoppingCart /> Browse Store</button></li>
                </ul>
                <ul className="header__list">
                    {
                        login === false ? <li className="header__item"><Link to={'/validation'}><BiJoystickAlt /> click to login</Link></li>
                            :
                            <li className="header__item dropdown"><BiJoystickAlt /> {user}
                                <div className="dropdown-menu">
                                    <ul className="dropdown__list">
                                        <li className="dropdown__item"><button type="button" onClick={handleLogout}><MdOutlineLogout /> Logout</button></li>
                                    </ul>
                                </div>
                            </li>
                    }
                    <li className="header__item"><button type="button" name='cart' onClick={openCart}><IoBagSharp /> Cart: {cart.length}</button></li>
                </ul>
                <div className="modal" ref={cartModal}>
                    <span onClick={closeCart} ><button type="button" ref={close}><MdOutlineKeyboardBackspace /></button>exit</span>
                    <div className="modal__container" ref={cartList}>
                        <header className="modal__header" ref={cartHeader}><h2>games</h2><button type="button" onClick={handleClearCart}>Clear</button></header>
                        <ul className="modal__list" ref={list}>
                            {
                                cart.map((item, index) => <CartItem key={index} name={item.name} price={item.price} />)
                            }
                        </ul>
                        <footer className="modal__footer" ref={cartFooter}>
                            <span><h3>Total: ${isNaN(total) ? 0 : total}</h3> <button type="button">Checkout <HiOutlineArrowRight /></button></span>
                        </footer>
                    </div>
                </div>
            </nav>
        </header>
    );
};