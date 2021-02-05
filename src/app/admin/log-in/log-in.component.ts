import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
    model = { email: '', username: '', password: '' };
    constructor(private authService: AuthService, private router: Router) {}

    onLogin(form: NgForm) {
        console.log(form.value, form.submitted, form.value.email);
        if (form.invalid) {
            return;
        }
        this.authService
            .login(form.value.email, form.value.username, form.value.password)
            .subscribe((rep) => {
                console.log(rep);
                this.router.navigate(['/admin']);
            });
    }
}
