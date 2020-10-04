import { Component } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
	selector: 'mine-highscore',
	templateUrl: './highscore.component.html',
	styleUrls: ['./highscore.component.css'],
})
export class HighscoreComponent {
	constructor(public readonly storeService: StoreService) {}
}
