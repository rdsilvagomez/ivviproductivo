 
import {Component, Input, OnDestroy,OnInit} from '@angular/core';
 
@Component({
  	moduleId: module.id,
    selector: 'spinner',
    templateUrl: '../../views/spinner/spinner.html'
})
export class SpinnerComponent implements OnDestroy {  
    private currentTimeout: any;
    private isDelayedRunning: boolean = false;
   

    @Input()
    public delay: number = 300;

    @Input()
    public set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            this.isDelayedRunning = false;
            return;
        }

        if (this.currentTimeout) {
            return;
        }

        this.currentTimeout = setTimeout(() => {
            this.isDelayedRunning = value;
            this.cancelTimeout();
        }, this.delay);
    }

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }

    ngOnDestroy(): any {
        this.cancelTimeout();
    }
}