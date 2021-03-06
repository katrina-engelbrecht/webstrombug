import { Component, OnInit } from '@angular/core';
import { CarService } from './service/carservice';
import {LazyLoadEvent} from 'primeng/primeng';
import {Message} from 'primeng/primeng';


// parse a date in dd.mm.yyyy format
function parseDate(input) {
    var parts = input.split('.');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[2], parts[1]-1, parts[0]); // Note: months are 0-based
}
@Component({
    selector: 'my-datatable',
    templateUrl: './mydatatable.component.html',
    styleUrls: ['./mydatatable.component.css']
})
export class MyDataTable implements OnInit {
    msgs: Message[] = [];

    dateFilter: Date;
    brands: any[];
    displayDialog: boolean;

    car: PrimeCar = new PrimeCar();

    selectedCar: PrimeCar;

    newCar: boolean;

    cars: PrimeCar[];
    datasource: PrimeCar[];
    totalRecords: number;

    constructor(private carService: CarService) { }



    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);
        //datasource imitation
        // this.carService.getCarsLarge().then(cars => {
        //     this.datasource = cars;
        //     this.totalRecords = this.datasource.length;
        //     this.cars = this.datasource.slice(0, 10);
        // });
        this.brands = [];
        this.brands.push({label: 'All Brands', value: null});
        this.brands.push({label: 'Audi', value: 'Audi'});
        this.brands.push({label: 'BMW', value: 'BMW'});
        this.brands.push({label: 'Fiat', value: 'Fiat'});
        this.brands.push({label: 'Honda', value: 'Honda'});
        this.brands.push({label: 'Jaguar', value: 'Jaguar'});
        this.brands.push({label: 'Mercedes', value: 'Mercedes'});
        this.brands.push({label: 'Renault', value: 'Renault'});
        this.brands.push({label: 'VW', value: 'VW'});
        this.brands.push({label: 'Volvo', value: 'Volvo'});
    }
    loadCarsLazy(event: LazyLoadEvent) {
        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        //imitate db connection over a network
        setTimeout(() => {
            if(this.datasource) {
                this.cars = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    showDialogToAdd() {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    }

    save() {
        if (this.newCar)
            this.cars.push(this.car);
        else
            this.cars[this.findSelectedCarIndex()] = this.car;

        this.car = null;
        this.displayDialog = false;
    }

    delete() {
        this.cars.splice(this.findSelectedCarIndex(), 1);
        this.car = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newCar = false;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    }

    cloneCar(c: PrimeCar): PrimeCar {
        let car = new PrimeCar();
        for (let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }

    findSelectedCarIndex(): number {
        return this.cars.indexOf(this.selectedCar);
    }

    /**
     * for datepicker column filter
     * @param event
     * @param dt
     * @param colField
     * @param colFilterMatchMode
     */
    onSelectCalendarInputPrimeng(event: any, dt: any, colField: any, colFilterMatchMode: any) {
        let dateFormat=require('dateformat');
        console.log('entro on select');
        let stringDateFilter = dateFormat(this.dateFilter,"dd.mm.yyyy");
        dt.filter(stringDateFilter, colField, colFilterMatchMode);
    }
    onSelectCalendarInputForEditor(event: any,car:PrimeCar,colfield) {

        let dateFormat=require('dateformat');
        let stringDate= dateFormat(event,"dd.mm.yyyy");
        car[colfield]=stringDate;

    }
    onBlurCalendarInputPrimeng(event: any, dt: any, colField: any, colFilterMatchMode: any) {
        console.log('entro a blur');
        let beforeDateFilter = this.dateFilter;
        if (!this.dateFilter || this.dateFilter == null) {
            console.log('entro a reset');
            dt.filter('', colField, colFilterMatchMode);
        }
        this.dateFilter = beforeDateFilter;
    }

    /**
     * sort string as date with format 'dd.mm.yyyy'
     * @param event
     */
    datesort(event) {
        console.log("datesort event begins");
        let comparer = function (a:Object, b:Object): number {
            let sa=a['saleDate'];
            let sb=b['saleDate'];
            let isaempty=false,isbempty=false;
            if(sa===null||typeof sa==='undefined')
                isaempty=true;
            if(sb===null||typeof sb==='undefined')
                isbempty=true;
            if(isaempty&&isbempty)
                return 0;
            else if(isaempty&&!isbempty)
                return 1 ;
            else if(!isaempty&&isbempty)
                return -1 ;
            else if(!isaempty&&!isbempty) {
                let dateA: Date = parseDate(a['saleDate']);

                let dateB: Date = parseDate(b['saleDate']);
                if (dateA > dateB)
                    return 1 * event.order;
                else if (dateA < dateB)
                    return -1 * event.order;
                else if (dateA === dateB)
                    return 0;
            }
        };



        this.cars.sort(comparer);
    }
    selectCar(car: PrimeCar) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Car Select', detail:'Vin: ' + car.vin});
    }

}

export class PrimeCar {

    constructor(public vin?, public year?, public brand?, public color?,public saleDate?) { }

}
