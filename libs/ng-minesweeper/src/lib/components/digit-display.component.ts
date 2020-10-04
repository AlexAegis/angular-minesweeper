import { padArray } from '@alexaegis/reactive-minesweeper-engine';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'mine-digit-display',
	templateUrl: './digit-display.component.html',
	styleUrls: ['./digit-display.component.css'],
})
export class DigitDisplayComponent implements OnChanges {
	@Input()
	public value?: number;

	@Input()
	public paddedLength = 3;

	public numbers: number[] = [];

	public ngOnChanges(changes: SimpleChanges): void {
		console.log('ngONChangeS DigitDispol', changes);
		this.numbers = padArray(
			(this.value ?? 0)
				.toString()
				.split('')
				.map((s) => parseInt(s, 10)),
			this.paddedLength,
			0
		);
	}
}
