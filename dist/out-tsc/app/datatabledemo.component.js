var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { CarService } from './service/carservice';
export var DataTableCrudDemo = (function () {
    function DataTableCrudDemo(carService) {
        this.carService = carService;
        this.car = new PrimeCar();
    }
    DataTableCrudDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsMedium().then(function (cars) { return _this.cars = cars; });
    };
    DataTableCrudDemo.prototype.showDialogToAdd = function () {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    };
    DataTableCrudDemo.prototype.save = function () {
        if (this.newCar)
            this.cars.push(this.car);
        else
            this.cars[this.findSelectedCarIndex()] = this.car;
        this.car = null;
        this.displayDialog = false;
    };
    DataTableCrudDemo.prototype.delete = function () {
        this.cars.splice(this.findSelectedCarIndex(), 1);
        this.car = null;
        this.displayDialog = false;
    };
    DataTableCrudDemo.prototype.onRowSelect = function (event) {
        this.newCar = false;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    };
    DataTableCrudDemo.prototype.cloneCar = function (c) {
        var car = new PrimeCar();
        for (var prop in c) {
            car[prop] = c[prop];
        }
        return car;
    };
    DataTableCrudDemo.prototype.findSelectedCarIndex = function () {
        return this.cars.indexOf(this.selectedCar);
    };
    DataTableCrudDemo = __decorate([
        Component({
            selector: 'datatable-demo',
            templateUrl: './datatabledemo.component.html',
            styleUrls: ['./datatabledemo.component.css']
        }), 
        __metadata('design:paramtypes', [CarService])
    ], DataTableCrudDemo);
    return DataTableCrudDemo;
}());
export var PrimeCar = (function () {
    function PrimeCar(vin, year, brand, color) {
        this.vin = vin;
        this.year = year;
        this.brand = brand;
        this.color = color;
    }
    return PrimeCar;
}());
//# sourceMappingURL=D:/WebstormProjects/primeng-quickstart-cli/src/app/datatabledemo.component.js.map