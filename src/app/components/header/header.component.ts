import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserService, User } from '../../services/user.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatInputModule, MatIconModule, MatProgressBarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchResult: User | null = null;
  showDropdown = false;
  notFound = false;
  isLoading = false;

  private searchTimer: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private loadingService: LoadingService
  ) {
    this.loadingService.loading$.subscribe(val => this.isLoading = val);
  }

  onSearch(value: string) {
    clearTimeout(this.searchTimer);
    this.searchResult = null;
    this.notFound = false;

    const id = parseInt(value, 10);
    if (!value || isNaN(id) || id < 1) {
      this.showDropdown = false;
      return;
    }

    this.showDropdown = true;

    this.searchTimer = setTimeout(() => {
      this.userService.getUser(id).subscribe(user => {
        if (user) {
          this.searchResult = user;
          this.notFound = false;
        } else {
          this.searchResult = null;
          this.notFound = true;
        }
      });
    }, 100);
  }

  selectUser(user: User) {
    this.showDropdown = false;
    this.router.navigate(['/user', user.id]);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  hideDropdown() {
    setTimeout(() => this.showDropdown = false, 150);
  }
}
