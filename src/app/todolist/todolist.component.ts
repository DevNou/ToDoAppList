import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';

/* -------------------------
   Task Filter Pipe
------------------------- */
@Pipe({name: 'taskFilter', standalone: true})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: any[], filter: string) {
    if (!tasks) return [];
    if (filter === 'completed') return tasks.filter(t => t.isCompleted);
    if (filter === 'pending') return tasks.filter(t => !t.isCompleted);
    return tasks;
  }
}

/* -------------------------
   Component
------------------------- */
@Component({
  selector: 'app-todolist',
  standalone: true,
 imports: [FormsModule,CommonModule, NgFor, NgClass, NgIf, TaskFilterPipe],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent {
  count = signal<number>(1);

  taskArray = [
    { taskName: 'Developing', isCompleted: false, isReadOnly: true, createdAt: new Date() },
  ];

  filter: 'all' | 'completed' | 'pending' = 'all';
  successMessage: string = '';
  errorMessage: string = '';

  /* -------------------------
     Form Submit
  ------------------------- */
  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.errorMessage = 'Please enter a task!';
      return;
    }

    this.taskArray.push({
      taskName: form.controls['newTask'].value,
      isCompleted: false,
      isReadOnly: true,
      createdAt: new Date(),
    });

    this.successMessage = 'Task added successfully!';
    this.errorMessage = '';
    this.updateCount();
    form.reset();

    setTimeout(() => this.successMessage = '', 2000);
  }

  /* -------------------------
     Update Task Count
  ------------------------- */
  updateCount() {
    this.count.update(() => this.taskArray.length);
  }

  /* -------------------------
     Delete Task
  ------------------------- */
  onDelete(index: number) {
    this.taskArray.splice(index, 1);
    this.updateCount();
  }

  /* -------------------------
     Edit Task
  ------------------------- */
  onEdit(index: number) {
    this.taskArray[index].isReadOnly = false;
  }

  /* -------------------------
     Save Task
  ------------------------- */
  onSave(index: number, newTaskName: string) {
    this.taskArray[index].taskName = newTaskName;
    this.taskArray[index].isReadOnly = true;
  }

  /* -------------------------
     Toggle Completed
  ------------------------- */
  onCheck(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }

  /* -------------------------
     Clear All Tasks
  ------------------------- */
  clearAll() {
    this.taskArray = [];
    this.updateCount();
  }

  /* -------------------------
     Mark All Complete
  ------------------------- */
  markAllComplete() {
    this.taskArray.forEach(task => task.isCompleted = true);
  }

  /* -------------------------
     Count Tasks
  ------------------------- */
  getCount() {
    return this.taskArray.length;
  }
}
