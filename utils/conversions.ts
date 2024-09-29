
export function formatTimestamp(timestamp:string) {
    const date = new Date(timestamp);
  
    // Extract individual parts of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Format the date as desired, e.g., "28-09-2024 05:52:27"
    return `${day}-${month}-${year}`;
  }

 export function formatNumberWithCommas(number:any) {
    return number?.toLocaleString('en-US');
  }



 export function convertToCandlestickFormat(data, interval) {
    // Input validation

    console.log(data)
    const newData = data

    const candlestickData = [];
    let currentTime = Math.floor(data[0][0] / interval) * interval; // Start from the first time rounded down to the nearest interval
    let open = null, high = -Infinity, low = Infinity, close = null;

    for (const [timestamp, price] of newData) {
        const roundedTime = Math.floor(timestamp / interval) * interval;

        if (roundedTime !== currentTime) {
            // Push the OHLC data if we move to the next interval
            if (open !== null) {
                // Format: [open, close, low, high]
                candlestickData.push([open, close, low, high]);
            }
            // Reset for the new interval
            currentTime = roundedTime;
            open = price;
            high = price;
            low = price;
            close = price;
        } else {
            // Update high, low, and close
            high = Math.max(high, price);
            low = Math.min(low, price);
            close = price;
        }
    }

    // Add the last interval's candlestick data
    if (open !== null) {
        candlestickData.push([open, close, low, high]);
    }

    return candlestickData;
}



