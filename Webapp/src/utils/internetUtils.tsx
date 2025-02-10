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
        deadline: task.TaskDeadline,
        duration: task.duration
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

export const getListOfTasks = async (username: string, setTasks: any) => {
    const url = 'http://localhost:8000/api/getTask'
    const body = {
        username: username
    }

    const data = await postData(url, JSON.stringify(body))  
    
    if (data.status == 'success') {
        console.log(data.task)
        setTasks(data.task)
    }
}

export const setTaskCompleted = async (taskId: number, removeTaskFromList: any) => {
    const url = 'http://localhost:8000/api/setTaskComplete'
    const body = {
        taskId: taskId
    }

    const data = await postData(url, JSON.stringify(body))

    if (data.status == 'success') {
        removeTaskFromList(taskId)
    }
}

export const getMePageData = async (username: string, setData: any) => {
    const url = 'http://localhost:8000/api/getMePageData'
    const body = {
        username: username
    }

    const data = await postData(url, JSON.stringify(body))

    if (data.status == 'success') {
        setData(data)
    }
}

export const postMePageData = async (username: string, setData: any, datatype: string, data: number) => {
    const url = 'http://localhost:8000/api/postMePageData'
    const body = {
        username: username,
        datatype: datatype,
        data: data
    }

    const response = await postData(url, JSON.stringify(body))

    if (response.status == 'success') {
        setData(response)
    }
}

export const getWorkoutData = async (username: string, setData: any) => {
    const url = 'http://localhost:8000/api/getWorkoutData'
    const body = {
        username: username
    }

    const response = await postData(url, JSON.stringify(body))

    if (response.status == 'success') {
        setData(response.workoutData)
    }
}

export const getProgressData = async (username: string, setData: any) => {
    const url = 'http://localhost:8000/api/getProgressData'
    const body = {
        username: username
    }

    const response = await postData(url, JSON.stringify(body))

    if (response.status == 'success') {
        setData(response.progressData)
    }
}