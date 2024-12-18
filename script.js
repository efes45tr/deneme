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

// Binance API üzerinden veri çekme (CORS Proxy kullanarak)
const proxyUrl = 'https://api.allorigins.win/get?url=';
const binanceUrl = 'https://fapi.binance.com/fapi/v1/ticker/price';

// Futures fiyatlarını çekme fonksiyonu
function fetchBinanceData() {
  fetch(proxyUrl + encodeURIComponent(binanceUrl))
    .then(response => {
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return response.json(); // Proxy'den gelen veriyi JSON formatında alıyoruz
    })
    .then(data => {
      let pairs;
      try {
        pairs = JSON.parse(data.contents); // Proxy'den gelen içeriği parse et
      } catch (e) {
        console.error("JSON Parse Hatası:", e);
        return;
      }

      // Veriyi kontrol edip HTML'e yazdırma
      let output = '';
      if (Array.isArray(pairs)) {
        pairs.forEach(pair => {
          if (pair.symbol.includes('USDT')) {
            output += `<p>${pair.symbol}: ${pair.price} USDT</p>`;
          }
        });
      } else {
        console.error("Beklenmeyen veri formatı:", pairs);
      }

      document.getElementById("priceList").innerHTML = output;
    })
    .catch(error => {
      console.error("Veri çekme hatası:", error);
    });
}

// 5 saniyede bir veri çekme
setInterval(fetchBinanceData, 5000);
