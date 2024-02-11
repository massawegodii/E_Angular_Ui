import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductImageDialogueComponent } from './show-product-image-dialogue.component';

describe('ShowProductImageDialogueComponent', () => {
  let component: ShowProductImageDialogueComponent;
  let fixture: ComponentFixture<ShowProductImageDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowProductImageDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowProductImageDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
