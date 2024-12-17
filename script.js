// Basit bir saat göstergesi
function showTime() {
    const clock = document.getElementById("clock");
    const now = new Date();
    clock.innerHTML = now.toLocaleTimeString();
}
setInterval(showTime, 1000);
// Eğer zaten bir kod varsa, yukarıdaki kısmı bırak ve şu yeni kodu ekle:

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
