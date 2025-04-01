import { useState } from 'react';
import { getCollaborativeRecommendations } from '../api/collaborativeFilteringAPI';
import { getContentRecommendations } from '../api/contentFilteringAPI';
import { getAzureRecommendations } from '../api/azureMLAPI';
import '../App.css';

function Recommendations() {
    const [userId, setUserId] = useState('');
    const [itemId, setItemId] = useState('');
    const [collaborativeRecommendations, setCollaborativeRecommendations] = useState<string[]>([]);
    const [contentRecommendations, setContentRecommendations] = useState<string[]>([]);
    const [azureRecommendations, setAzureRecommendations] = useState<string[]>([]);

    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    const handleItemIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemId(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Fetch recommendations from all three models
        const collaborative = await getCollaborativeRecommendations(userId, itemId);
        const content = await getContentRecommendations(userId, itemId);
        const azure = await getAzureRecommendations(userId, itemId);

        // Update the state with fetched recommendations
        setCollaborativeRecommendations(collaborative);
        setContentRecommendations(content);
        setAzureRecommendations(azure);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userId">User ID:</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={handleUserIdChange}
                        placeholder="Enter User ID"
                    />
                </div>
                <div>
                    <label htmlFor="itemId">Item ID:</label>
                    <input
                        type="text"
                        id="itemId"
                        value={itemId}
                        onChange={handleItemIdChange}
                        placeholder="Enter Item ID"
                    />
                </div>
                <br />
                <button type="submit">Submit</button>
            </form>
            <br />
            <hr />

            <h2>Recommendations</h2>
            <table>
                <thead>
                    <tr>
                        <th>Collaborative Filtering</th>
                        <th>Content Filtering</th>
                        <th>Wide and Deep</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {collaborativeRecommendations.length > 0 ? (
                                collaborativeRecommendations.map((item, index) => (
                                    <div key={index}>{item}</div>
                                ))
                            ) : (
                                <div>No recommendations available</div>
                            )}
                        </td>
                        <td>
                            {contentRecommendations.length > 0 ? (
                                contentRecommendations.map((item, index) => (
                                    <div key={index}>{item}</div>
                                ))
                            ) : (
                                <div>No recommendations available</div>
                            )}
                        </td>
                        <td>
                            {azureRecommendations.length > 0 ? (
                                azureRecommendations.map((item, index) => (
                                    <div key={index}>{item}</div>
                                ))
                            ) : (
                                <div>No recommendations available</div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Recommendations;
