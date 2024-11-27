export interface IPost {
    id: number;
    title: string;
    url: string;
    author: string;
    postTime: string;
    type: "video" | "blog";
    LikedCount: number
    
}