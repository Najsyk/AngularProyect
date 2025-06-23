import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SesionService } from '../../services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private sesionService: SesionService,
    private router: Router
  ) {
    if (this.sesionService.usuarioActual) {
    this.router.navigate(['/productos']);
  }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

      const usuarioValido = usuarios.find((u: any) => u.email === email && u.password === password);

      if (usuarioValido) {
        this.sesionService.login(usuarioValido);
        alert(`¡Bienvenido, ${usuarioValido.nombre}!`);
        this.router.navigate(['/productos']);
        this.mensajeError = '';
        this.loginForm.reset();
      } else {
        this.mensajeError = 'Email o contraseña incorrectos.';
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
