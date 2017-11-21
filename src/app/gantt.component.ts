import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import "dhtmlx-gantt";
import {GanttService} from "./gantt.service";

import {} from "@types/dhtmlxgantt";

@Component({
    selector: "gantt",
    styles: [
        `
        :host{
            display: block;
            height: 600px;
            position: relative;
            width: 100%;
        }
    `],
    providers: [GanttService],
    template: "<div #gantt_here style='width: 100%; height: 100%;'></div><button type='button' (click)='modifyData($event)'>click</button>",
})
export class GanttComponent implements OnInit {
    @ViewChild("gantt_here") ganttContainer: ElementRef;

    connection;

    constructor(private ganttService: GanttService){
    }

    ngOnInit(){
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        gantt.init(this.ganttContainer.nativeElement);
        var that = this;

        gantt.attachEvent("onAfterTaskUpdate", function(id,item){
            
            console.log('onAfterTaskUpdate ' + id);
            let ganttJson = gantt.serialize();
            that.ganttService.sendModel(ganttJson);
        });

       this.connection = this.ganttService.getModel().subscribe(data => {
            console.log('getModel');
            console.log(data);

            gantt.parse(data);  
       })
    }
}
