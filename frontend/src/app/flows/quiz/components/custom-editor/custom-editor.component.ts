import { Component, ElementRef, EventEmitter, Output, ViewChild, Input, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { TINYMCE_OPTIONS } from '../../constants/quiz.constant';

@Component({
  selector: 'app-custom-editor',
  imports: [ReactiveFormsModule, CommonModule, EditorComponent],
  templateUrl: './custom-editor.component.html',
  styleUrl: './custom-editor.component.scss',
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class CustomEditorComponent {

  @Input() content: string = '';
  @Output() fileUploaded = new EventEmitter<File[]>();
  @Output() data = new EventEmitter<string>();
  @ViewChild('customFileInput', { static: false }) fileInputRef!: ElementRef;
  inputForm: FormGroup;
  
  
  constructor(private formBuilder: FormBuilder) {
    this.inputForm = this.formBuilder.group({
      inputValue: ['', [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['content'] && changes['content'].currentValue) {
      this.inputForm.get('inputValue')?.setValue(this.content);
    }
  }
  
  init: EditorComponent['init'] = {
    menubar: false,
    elementpath: false,
    statusbar: false,
    plugins: TINYMCE_OPTIONS.PLUGINS,
    base_url: 'https://nbisht11.github.io/ai-quiz-generator/tinymce',
    suffix: '.min',
    toolbar: TINYMCE_OPTIONS.TOOLBAR,
    fontsize_formats: '12px 13px 14px 15px 16px 18px 24px 36px',
  };
  
  submitResponse() {
    if (this.inputForm.valid) {
      this.data.emit(this.inputForm.get('inputValue')?.value);
    } else {
      this.inputForm.markAllAsTouched();
    }
  }
  
  get inputValue() {
    return this.inputForm.get('inputValue');
  }
}
