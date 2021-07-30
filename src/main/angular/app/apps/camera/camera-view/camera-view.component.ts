import {Component, OnInit} from '@angular/core';
// import {io} from "socket.io-client"

// const socket = io({
//     transports: ["websocket"]
// });

@Component({
    selector: 'app-camera-view',
    templateUrl: './camera-view.component.html',
    styleUrls: ['./camera-view.component.scss']
})
export class CameraViewComponent implements OnInit {

    constructor() {
        // socket.connect()
    }

    ngOnInit() {
    }

}
