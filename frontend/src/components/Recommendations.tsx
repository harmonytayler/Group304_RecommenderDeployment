import { useState } from 'react';

function Recommendations() {
    const [userId, setUserId] = useState('');
    const [itemId, setItemId] = useState('');

    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    const handleItemIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemId(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('User ID:', userId);
        console.log('Item ID:', itemId);
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Recommendations;
