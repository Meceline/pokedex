import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Hola';
  name = signal("Pikachu");
  life = signal(21);
  imageSrc = signal("../assets/img/pikachu.png");

  size = computed(() => {
    //Taille est un dérivé de life --> computed()
    const life = this.life();

    if (life < 15) return 'Petit';
    if (life < 25) return 'Moyen';
    return 'Grand';
  });


  incrementLife(){
    this.life.update(v => v+1);
  }
  decrementLife(){
    this.life.update(v => v-1);
  }
}
