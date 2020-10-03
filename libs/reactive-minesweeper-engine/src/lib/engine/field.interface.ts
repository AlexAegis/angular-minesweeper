import { FieldMark } from './field-mark.enum';

export type Revealer = (isFlood?: boolean) => void;

export const isNotFlagged = <T extends Field = Field>(tile: T) =>
	tile.getMark() === FieldMark.EMTPY;
export const isFlagged = <T extends Field = Field>(tile: T) => tile.getMark() === FieldMark.FLAG;
export const isQuestioned = <T extends Field = Field>(tile: T) =>
	tile.getMark() === FieldMark.QUESTION;

export interface Field {
	/**
	 * Implement only simple get logic
	 */
	getX(): number;
	/**
	 * Implement only simple get logic
	 */
	getY(): number;
	/**
	 * Implement only simple get logic
	 */
	getValue(): number;
	/**
	 * Implement only simple get logic
	 */
	isRevealed(): boolean;
	/**
	 * Implement only simple get logic
	 */
	getMark(): FieldMark;
	/**
	 * Implement only simple get logic
	 */
	isMine(): boolean;
	/**
	 * Implement only simple get logic
	 */
	getError(): boolean;
	/**
	 * Implement only simple set logic
	 */
	setValue(value: number): void;
	/**
	 * Implement only simple set logic
	 */
	setRevealed(revealed: boolean): void;
	/**
	 * Implement only simple set logic
	 */
	setMark(mark: FieldMark): void;
	/**
	 * Implement only simple set logic
	 */
	setMine(isMine: boolean): void;
	/**
	 * Implement only simple set logic
	 */
	setError(error: boolean): void;

	/**
	 *
	 * @param callback call this on left click
	 */
	registerOnReveal(callback: Revealer): void;
	/**
	 *
	 * @param callback call this on right click
	 */
	registerOnMark(callback: Revealer): void;
}
