
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



