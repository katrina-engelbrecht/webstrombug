import { Component, OnInit } from '@angular/core';
import { CarService } from './service/carservice';


@Component({
    selector: 'datatable-demo',
    templateUrl: './datatabledemo.component.html',
    styleUrls: ['./datatabledemo.component.css']
})
export class DataTableCrudDemo  implements OnInit {
    displayDialog: boolean;

    car: PrimeCar = new PrimeCar();

    selectedCar: PrimeCar;

    newCar: boolean;

    cars: PrimeCar[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);
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
}

export class PrimeCar {

    constructor(public vin?, public year?, public brand?, public color?) { }

}
