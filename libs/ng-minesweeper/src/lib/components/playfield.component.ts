import { MinesweeperGame } from '@alexaegis/reactive-minesweeper-engine';
import { Component, Input, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GamePreset, StoreService } from '../services/store.service';
import { TileComponent } from './tile.component';

@Component({
	selector: 'mine-playfield',
	templateUrl: './playfield.component.html',
	styleUrls: ['./playfield.component.css'],
})
export class PlayfieldComponent implements OnInit, OnDestroy {
	@Input()
	public gamePreset?: GamePreset = undefined;

	@ViewChildren(TileComponent)
	private tiles: TileComponent[] = [];

	constructor(public readonly storeService: StoreService) {}
	private mounted = false;

	private s = new Subscription();

	private tileGetter = (x: number, y: number): TileComponent => {
		return this.tiles[y + 1000 * x];
	};

	ngOnInit(): void {
		this.mounted = true;

		this.s.add(
			combineLatest([
				this.storeService.height$,
				this.storeService.width$,
				this.storeService.mineCount$,
			])
				.pipe(
					map(
						([heigth, width, mineCount]) =>
							new MinesweeperGame<TileComponent>(
								heigth,
								width,
								mineCount,
								this.tileGetter
							)
					),
					tap((game) => this.storeService.game$.next(game))
				)
				.subscribe()
		);
	}

	ngOnDestroy(): void {
		this.mounted = false;
		this.s.unsubscribe();
	}
}
