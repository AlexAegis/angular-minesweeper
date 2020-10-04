import { NgMinesweeperModule } from '@alexaegis/ng-minesweeper';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, NgMinesweeperModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
