import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonList, IonLabel, IonButton, IonNote, IonSpinner
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling'; // IMPORTANTE para Virtual Scroll
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';

import { SocialService, Post } from '../../core/services/social.service';
import { PrettyTitlePipe } from '../../shared/pipes/pretty-title.pipe';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimización crítica de UI
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollingModule, // Módulo para Virtual Scroll
    PrettyTitlePipe, // Nuestro Pipe optimizado
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonList, IonLabel, IonButton, IonNote, IonSpinner
  ]
})
export class HomePage implements OnInit {
  // Control de formulario reactivo para el input de búsqueda
  searchControl = new FormControl('');

  // Observable que combina los datos y el filtro automáticamente
  filteredPosts$: Observable<Post[]>;

  constructor(
    private socialService: SocialService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtenemos los posts (ya cacheados por el servicio)
    const posts$ = this.socialService.getPosts().pipe(
      // Simulamos los 1000 items para mantener la comparación justa con la App Mala
      map(data => {
        const big: Post[] = [];
        for (let i = 0; i < 10; i++) big.push(...data);
        return big;
      })
    );

    const searchTerm$ = this.searchControl.valueChanges.pipe(
      startWith('') // Valor inicial vacío
    );

    // Combinamos búsqueda y datos: Angular recalcula solo cuando uno cambia
    this.filteredPosts$ = combineLatest([posts$, searchTerm$]).pipe(
      map(([posts, term]) => {
        const q = (term || '').toLowerCase();
        return posts.filter(p => (p.title + ' ' + p.body).toLowerCase().includes(q));
      })
    );
  }

  openPost(p: Post) {
    // Navegación limpia
    this.router.navigate(['/detail'], { queryParams: { id: p.id, title: p.title } });
  }

  goSettings() {
    this.router.navigate(['/settings']);
  }
}
