import Navigation from '@/components/header/navigation/Navigation.jsx';
import Search from '@/components/header/search/Search.jsx';
import Authentification from '@/components/authentification/Authentification.jsx';

import menu from '@/config/menu.js';

import '@/components/header/Header.css';

function Header() {
    return (
        <>
            <header>
                <div className="header-content-block">
                    <div className="navigation">
                        <Navigation menu={ menu }/>
                    </div>
                    <div className="search-block">
                        <Search/>
                        <Authentification/>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
