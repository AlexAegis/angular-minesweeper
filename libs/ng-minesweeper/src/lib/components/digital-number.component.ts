import { Component, Input } from '@angular/core';

@Component({
	selector: 'mine-digital-number',
	templateUrl: './digital-number.component.html',
	styleUrls: ['./digital-number.component.css'],
})
export class DigitalNumberComponent {
	public lastDigit!: number;

	public isNaN = isNaN;
	@Input()
	public set value(value: number) {
		this.lastDigit = value % 10;
	}
}
