async function fetchFuturesData() {
     const apiUrl = "https://api.binance.com/fapi/v1/ticker/24hr"; // Binance API endpoint'i
 
     try {
         const response = await fetch(apiUrl);
         if (!response.ok) {
             throw new Error(`HTTP error! status: ${response.status}`);
         }
         const data = await response.json();
         
         const tableBody = document.querySelector("#futuresTable tbody");
            
          for(let i=0; i<data.length; i++){
                 const row = document.createElement("tr");
                 const symbol = document.createElement("td");
                 symbol.textContent = data[i].symbol;
                 const price = document.createElement("td");
                 price.textContent = data[i].lastPrice;
 
                 row.appendChild(symbol);
                 row.appendChild(price);
                 tableBody.appendChild(row)
             }
 
 
     } catch (error) {
         console.error("Veri çekme hatası:", error);
     }
 }
 
 fetchFuturesData(); 
