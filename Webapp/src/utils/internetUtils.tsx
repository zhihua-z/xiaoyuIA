import { IPost } from "../interfaces";

export const getInternetPosts = async (url: string, updateData: React.Dispatch<React.SetStateAction<IPost[]>>) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Http error! Status : ${response.status}');
    }

    const data = await response.json();
    console.log(data.post)

    updateData(data.post)
}

export const getVideoPosts = async (videoURL: string, updateData: React.Dispatch<React.SetStateAction<IPost[]>>) => {
    const response = await fetch(videoURL)

    if (!response.ok) {
        throw new Error('Http error! Status : ${response.status}');
    }
    const data = await response.json();

    console.log(data.videopost)

    updateData(data.videopost)

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
