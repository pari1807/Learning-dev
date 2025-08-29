import { useState, useEffect } from 'react';

const FetchDataEffect = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setPosts(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Fetched Posts</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.slice(0, 5).map(post => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default FetchDataEffect;