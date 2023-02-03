import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
    model = { email: '', username: '', password: '', code: '' };

    constructor(private authService: AuthService, private router: Router) {}

    onSignup(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.authService
            .creatUser(
                form.value.email,
                form.value.username,
                form.value.password,
                form.value.code
            )
            .subscribe((rep) => {
                this.router.navigate(['/login']);
            });
    }
}
