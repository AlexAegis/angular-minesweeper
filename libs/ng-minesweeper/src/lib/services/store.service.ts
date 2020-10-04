import { MinesweeperGame } from '@alexaegis/reactive-minesweeper-engine';
import { Injectable } from '@angular/core';
import {
	asyncScheduler,
	BehaviorSubject,
	combineLatest,
	fromEvent,
	merge,
	Observable,
	Subject,
} from 'rxjs';
import { identity } from 'rxjs/internal/util/identity';
import {
	filter,
	map,
	mapTo,
	scan,
	shareReplay,
	startWith,
	switchMap,
	throttleTime,
	withLatestFrom,
} from 'rxjs/operators';
import { TileComponent } from '../components/tile.component';

export interface GamePreset {
	width: number;
	height: number;
	mineCount: number;
}

export interface WinData extends GamePreset {
	id: number;
	time: number;
}

export enum PresetKeys {
	BEGINNER = 'beginner',
	INTERMEDIATE = 'intermediate',
	EXPERT = 'expert',
}

@Injectable({ providedIn: 'root' })
export class StoreService {
	public documentMouseUp$ = fromEvent(document, 'mouseup');

	public tileClick$ = new Subject<[number, boolean]>();

	public tileMouseDown$ = merge(this.tileClick$, this.documentMouseUp$.pipe(mapTo(undefined)));

	public presets: Record<PresetKeys, GamePreset> = {
		beginner: {
			width: 9,
			height: 9,
			mineCount: 10,
		},
		intermediate: {
			width: 16,
			height: 16,
			mineCount: 40,
		},
		expert: {
			width: 30,
			height: 16,
			mineCount: 99,
		},
	};

	public width$ = new BehaviorSubject<number>(this.presets.beginner.width);
	public height$ = new BehaviorSubject<number>(this.presets.beginner.height);
	public mineCount$ = new BehaviorSubject<number>(this.presets.beginner.mineCount);

	public gamePreset$: Observable<GamePreset> = combineLatest([
		this.width$,
		this.height$,
		this.mineCount$,
	]).pipe(
		throttleTime(50, asyncScheduler, { leading: true, trailing: true }),
		map(([width, height, mineCount]) => ({ width, height, mineCount }))
	);

	public game$ = new BehaviorSubject<MinesweeperGame<TileComponent> | undefined>(undefined);
	public gameOn$ = this.game$.pipe(filter((g): g is MinesweeperGame<TileComponent> => !!g));
	public gamestate$ = this.gameOn$.pipe(switchMap((g) => g.gamestate$));
	public elapsedTime$ = this.gameOn$.pipe(switchMap((g) => g.elapsedTime$));
	public isEnded$ = this.gameOn$.pipe(switchMap((g) => g.isEnded$));
	public isWon$ = this.gameOn$.pipe(switchMap((g) => g.isWon$));
	public remainingMines$ = this.gameOn$.pipe(switchMap((g) => g.remainingMines$));

	public winHistory$: Observable<WinData[]> = this.isWon$.pipe(
		filter(identity),
		withLatestFrom(this.elapsedTime$, this.width$, this.height$, this.mineCount$),
		map(([, time, width, height, mineCount], id) => ({ time, width, height, mineCount, id })),
		scan((a, n) => {
			a.push(n);
			a.sort((a, b) => a.time - b.time);
			return a;
		}, [] as WinData[]),
		startWith([] as WinData[]),
		shareReplay({ refCount: true, bufferSize: 1 })
	);

	public dimensions$ = combineLatest([this.width$, this.height$]).pipe(
		map(([width, height]) => ({ width, height }))
	);

	public colorMap: Record<number, string> = {
		0: '#000000',
		1: '#0000ff',
		2: '#008100',
		3: '#ff1300',
		4: '#000083',
		5: '#810500',
		6: '#2a9494',
		7: '#000000',
		8: '#808080',
	};

	public assetMap = {
		flag: './assets/minesweeper/flag-small.png',
		mineFalse: './assets/minesweeper/mine-false-small.png',
		mine: './assets/minesweeper/mine-small.png',
		clickSmiley: './assets/minesweeper/smiley-click-small.png',
		lostSmiley: './assets/minesweeper/smiley-lost-small.png',
		ongoingSmiley: './assets/minesweeper/smiley-ongoing-small.png',
		wonSmiley: './assets/minesweeper/smiley-won-small.png',
		questionMark: './assets/minesweeper/question-mark-small.png',
	};

	public isTheSamePreset(a: GamePreset, b: GamePreset): boolean {
		return (
			a && b && a.height === b.height && a.width === b.width && a.mineCount === b.mineCount
		);
	}
}
