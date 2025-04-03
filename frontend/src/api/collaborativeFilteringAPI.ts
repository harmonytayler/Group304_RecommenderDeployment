export const getCollaborativeRecommendations = async (itemId: string) => {
    try {
        const response = await fetch(`https://localhost:5000/api/Recommendations/collaborative/${itemId}`);
        console.log("Response:", response);

        if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        console.log("Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching collaborative recommendations:", error);
        return [];
    }
};