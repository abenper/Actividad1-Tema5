import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

export type Post = { userId: number; id: number; title: string; body: string; };
export type Comment = { postId: number; id: number; name: string; email: string; body: string; };

@Injectable({ providedIn: 'root' })
export class SocialService {
  // Variable para almacenar la caché del Observable
  private postsCache$?: Observable<Post[]>;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    if (!this.postsCache$) {
      // Si no hay caché, hacemos la petición y la compartimos
      this.postsCache$ = this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').pipe(
        shareReplay(1) // Mantiene la última respuesta en memoria para futuros suscriptores
      );
    }
    return this.postsCache$;
  }

  getComments(postId: number): Observable<Comment[]> {
    // Para detalles, también podríamos cachear si fuera necesario,
    // pero aquí lo crítico es evitar llamadas duplicadas simultáneas.
    return this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  }
}
