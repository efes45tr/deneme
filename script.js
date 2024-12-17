// Basit bir saat göstergesi
function showTime() {
    const clock = document.getElementById("clock");
    const now = new Date();
    clock.innerHTML = now.toLocaleTimeString();
}
setInterval(showTime, 1000);

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

// Binance Futures API'den perp paritelerinin fiyatlarını çekme (CORS proxy ile)
fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://fapi.binance.com/fapi/v1/ticker/price'))
  .then(response => response.json())  // Veriyi JSON formatında alıyoruz
  .then(data => {
    let output = '';
    
    // CORS proxy'den gelen veri
    const pairs = JSON.parse(data.contents); // CORS proxy'den gelen veri
    pairs.forEach(pair => {
      if (pair.symbol.includes('USDT')) {  // Perp pariteleri genellikle USDT ile sonlanır
        output += `<p>${pair.symbol}: ${pair.price} USDT</p>`;
      }
    });
    
    // Fiyatları sayfada göstermek
    document.getElementById("priceList").innerHTML = output;
  })
  .catch(error => {
    console.error("Veri çekme hatası:", error);
  });
// Binance Futures API'den perp paritelerinin fiyatlarını çekme (CORS proxy ile)
fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://fapi.binance.com/fapi/v1/ticker/price'))
  .then(response => response.json())  // Veriyi JSON formatında alıyoruz
  .then(data => {
    console.log(data);  // CORS proxy'den gelen yanıtı kontrol edelim

    let output = '';
    
    // data.contents, JSON string formatında olacak. Yani önce JSON.parse kullanmalıyız.
    const pairs = JSON.parse(data.contents);  // CORS proxy'den gelen veri
    
    // gelen verinin doğru formatta olduğunu kontrol et
    console.log(pairs);  // Pairs veri yapısını kontrol et

    // Eğer doğru bir dizi (array) ise işlem yap
    if (Array.isArray(pairs)) {
      pairs.forEach(pair => {
        if (pair.symbol.includes('USDT')) {  // Perp pariteleri genellikle USDT ile sonlanır
          output += `<p>${pair.symbol}: ${pair.price} USDT</p>`;
        }
      });
    }
    
    // Fiyatları sayfada göstermek
    document.getElementById("priceList").innerHTML = output;
  })
  .catch(error => {
    console.error("Veri çekme hatası:", error);  // Eğer bir hata olursa, konsola yazdırıyoruz
  });

