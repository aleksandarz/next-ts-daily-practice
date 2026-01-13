
export const fetchRandomQuote = async () => {
  try {
    const response = await fetch(`https://api.adviceslip.com/advice`);
    if (!response.ok) throw new Error("Failed to fetch quote");
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}