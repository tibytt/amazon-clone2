import React from 'react';
import "./Home.css";
import Product from './Product';

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" ></img>
            </div>

            <div className="home__row">
               <Product title="televisor" price={29.99} image="https://unitystores.vteximg.com.br/arquivos/ids/161512-1000-1000/televisor-lg-5-5-uhd-4-k-0.jpg?v=637232791761600000" rating={5}/>
               <Product title="televisor" price={29.99} image="https://unitystores.vteximg.com.br/arquivos/ids/161512-1000-1000/televisor-lg-5-5-uhd-4-k-0.jpg?v=637232791761600000" rating={5}/>
               
            </div>
            <div className="home__row">
            <Product title="televisor" price={29.99} image="https://unitystores.vteximg.com.br/arquivos/ids/161512-1000-1000/televisor-lg-5-5-uhd-4-k-0.jpg?v=637232791761600000" rating={5}/>
            <Product title="televisor" price={29.99} image="https://unitystores.vteximg.com.br/arquivos/ids/161512-1000-1000/televisor-lg-5-5-uhd-4-k-0.jpg?v=637232791761600000" rating={5}/>
            <Product title="televisor" price={29.99} image="https://unitystores.vteximg.com.br/arquivos/ids/161512-1000-1000/televisor-lg-5-5-uhd-4-k-0.jpg?v=637232791761600000" rating={5}/>
            </div>
            <div className="home__row">
            <Product title="televisor" price={29.99} image="https://unitystores.vteximg.com.br/arquivos/ids/161512-1000-1000/televisor-lg-5-5-uhd-4-k-0.jpg?v=637232791761600000" rating={5}/>
            </div>
        </div>
    );
}

export default Home;
