export const getAzureRecommendations = async (userId: string, itemId: string) => {
    try {
        const response = await fetch('https://localhost:5000/api/Recommendations/azureML', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, itemId }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        return data.recommendations;
    } catch (error) {
        console.error("Error fetching Azure recommendations:", error);
        return [];
    }
};