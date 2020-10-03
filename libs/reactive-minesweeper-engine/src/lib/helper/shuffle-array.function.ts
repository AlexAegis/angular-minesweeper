export function shuffle<T>(array: T[]): T[] {
	let currentIndex = array.length;

	while (0 !== currentIndex) {
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		const temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}
