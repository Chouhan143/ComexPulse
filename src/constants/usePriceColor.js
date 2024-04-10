import {useEffect, useState} from 'react';

const usePriceColor = initialPrice => {
  const [color, setColor] = useState(
    initialPrice.percent_chg < 1 ? 'red' : 'green',
  );
  const [prevPrice, setPrevPrice] = useState(initialPrice.price);

  useEffect(() => {
    // Check if the price has changed
    if (initialPrice.price !== prevPrice) {
      // Update color based on price change
      setColor(initialPrice.price > prevPrice ? 'green' : 'red');
      // Update the previous price
      setPrevPrice(initialPrice.price);
    }
  }, [initialPrice.price, prevPrice]);

  return color;
};

export default usePriceColor;
