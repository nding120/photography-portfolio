import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Component({
    selector: 'app-manage-photos',
    templateUrl: './manage-photos.component.html',
    styleUrls: ['./manage-photos.component.scss'],
})
export class ManagePhotosComponent implements OnInit {
    form: FormGroup;
    imagesPreview: string[] = [];
    filesToUpload: Array<File> = [];

    @ViewChild('imagesInput') imagesInput: ElementRef;

    constructor(private fb: FormBuilder, private http: HttpClient) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            category: ['', [Validators.required]],
            images: [null, [Validators.required]],
        });
    }

    onImagePicked(event: Event) {
        this.filesToUpload = [];
        this.imagesPreview = [];

        const length = (event.target as HTMLInputElement).files.length;
        if (length) {
            for (let i = 0; i < length; i++) {
                const reader = new FileReader();
                this.filesToUpload.push(
                    (event.target as HTMLInputElement).files[i]
                );
                reader.onload = (event: any) => {
                    this.imagesPreview.push(event.target.result as string);
                };
                reader.readAsDataURL(
                    (event.target as HTMLInputElement).files[i]
                );
            }
            this.form.patchValue({ images: this.filesToUpload });
            this.form.get('images').updateValueAndValidity();
        }
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }
        const category = this.form.get('category').value;
        const postData = new FormData();
        for (let i = 0; i < this.filesToUpload.length; i++) {
            postData.append('images', this.filesToUpload[i]);
            postData.append('titles', 'landscape ' + i);
            postData.append('descs', 'test ' + i);
        }
        this.http
            .post(BACKEND_URL + '/images/' + category, postData)
            .subscribe((res: any) => {
                this.filesToUpload = [];
                this.imagesPreview = [];
                this.form.reset();
                this.imagesInput.nativeElement.value = '';
                console.log(res);
            });
    }
}
