import { Observable } from "rxjs";

export interface ThingsOperations<T, ID> {
    getAll(): Observable<T[]>;
    getOneById(id: ID): Observable<T>;
    create(t: T): Observable<T>;
    update(id: ID, t: T): Observable<T>;
    delete(id: ID): Observable<any>;
    uploadImage(formData: FormData): Observable<any>;
    //getImage(serverPath: string): Observable<any>;
}
