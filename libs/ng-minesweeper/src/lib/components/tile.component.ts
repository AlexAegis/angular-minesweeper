import {
	Field,
	FieldMark,
	MinesweeperGame,
	Revealer,
} from '@alexaegis/reactive-minesweeper-engine';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from '../services/store.service';

@Component({
	selector: 'mine-tile',
	templateUrl: './tile.component.html',
	styleUrls: ['./tile.component.css'],
})
export class TileComponent implements OnInit, OnDestroy, Field {
	public constructor(public readonly storeService: StoreService) {}
	@Input()
	public x!: number;
	@Input()
	public y!: number;

	public value = 0;
	public revealed = false;
	public mark = FieldMark.EMTPY;
	public mine = false;
	public error = false;
	@Input()
	public disabled = false;

	public isANeighbourPressed = false;

	tileMouseDown: [number, boolean] | undefined = undefined;

	width = 10;

	FieldMark = FieldMark;
	private subscriptions = new Subscription();

	onReveal: (e: Event) => void = () => undefined;
	onMark: (e: Event) => void = () => undefined;

	ngOnInit(): void {
		this.subscriptions.add(
			this.storeService.tileMouseDown$.subscribe((tileMouseDown) => {
				this.tileMouseDown = tileMouseDown;
			})
		);

		this.subscriptions.add(
			this.storeService.width$.subscribe((width) => {
				this.width = width;
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	sendLinearClick() {
		this.storeService.tileClick$.next([
			MinesweeperGame.toLinear(this.width, this.x, this.y),
			true,
		]);
	}

	public getX(): number {
		return this.x;
	}

	public getY(): number {
		return this.y;
	}

	public getValue(): number {
		return this.value;
	}

	public isRevealed(): boolean {
		return this.revealed;
	}

	public getMark(): FieldMark {
		return this.mark;
	}

	public isMine(): boolean {
		return this.mine;
	}

	public getError(): boolean {
		return this.error;
	}

	public setValue(value: number): void {
		this.value = value;
	}

	public setRevealed(revealed: boolean): void {
		this.revealed = revealed;
	}

	public setMark(mark: FieldMark): void {
		this.mark = mark;
	}

	public setMine(isMine: boolean): void {
		this.mine = isMine;
	}

	public setError(error: boolean): void {
		this.error = error;
	}

	public registerOnReveal(callback: Revealer): void {
		this.onReveal = (e: Event) => {
			e.preventDefault();
			callback();
		};
	}
	public registerOnMark(callback: Revealer): void {
		this.onMark = (e: Event) => {
			e.preventDefault();
			callback();
		};
	}
}
