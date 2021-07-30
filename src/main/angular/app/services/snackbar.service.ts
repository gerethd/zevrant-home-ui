import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    constructor(private snackBar: MatSnackBar) {
    }

    displayMessage(message: string, duration: number) {
        this.snackBar.open(message)
        new Promise(resolve => setTimeout(resolve, duration)).then(() => {
            this.snackBar.dismiss();
        });
    }
}
