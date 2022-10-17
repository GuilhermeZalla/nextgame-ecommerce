import { HiPlus } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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

async function getWishlist(email) {
    let response = await fetch(`http://localhost:3001/wishlists/user_wishlist/${email}`, {
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

export const Product = (props) => {
    const [heart, setHeart] = useState(<AiOutlineHeart />);

    useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            getWishlist(localStorage.getItem('user')).then(wishlist => {
                for (let i = 0; i < wishlist.length; ++i) {
                    if (wishlist[i].name === props.name) {
                        setHeart(<AiFillHeart className="wishlisted" />);
                    };
                };
            }).catch(err => console.error(err));
        }
    }, [props.name]);

    const addToCart = () => {
        addNewProduct(localStorage.getItem('user'), props.id, props.name, 59).then(res => console.log(`Item added to cart.`)).catch(err => console.error(err));
    };

    const addToWishlist = () => {
        if (localStorage.getItem('user') !== null) {
            if (heart.type.name === 'AiOutlineHeart' || heart.type.name === '') {
                addNewWishlistItem(localStorage.getItem('user'), props.id, props.name, 59).then(res => console.log("Item added to wishlist.")).catch(err => console.error(err));
                setHeart(<AiFillHeart className="wishlisted" />);
            } else {
                setHeart(<AiOutlineHeart />);
                removeWishlistItem(localStorage.getItem('user'), props.name).then(() => console.log('Item removed from wishlist.')).catch(err => console.error(err));
            }
        } else {
            window.alert("You need to be logged to add a item to wishlist.");
        }
    };

    return (
        <article className="browser__article">
            <header className="browser__header">
                <Link to={`/product/${props.id}`}>
                    <figure><img src={props.image} alt={props.name} /></figure>
                </Link>
            </header>
            <div className="browser__body">
                <span><button type="button" name='addCart' onClick={addToCart}>Add to cart <HiPlus /></button> $59</span>
                <h3>{props.name}</h3>
                <button type="button" name='favorite' onClick={addToWishlist}>{heart}</button>
            </div>
        </article>
    );
};