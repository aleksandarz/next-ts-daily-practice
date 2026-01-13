
export const fetchCatFacts = async () => {
  try {
    const response = await fetch(`https://catfact.ninja/fact`);
    if (!response.ok) throw new Error("Failed to cat fact");
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}