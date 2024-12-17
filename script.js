// Basit bir saat göstergesi
function showTime() {
    const clock = document.getElementById("clock");
    const now = new Date();
    clock.innerHTML = now.toLocaleTimeString();
}
setInterval(showTime, 1000);
// Eğer zaten bir kod varsa, yukarıdaki kısmı bırak ve şu yeni kodu ekle:

// Binance API'den BTC/USDT fiyatını çekme
const apiKey = 'S9wZMDya8UDMg6WztpwCIycR0uR1r0ZCkDNql283qqVyrerBXcV8jgVCoy3yighY';  // Binance API anahtarını buraya yaz

fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT', {
  method: 'GET',
  headers: {
    'X-MBX-APIKEY': apiKey  // API anahtarını header olarak gönderiyoruz
  }
})
  .then(response => response.json())  // JSON formatında veriyi alıyoruz
  .then(data => {
    const price = data.price;  // Fiyatı alıyoruz
    document.getElementById("btcPrice").innerHTML = `BTC/USDT Fiyatı: $${price}`;
  })
  .catch(error => {
    console.error("Veri çekme hatası:", error);  // Eğer bir hata olursa, konsola yazdırıyoruz
  });
