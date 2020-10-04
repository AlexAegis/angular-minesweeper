import { Component, Input } from '@angular/core';

@Component({
	selector: 'mine-image',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.css'],
})
export class ImageComponent {
	@Input()
	public cls!: string;

	@Input()
	public style!: string;

	@Input()
	public alt!: string;

	@Input()
	public src!: string;
}
