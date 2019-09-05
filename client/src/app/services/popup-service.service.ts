import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignupSigninDialogComponent } from '../signup-signin-dialog/signup-signin-dialog.component';
import { Observable } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
@Injectable({
  providedIn: 'root'
})
export class PopupServiceService {
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar) {}
  


  public openSignUpDialog(): Observable<any> {
    const dialogRef = this.dialog.open(SignupSigninDialogComponent, {
      height: 'auto',
      width: '600px'
    });

    return dialogRef.afterClosed();
  }

  public openSnackBar(message: string, config:MatSnackBarConfig) {
    this.snackBar.open(
      message, null,
      config
    );
  }
}
