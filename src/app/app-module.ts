import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Logic } from './logic/logic';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Contact } from './contact/contact';
import { Dashboard } from './dashboard/dashboard';

@NgModule({
  declarations: [App, Home, Logic, Login, Signup, Contact, Dashboard],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
