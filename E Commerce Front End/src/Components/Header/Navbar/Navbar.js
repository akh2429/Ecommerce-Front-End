import style from "./Navbar.module.css"
import { Link } from "react-router-dom";

function Navbar() {

    return (
        <nav className={style.navbar} >
            <div className={style.logo}><Link to="/" >Logo</Link></div>
            <div className={style.searchbox} >Search Bar</div>
            <div className={style.login} ><Link to={"/login"} >LOGIN</Link ></div>
            <div className={style.cart} >Cart</div>
        </nav>
    )
}

export default Navbar;