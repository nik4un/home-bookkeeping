import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'hb-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  @Output() categoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  onSubmit(form: NgForm) {
    const { name, capacity } = form.value;
    const category = new Category(name, capacity);

    this.categoriesService.addCategory(category)
      .subscribe((newCategory: Category) => {
        this.categoryAdd.emit(newCategory);
        form.reset();
        form.form.patchValue({name: '', capacity: 1});
      });
  }

}
