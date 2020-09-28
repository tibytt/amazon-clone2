import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { useHistory } from 'react-router-dom';


function Subtotal() {
    const history = useHistory();
    const [{basket}, dispatch] = useStateValue();
      let sum = 0;
      basket.forEach(element => {
       sum = sum + element.price;
    });
   
    return (
        <div className="subtotal">
            <CurrencyFormat renderText={(value) =>
            (<>
            <p>
            Subtotal ({basket?.length} items): <strong>{sum}</strong> 
             {/* o sino getBasketTotal(basket) que es funcionalidad del reducer */}
            </p>
            <small className="subtotal__gift">
                <input type="checkbox"/> this order contains a gift
            </small>
            </>
            )} 
            decimalScale={2}
            value={sum}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            />
            {/* history push como link pero usamos esto para conservar los estilos del boton */}
            <button onClick={e => history.push('/payment')}>Proceed to checkout</button>
        </div>
    );
}

export default Subtotal;
