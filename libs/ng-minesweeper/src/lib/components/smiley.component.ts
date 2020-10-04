import { GameState } from '@alexaegis/reactive-minesweeper-engine';
import { Component, EventEmitter, Output } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { StoreService } from '../services/store.service';

@Component({
	selector: 'mine-smiley',
	templateUrl: './smiley.component.html',
	styleUrls: ['./smiley.component.css'],
})
export class SmileyComponent {
	@Output()
	public smileyClick = new EventEmitter();

	public smiley$ = this.storeService.tileMouseDown$.pipe(
		switchMap((tileMouseDown) => (tileMouseDown ? of('click') : this.storeService.gamestate$)),
		tap((a) => console.log(a))
	);

	public src$ = this.smiley$.pipe(
		map((smiley) => {
			switch (smiley) {
				case 'click':
					return this.storeService.assetMap.clickSmiley;
				case GameState.LOST:
					return this.storeService.assetMap.lostSmiley;
				case GameState.WON:
					return this.storeService.assetMap.wonSmiley;
				case GameState.ONGOING:
				default:
					return this.storeService.assetMap.ongoingSmiley;
			}
		})
	);

	public constructor(private readonly storeService: StoreService) {}

	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
	}
}
