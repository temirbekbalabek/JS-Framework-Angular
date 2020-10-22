import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumConproComponent } from './album-conpro.component';

describe('AlbumConproComponent', () => {
  let component: AlbumConproComponent;
  let fixture: ComponentFixture<AlbumConproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumConproComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumConproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
