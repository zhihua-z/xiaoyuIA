export interface IPost {
    id: number;
    title: string;
    url: string;
    author: string;
    postTime: string;
    type: "video" | "blog";
    likedCount: number;
    userLiked: boolean;
}

export interface ITask {
    id: number;
    type: string;
    name: string;
    user: string;
    taskCreateTime: Date;
    taskDeadline: Date;
}