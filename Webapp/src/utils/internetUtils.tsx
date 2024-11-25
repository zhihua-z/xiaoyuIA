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

