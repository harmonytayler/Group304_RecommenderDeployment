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

    const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserId(e.target.value);
    };

    const handleItemIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemId(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Fetch recommendations from all three models
        const collaborative = await getCollaborativeRecommendations(itemId);
        const content = await getContentRecommendations(itemId);
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
                <select
                    id="userId"
                    value={userId}
                    onChange={handleUserIdChange}
                >
                    <option value="" disabled>Select User ID</option>
                    <option value="-1032019229384696495">-1032019229384696495</option>
                    <option value="4254153380739593270">4254153380739593270</option>
                    <option value="-8845298781299428018">-8845298781299428018</option>
                    <option value="6879394870211872116">6879394870211872116</option>
                    <option value="-108842214936804958">-108842214936804958</option>
                </select>

                </div>
                <div>
                    <label htmlFor="itemId">Item ID:</label>
                    <select
                    id="itemId"
                    value={itemId}
                    onChange={handleItemIdChange}
                >
                    <option value="" disabled>Select Item ID</option>
                    <option value="4644672909721737325">4644672909721737325</option>
                    <option value="-5917314377186856799">-5917314377186856799</option>
                    <option value="8194079557551008273">8194079557551008273</option>
                    <option value="-6151852268067518688">-6151852268067518688</option>
                    <option value="-3173020603774823976">-3173020603774823976</option>
                </select>
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
                            1. {collaborativeRecommendations[0]}<br/>
                            2. {collaborativeRecommendations[1]}<br/>
                            3. {collaborativeRecommendations[2]}<br/>
                            4. {collaborativeRecommendations[3]}<br/>
                            5. {collaborativeRecommendations[4]}<br/>
                        </td>
                        <td>
                            1. {contentRecommendations[0]}<br/>
                            2. {contentRecommendations[1]}<br/>
                            3. {contentRecommendations[2]}<br/>
                            4. {contentRecommendations[3]}<br/>
                            5. {contentRecommendations[4]}<br/>
                        </td>
                        <td>
                            1. {azureRecommendations[0]}<br/>
                            2. {azureRecommendations[1]}<br/>
                            3. {azureRecommendations[2]}<br/>
                            4. {azureRecommendations[3]}<br/>
                            5. {azureRecommendations[4]}<br/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Recommendations;
