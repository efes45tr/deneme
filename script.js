// Basit bir saat göstergesi
function showTime() {
  const clock = document.getElementById("clock");
  const now = new Date();
  clock.innerHTML = now.toLocaleTimeString();
}
setInterval(showTime, 1000);

// Binance API'den BTC/USDT fiyatını çekme
fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
  .then(response => response.json())
  .then(data => {
    const price = data.price;
    document.getElementById("btcPrice").innerHTML = `BTC/USDT Fiyatı: $${price}`;
  })
  .catch(error => {
    console.error("Veri çekme hatası:", error);
  });

// Binance Futures API'den perp paritelerinin fiyatlarını çekme
setInterval(() => {
  fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://fapi.binance.com/fapi/v1/ticker/price'))
    .then(response => response.json())
    .then(data => {
      const pairs = JSON.parse(data.contents);
      let output = '';
      if (Array.isArray(pairs)) {
        pairs.forEach(pair => {
          if (pair.symbol.includes('USDT')) {
            output += `<p>${pair.symbol}: ${pair.price} USDT</p>`;
          }
        });
      }
      document.getElementById("priceList").innerHTML = output;
    })
    .catch(error => {
      console.error("Veri çekme hatası:", error);
    });
}, 5000); // 5 saniyede bir güncelleme
