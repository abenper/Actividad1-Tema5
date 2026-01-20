import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../../core/services/social.service';

@Pipe({
  name: 'prettyTitle',
  standalone: true // Pipe Standalone
})
export class PrettyTitlePipe implements PipeTransform {
  transform(post: Post): string {
    // Eliminamos los bucles pesados (dummy loops) que tenía el código malo.
    // La transformación es instantánea.
    return `[${post.id}] ${post.title.toUpperCase()}`;
  }
}