import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button.component';
import { DigitDisplayComponent } from './components/digit-display.component';
import { DigitalNumberComponent } from './components/digital-number.component';
import { HighscoreComponent } from './components/highscore.component';
import { ImageComponent } from './components/image.component';
import { MenuComponent } from './components/menu.component';
import { MinesweeperComponent } from './components/minesweeper.component';
import { ModalComponent } from './components/modal.component';
import { PanelComponent } from './components/panel.component';
import { PlayfieldComponent } from './components/playfield.component';
import { SmileyComponent } from './components/smiley.component';
import { TileComponent } from './components/tile.component';
import { TitleBarComponent } from './components/title-bar.component';
import { SettingsForm } from './forms/settings.form';
import { IndexArrayPipe } from './pipes/index-array.pipe';

const exportedComponents = [
	MinesweeperComponent,
	ButtonComponent,
	DigitDisplayComponent,
	DigitalNumberComponent,
	HighscoreComponent,
	ImageComponent,
	MenuComponent,
	ModalComponent,
	PanelComponent,
	PlayfieldComponent,
	SmileyComponent,
	TileComponent,
	TitleBarComponent,
	SettingsForm,
	IndexArrayPipe,
];

@NgModule({
	imports: [CommonModule],
	declarations: [...exportedComponents],
	exports: [...exportedComponents],
})
export class NgMinesweeperModule {}
