export interface IUser {
    id: number,
    name: string,
    username: string,
    email: string,
    password: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}
export interface IPhoto {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}
export interface IAlbum {
    userId: number,
    id: number,
    title: string;
}
export interface IPost {
    userId: number,
    id: number,
    title: string,
    body: string
}
export interface IComment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}