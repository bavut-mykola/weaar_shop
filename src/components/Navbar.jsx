import { useState } from 'react'

import searchIcon from '../assets/icons/search.svg'
import cartIcon from '../assets/icons/cart.svg'
import phoneIcon from '../assets/icons/phone.svg'
import userIcon from '../assets/icons/user.svg'
import { use } from 'react'
import '../styles/navbar.scss';

function Navbar() {
    const [isBurgerClicked, setISBurgerClicked] = useState(false)
    return (
        <header className="head">
            <div className="logo-box">
                <div className={`burger-btn ${isBurgerClicked ? 'active' : ''}`}
                onClick={() => {
                    setISBurgerClicked(!isBurgerClicked)
                }}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <h2 className="logo">
                    WEA.R
                </h2>
            </div>

            <nav className={`navigation ${isBurgerClicked ? 'opened' : ''}`}>
                    <ul className="nav-links">
                        <a href="" className="nav-link">Catalog</a>
                        <a href="" className="nav-link">SpotLight</a>
                    </ul>

                    <div className="search-box">
                        <div className="search-title">
                            <h3>
                                LOOKING FOR SOMETHING
                            </h3>
                        </div>
                        <div className="search">
                            <img src={searchIcon} alt="search" className='search-icon' />
                            <input type="text" className="search-input" />
                        </div>
                    </div>
                </nav>    

                <div className="header-buttons-box">
                    <img src={cartIcon} alt="" className="head-btn" />
                    <img src={userIcon} alt="" className="head-btn" />
                    <img src={phoneIcon} alt="" className="head-btn" />
                </div>
        </header>
    )
}

export default Navbar