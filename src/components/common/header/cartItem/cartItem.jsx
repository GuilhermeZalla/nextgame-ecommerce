import { IoIosClose } from "react-icons/io";

async function removeItem(email, name) {
    let response = await fetch(`http://localhost:3001/accounts/cart-remove/${email}/${name}`, {
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

export const CartItem = (props) => {

    const removeCartItem = () => removeItem(localStorage.getItem('user'), props.name).then(res => props.handleController(1)).catch(err => console.error(`New Error: ${err}`));

    return (
        <li className="modal__item">{props.name}<span>${props.price}<button type="button" onClick={removeCartItem}><IoIosClose /></button></span></li>
    );
};