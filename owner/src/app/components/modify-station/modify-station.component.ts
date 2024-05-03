import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StationService} from './station.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-modify-station',
  templateUrl: './modify-station.component.html',
  styleUrl: './modify-station.component.css'
})
export class ModifyStationComponent {
  station: any = {};

  constructor(private route: ActivatedRoute, private StationService: StationService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const moderatorId = +params['id']; // Convertir l'identifiant en nombre
      this.StationService.getModeratorById(moderatorId).subscribe((data: any) => {
        this.station = data;
      });
    });
  }

  submitForm(): void {
    this.StationService.updateModerator(this.station).subscribe((data: any) => {
      console.log('Détails du modérateur mis à jour avec succès:', data);
      // Rediriger ou effectuer une autre action après la mise à jour réussie
    });
  }
}
