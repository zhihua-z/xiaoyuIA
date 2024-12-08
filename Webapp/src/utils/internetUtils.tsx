import { IPost, ITask } from "../interfaces";

export const postData = async (url: string, body: string) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    })

    if (!response.ok) {
        throw new Error(`Http error! Status : ${response.status}`);
    }

    const data = await response.json()
    return data
}

export const getData = async (url: string) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Http error! Status : ${response.status}`);
    }

    const data = await response.json()
    return data
}






export const createNewTask = async (task: ITask, navigate: any) => {
    const url: string = 'http://localhost:8000/api/createTask'

    const body = {
        taskType: task.TaskType,
        taskName: task.TaskName,
        taskUser: task.TaskUser,
        deadline: task.TaskDeadline
    }

    const data = await postData(url, JSON.stringify(body))

    if (data['status'] === 'success')
    {
        navigate('/task')
    }
    else
    {
        alert(data['status'])
    }
}


export const getInternetPosts = async (
    url: string, 
    username: string,
    updateData: React.Dispatch<React.SetStateAction<IPost[]>>
) => {
    const body = {
        username: username
    }
    
    const data = await postData(url, JSON.stringify(body));

    updateData(data.post)
}

export const setInternetLiked = async (
        username: string, 
        postId: number, 
        isLiked: boolean,
        setLikeAmount: React.Dispatch<React.SetStateAction<number>>,
        setIsLiked: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
    const url = 'http://localhost:8000/api/like'
    const body = {
        username: username,
        postId: postId,
        action: isLiked ? 'unlike' : 'like'
    }
    
    const data = await postData(url, JSON.stringify(body));

    if (data.status == 'success') {
        setLikeAmount(data.newLikedCount)
        setIsLiked(!isLiked)
    }
}

// export const countLike = async (postId: number, updateData: React.Dispatch<React.SetStateAction<IPost[]>>) => {
//     try {
//         const response = await fetch('/api/post/', {
//             method: 'POST',
//             body: JSON.stringify({
//                 postId,
//                 username: 'john_doe',
//                 type: 'regular',
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`Http error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(data);

//         if (data.status === 'success') {
//             updateData((prevData) => {
//                 return prevData.map((post) =>
//                     post.id === postId
//                         ? { ...post, likedCount: data.likedCount }
//                         : post
//                 );
//             });
//         } else {
//             console.log('Error:', data.status);
//         }
//     } catch (error) {

//         console.error('Error while liking the post:', error);
//     }
// }
