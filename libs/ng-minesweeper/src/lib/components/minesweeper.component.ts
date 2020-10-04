import { Component, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';
import { StoreService } from '../services/store.service';

@Component({
	selector: 'mine-minesweeper',
	templateUrl: './minesweeper.component.html',
	styleUrls: ['./minesweeper.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class MinesweeperComponent {
	public version = 'TODO: Version';
	public constructor(public readonly storeService: StoreService) {}

	public onSmiley(): void {
		this.storeService.game$.pipe(take(1)).subscribe((game) => game?.reset());
	}
}
