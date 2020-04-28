import {Component, OnInit} from '@angular/core';
import {GithubService} from '../../services/github.service';
import {AccountInfo} from '../../models/AccountInfo';
import {ElectronService} from '../../services/electron.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {FilteredOptions} from '../../models/FilteredOptions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  accounts: Map<string, AccountInfo>;
  myControl = new FormControl();
  filteredOptions: Observable<FilteredOptions[]>;

  constructor(private githubService: GithubService,
              private electronService: ElectronService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.accounts = new Map<string, AccountInfo>();
    this.myControl = new FormControl();
    this.myControl.valueChanges.subscribe(searchText => {
      this.getOptions(searchText);
    });
  }

  minimizeWindow() {
    this.electronService.window.minimize();
  }

  closeWindow() {
    this.electronService.window.close();
  }

  addRepo(username: string) {
    username = username.trim().toLowerCase();
    this.githubService.getAccountInfo(username).subscribe((accountInfo: AccountInfo ) => {
      if (accountInfo.repositoryOwner != null) {
        accountInfo.showMore = true;
        this.accounts.set(username, accountInfo);
      } else {
        this.openSnackBar(`User doesn't exist`);
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      panelClass: 'snackbar'
    });
  }

  deleteAccountInfo(account: any) {
    this.accounts.delete(account.key);
  }

  asIsOrder(a, b) {
    return 1;
  }

  getOptions(searchText: string) {
    searchText = searchText.trim().toLowerCase();
    this.filteredOptions = this.githubService.getUsers(`${searchText} in:login`);
  }

}
