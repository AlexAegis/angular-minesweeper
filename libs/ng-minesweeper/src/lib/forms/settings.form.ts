import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { GamePreset, StoreService } from '../services/store.service';

@Component({
	selector: 'mine-settings',
	templateUrl: './settings.form.html',
	styleUrls: ['./settings.form.css'],
})
export class SettingsForm implements OnChanges {
	@Input()
	public width!: number;
	@Input()
	public height!: number;
	@Input()
	public mineCount!: number;

	@Output()
	public done = new EventEmitter();

	public constructor(public readonly storeService: StoreService) {}

	ngOnChanges(_changes: SimpleChanges): void {
		console.log('onChanges', _changes);
		if (this.mineCount > this.width * this.height - 1) {
			this.mineCount = this.width * this.height - 1;
		}
	}

	public setTo(gamePreset: GamePreset) {
		this.width = gamePreset.width;
		this.height = gamePreset.height;
		this.mineCount = gamePreset.mineCount;
		this.done.next();
	}
}
