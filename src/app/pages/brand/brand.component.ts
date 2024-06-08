import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../Interface/brand';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brand',
  standalone : true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  brand: Brand = { id: 0, name: '', category: '', isActive: false };
  editMode = false;

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getBrands().subscribe((data: Brand[]) => {
      this.brands = data;
    });
  }

  addBrand(): void {
    this.brandService.addBrand(this.brand).subscribe(() => {
      this.loadBrands();
      this.resetForm();
    });
  }

  editBrand(brand: Brand): void {
    this.brand = { ...brand };
    this.editMode = true;
  }

  updateBrand(): void {
    debugger;
    this.brandService.updateBrand(this.brand.id, this.brand).subscribe(() => {
      this.loadBrands();
      this.resetForm();
      this.editMode = false;
    });
  }

  deleteBrand(id: number): void {
    this.brandService.deleteBrand(id).subscribe(() => {
      this.loadBrands();
    });
  }

  cancelEdit(): void {
    this.resetForm();
    this.editMode = false;
  }

  resetForm(): void {
    this.brand = { id: 0, name: '', category: '', isActive: false };
  }
}
