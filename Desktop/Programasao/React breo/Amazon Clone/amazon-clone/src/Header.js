import React from 'react';
import "./Header.css";


//Material Icons
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';

import { useStateValue } from './StateProvider';
import { auth } from './firebase';



function Header() {
    
    const [{basket, user}, dispatch] = useStateValue();
    const handleAuthentication = function(){
        if (user){
            
            auth.signOut();
        }
    }
    return (
        <div className="header">
            <Link to="/">  <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" className="header__logo"/></Link>
           
            <div className="header__search">
                <input className="header__searchInput b" type="text" />
                <SearchIcon className="header__searchIcon"/>
                {/* logo  */}
            </div>
            <div className="header__nav">
                <Link to={!user && "/login"}>
                <div onClick={handleAuthentication} className="header__option">
                    <span className="header__optionLineOne">
                       {user? "Hello " + user.email : "Hello Guest"}
                    </span>
                    <span className="header__optionLinetwo">
                        {user? "Sign Out" : "Sign in"}
                    </span>
                </div>
                </Link>
                <div className="header__option">
                <span className="header__optionLineOne">
                        Returns
                    </span>
                    <span className="header__optionLinetwo">
                        & Orders
                    </span>
                </div>
                <div className="header__option">
                <span className="header__optionLineOne">
                        Your
                    </span>
                    <span className="header__optionLinetwo">
                        Prime
                    </span>
                </div>
                <Link to="/checkout">
                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
    <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                </div>
                </Link>
            </div>
        </div>
    );
}

export default Header;
