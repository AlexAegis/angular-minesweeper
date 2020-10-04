import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitDisplayComponent } from './digit-display.component';

describe('DigitDisplayComponent', () => {
	let component: DigitDisplayComponent;
	let fixture: ComponentFixture<DigitDisplayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DigitDisplayComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DigitDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
