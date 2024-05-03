import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModeratorService } from './moderator.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-modify-moderator',
  templateUrl: './modify-moderator.component.html',
  styleUrl: './modify-moderator.component.css'
})
export class ModifyModeratorComponent {
  moderator: any = {};

  constructor(private route: ActivatedRoute, private moderatorService: ModeratorService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const moderatorId = +params['id']; // Convertir l'identifiant en nombre
      this.moderatorService.getModeratorById(moderatorId).subscribe((data: any) => {
        this.moderator = data;
      });
    });
  }

  submitForm(): void {
    this.moderatorService.updateModerator(this.moderator).subscribe((data: any) => {
      console.log('Détails du modérateur mis à jour avec succès:', data);
      // Rediriger ou effectuer une autre action après la mise à jour réussie
    });
  }
}
