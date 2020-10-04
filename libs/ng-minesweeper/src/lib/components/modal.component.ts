import { Component, Input } from '@angular/core';

@Component({
	selector: 'mine-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
	@Input()
	public style: string | undefined;
	@Input()
	public cls: string | undefined;

	@Input()
	public title: string | undefined;
	@Input()
	public isOpen = false;

	public open() {
		this.isOpen = true;
	}

	public close() {
		this.isOpen = false;
	}
}
