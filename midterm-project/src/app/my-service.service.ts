import { Injectable } from "@angular/core"
import { HttpClient, HttpParams } from '@angular/common/http';
import { IUser, IPost, IPhoto, IAlbum, IComment } from './data';

@Injectable()
export class MyService {

    constructor(private http: HttpClient) {}

    async getTodos() {
        return await this.http
            .get<IUser[]>('http://localhost:3000/users/')
            .toPromise();
    }

    subscribeForUsers() {
        return this.http.get<IUser[]>(
            'http://localhost:3000/users/'
        );
    }

    subscribeForUser(id: number) {
        return this.http.get<IUser>(
            `http://localhost:3000/users/${id}/`
        );
    }

    signIn(user: IUser) {
        return this.http
            .post('http://localhost:3000/sign-in/', user);
    }
    registrate(user: any) {
        return this.http
            .post('http://localhost:3000/users/', {
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password,
                address: {
                    street: user.street,
                    suite: user.suite,
                    city: user.city,
                    zipcode: user.zipcode,
                    geo: {
                        lat: user.lat,
                        lng: user.lng
                    }
                },
                phone: user.phone,
                website: user.website,
                company: {
                    name: user.companyName,
                    catchPhrase: user.catchPhrase,
                    bs: user.bs
                }
            });
    }

    subscribeForPosts() {
        return this.http.get<IPost[]>(
            'http://localhost:3000/posts/'
        );
    }
    createPost(userId: number, title: string, body: string) {
        return this.http
            .post('http://localhost:3000/posts/', {
                userId: userId,
                title: title,
                body: body
            });
    }
    createComment(postId: number, name: string, email: string, body: string) {
        return this.http
            .post('http://localhost:3000/comments/', {
                postId: postId,
                name: name,
                email: email,
                body: body
            });
    }
    subscribeForPostsOfUser(id: number) {
        return this.http.get<IPost[]>(
            `http://localhost:3000/users/${id}/posts`
        )
    }
    subscribeForPhotosOfCurrentAlbum(id: number) {
        const params = new HttpParams().set('_limit', '6')
        return this.http.get<IPhoto[]>(
            `http://localhost:3000/albums/${id}/photos`,{params}
        );
    }
    subscribeForPhotos() {
        return this.http.get<IPhoto[]>(
            'http://localhost:3000/photos/'
        );
    }
    subscribeForAlbums() {
        return this.http.get<IAlbum[]>(
            'http://localhost:3000/albums/'
        );
    }
    subscribeForComments() {
        return this.http.get<IComment[]>(
            'http://localhost:3000/comments/'
        );
    }              
}