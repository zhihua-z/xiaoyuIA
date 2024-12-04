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
    TaskType: string;
    TaskName: string;
    TaskUser: string;
    TaskCreateTime: Date;
    TaskDeadline: Date;
}