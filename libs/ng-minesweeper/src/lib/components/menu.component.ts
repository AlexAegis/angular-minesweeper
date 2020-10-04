import { Component } from '@angular/core';

@Component({
	selector: 'mine-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
	openGithubHomepage() {
		window.open('TODO: homepage', '_blank');
	}
}
