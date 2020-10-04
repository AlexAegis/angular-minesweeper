import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from '../services/store.service';

@Component({
	selector: 'mine-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit, OnDestroy {
	@Input()
	public cls!: string;

	@Input()
	public style!: string;

	@Input()
	public disabled = false;

	@Output()
	public buttonMousedown = new EventEmitter();

	@Output()
	public buttonClick = new EventEmitter();

	@Output()
	public buttonContextmenu = new EventEmitter();

	@Input()
	public isMousedown = false;

	public s = new Subscription();

	public constructor(private storeService: StoreService) {}

	public ngOnInit(): void {
		this.s.add(
			this.storeService.documentMouseUp$.subscribe((documentMouseUp) => {
				if (documentMouseUp) {
					this.isMousedown = false;
				}
			})
		);
	}

	public onMouseDown(e: MouseEvent): void {
		this.buttonMousedown.next(e);
		if (e.button === 0) {
			this.isMousedown = true;
		}
	}

	public ngOnDestroy(): void {
		this.s.unsubscribe();
	}
}
