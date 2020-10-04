import { Component, Input } from '@angular/core';

@Component({
	selector: 'mine-title-bar',
	templateUrl: './title-bar.component.html',
	styleUrls: ['./title-bar.component.css'],
})
export class TitleBarComponent {
	@Input()
	public title!: string;
	@Input()
	public icon!: string;
}
