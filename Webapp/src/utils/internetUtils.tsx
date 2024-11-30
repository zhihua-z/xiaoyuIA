import { IPost } from "../interfaces";

export const getInternetPosts = async (
    url: string, 
    username: string,
    updateData: React.Dispatch<React.SetStateAction<IPost[]>>
) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username
        })
    })
    console.log(response)

    if (!response.ok) {
        throw new Error(`Http error! Status : ${response.status}`);
    }

    const data = await response.json();

    updateData(data.post)
}

export const setInternetLiked = async (
        username: string, 
        postId: number, 
        setLikeAmount: React.Dispatch<React.SetStateAction<number>>,
        setIsAdding: any
    ) => {
    const url = 'http://localhost:8000/api/like'
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            postId: postId,
        })
    })

    if (!response.ok) {
        throw "error"
    }

    const data = await response.json()
    if (data.status == 'success') {
        setLikeAmount(data.newLikedCount)
        setIsAdding(true)
    }

    console.log(response.json())
}

export const countLike = async (postId: number, updateData: React.Dispatch<React.SetStateAction<IPost[]>>) => {
    try {
        const response = await fetch('/api/post/', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                username: 'john_doe',
                type: 'regular',
            })
        });

        if (!response.ok) {
            throw new Error(`Http error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (data.status === 'success') {
            updateData((prevData) => {
                return prevData.map((post) =>
                    post.id === postId
                        ? { ...post, likedCount: data.likedCount }
                        : post
                );
            });
        } else {
            console.log('Error:', data.status);
        }
    } catch (error) {

        console.error('Error while liking the post:', error);
    }
}
