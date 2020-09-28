import React, { useEffect, useState } from 'react';
import "./Payment.css";
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom';
import { CardElement ,useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import Axios from 'axios';

import { useHistory } from 'react-router-dom';

function Payment() {
  const history = useHistory();
    const [{basket, user}, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [clientSecret, setClientSecret] = useState(true);
    //cuando el basket cambia hace post de el precio
    useEffect(() => {
      //generate the stripe secret que deja cobrar al costumer
      const getClientSecret = async () => {
        const response = await Axios({
          method: 'post',
          url: `/payments/create?total=${sum * 100}`  });
          setClientSecret(response.data.clientSecret);
      }
      
      getClientSecret();
    }, [basket])


    const handleSubmit = async (e) => {
          e.preventDefault();
          setProcessing(true);
           const payload = await stripe.confirmCardPayment(clientSecret, {
             payment_method:{
             card: elements.getElement(CardElement)
           }
          }).then(({paymentIntent}) =>{ 
            //payment confirmation
            setSucceded(true);
            setError(null);
            setProcessing(false);
            history.replace("/orders");
          })
    };

    const handleChange = (e) => {
          setDisabled(e.empty);
          setError(e.error ? e.error.message : "");
    };

    let sum = 0;
    basket.forEach(element => {
     sum = sum + element.price;
  });
    return (
      <div className="payment">
        <div className="payment__container">
          <h1>
            Checkout (<Link to="/checkout">{basket?.length} items</Link>)
          </h1>
          {/* section delivery address */}
          <div className="payment__section">
            <div className="payment__title">
              <h3>delivery address</h3>
            </div>
            <div className="payment__address">
              <p>{user?.email}</p>
              <p>123 Dirección</p>
              <p>Rosario, AR</p>
            </div>
          </div>

          {/* section review */}
          <div className="payment__section">
            <div className="payment__title">
              <h3>Review items and delivery</h3>
            </div>
            <div className="payment__items">
              {/* llamada a cada producto mapeando */}
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>
          {/* section payment */}
          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => (
                        <h3>Order Total {value}</h3>           
                    )}
                    decimalScale={2}
                    value={sum}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                   <button disabled={processing || disabled || succeeded}><span>{processing? <p>Processing</p>:
                    "Buy Now"
                    }</span></button>
                    
                </div>
                {/* Errors */}
                  {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Payment;
