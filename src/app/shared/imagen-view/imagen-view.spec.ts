import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenView } from './imagen-view';

describe('ImagenView', () => {
  let component: ImagenView;
  let fixture: ComponentFixture<ImagenView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagenView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
