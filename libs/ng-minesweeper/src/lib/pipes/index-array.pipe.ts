import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mineIndexArray',
	pure: true,
})
export class IndexArrayPipe implements PipeTransform {
	public transform(value: number): number[] {
		return Array(value);
	}
}
