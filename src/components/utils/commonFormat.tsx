export const formatCurrency = (data: number): string =>
    new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // trailingZeroDisplay: "stripIfInteger",
}).format(data);


export const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
};

