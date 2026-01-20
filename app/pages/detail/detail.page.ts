import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonSpinner, IonNote } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocialService, Comment } from '../../core/services/social.service'; // Asegúrate de importar tu servicio bueno

@Component({
  standalone: true,
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonSpinner, IonNote]
})
export class DetailPage implements OnInit {
  postId: number = 0;
  title: string = '';

  // Observable directo para AsyncPipe
  comments$: Observable<Comment[]> | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private socialService: SocialService
  ) {}

  ngOnInit() {
    this.postId = Number(this.route.snapshot.queryParamMap.get('id'));
    this.title = this.route.snapshot.queryParamMap.get('title') || 'Detalle';

    // BP 2.4.1: Una sola petición, sin duplicados
    this.comments$ = this.socialService.getComments(this.postId);
  }

  back() {
    this.router.navigate(['/home']);
  }
}
