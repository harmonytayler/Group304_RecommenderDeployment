export const getContentRecommendations = async (itemId: string) => {
    try {
        const response = await fetch(`https://localhost:5000/api/Recommendations/content/${itemId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching content recommendations:", error);
        return [];
    }
};