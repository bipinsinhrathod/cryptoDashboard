import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  styled,
  Box,
} from "@material-ui/core";
import io from "socket.io-client";

const socket = io.connect("https://ws.coincap.io");

const useStyles = makeStyles((theme) => ({
  cryptoItem: {
    padding: theme.spacing(2),
    border: "1px solid #ccc",
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    transition: "all 0.5s ease",

    "&:hover": {
        boxShadow: theme.shadows[10],
    },
  },
  priceIncreased: {
    color: "green",
    fontWeight: "bold",
  },
  priceDecreased: {
    color: "red",
    fontWeight: "bold",
  },
}));

const CryptoName = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});


const Card = styled('div')({
    backgroundColor: "azure",
    color: "black"
})



const CryptoDashboard = () => {
  const classes = useStyles();
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch("https://api.coincap.io/v2/assets");
        const data = await response.json();
        setCryptos(data.data);
      } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
      }
    };

    fetchCryptos();

    const interval = setInterval(fetchCryptos, 100); // Refresh every 100 milliseconds

    // Subscribe to live updates for prices
    socket.on("trades", (tradeMsg) => {
      setCryptos((prevCryptos) =>
        prevCryptos.map((crypto) =>
          crypto.id === tradeMsg.base
            ? {
                ...crypto,
                priceUsd: parseFloat(tradeMsg.data.priceUsd).toFixed(2),
              }
            : crypto
        )
      );
    });

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Cryptocurrency Dashboard
      </Typography>
      <Grid container spacing={3}>
        {cryptos.map((crypto) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={crypto.id}>
            <Card className={classes.cryptoItem}>
              <CryptoName>
                <Typography variant="h5">{crypto.name}</Typography>
                <Typography>
                  <img src=""  width={20} alt="" />
                </Typography>
              </CryptoName>
              <Typography
                variant="subtitle1"
                className={
                  parseFloat(crypto.changePercent24Hr) >= 0
                    ? classes.priceIncreased
                    : classes.priceDecreased
                }
              >
                Price: ${Number(crypto.priceUsd).toFixed(2)}
              </Typography>
              <Typography
                variant="subtitle2"
                className={
                  parseFloat(crypto.changePercent24Hr) >= 0
                    ? classes.priceIncreased
                    : classes.priceDecreased
                }
              >
                {crypto.changePercent24Hr > 0 ? "+" : ""}
                {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CryptoDashboard;
