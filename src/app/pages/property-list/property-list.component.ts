import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyThumbComponent } from '@components/property-thumb/property-thumb.component';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { BlockUIModule } from 'primeng/blockui';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RealEstateService } from '@services/realestate.service';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { MainFooterComponent } from '@components/main-footer/main-footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-propiedades',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ScrollPanelModule,
    PropertyThumbComponent,
    TagModule,
    CurrencyPipe,
    DropdownModule,
    ButtonModule,
    BlockUIModule,
    SelectButtonModule,
    NgbDropdownModule,
    SliderModule,
    InputTextModule,
    FloatLabelModule,
    MainHeaderComponent,
    MainFooterComponent,
    RouterModule
  ],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss'
})
export class PropertyListPage {
  private formBuilder = inject(FormBuilder)
  private realEstateService = inject(RealEstateService)

  async ngOnInit() {
    this.realEstateService.getLocations().then(response => response.map((item: any) => this.locationsList.push({ label: item, value: item })))
    this.realEstateService.getTypes().then(response => response.map((item: any) => this.typePropertiesList.push({ label: item.label, value: item.propertyTypeId })))
    this.realEstateService.getStatus().then(response => response.map((item: any) => this.statusList.push({ label: item.label, value: item.propertyStatusId })))

    await this.realEstateService.getProperties().then((response) => this.propertiesList = response.content)

    this.filter()
  }

  public filterPanelShow: boolean = true
  public styleListing: string = 'grid'

  public filterForm = this.formBuilder.group({
    location: [null],
    typeProperty: [null],
    rooms: [null],
    bath: [null],
    status: [null],
    price: [[0, 25000000]],
    orderby: ['price_asc'],
  })

  get filterLocation() { return this.filterForm.get('location') }
  set filterLocation(value: any) { this.filterLocation.setValue(value) }
  get filterTypeProperty() { return this.filterForm.get('typeProperty') }
  set filterTypeProperty(value: any) { this.filterTypeProperty.setValue(value) }
  get filterRoom() { return this.filterForm.get('rooms') }
  set filterRoom(value: any) { this.filterRoom.setValue(value) }
  get filterBath() { return this.filterForm.get('bath') }
  set filterBath(value: any) { this.filterBath.setValue(value) }
  get filterStatus() { return this.filterForm.get('status') }
  set filterStatus(value: any) { this.filterStatus.setValue(value) }
  get filterPrice() { return this.filterForm.get('price') }
  set filterPrice(value: any) { this.filterPrice.setValue(value) }
  get filterOrderby() { return this.filterForm.get('orderby') }
  set filterOrderby(value: any) { this.filterOrderby.setValue(value) }

  public propertiesList: any = []
  public propertiesListFilter: any = []

  public locationsList: object[] = []
  public typePropertiesList: object[] = []
  public roomsList: object[] = [
    { name: 1, value: 1 },
    { name: 2, value: 2 },
    { name: 3, value: 3 },
    { name: 4, value: 4 },
    { name: 5, value: 5 },
    { name: 6, value: 6 },
    { name: 7, value: 7 },
    { name: 8, value: 8 },
    { name: 9, value: 9 },
    { name: 10, value: 10 },
  ]
  public bathList: object[] = [
    { name: 1, value: 1 },
    { name: 2, value: 2 },
    { name: 3, value: 3 },
    { name: 4, value: 4 },
    { name: 5, value: 5 },
    { name: 6, value: 6 },
    { name: 7, value: 7 },
    { name: 8, value: 8 },
    { name: 9, value: 9 },
    { name: 10, value: 10 },
  ]
  public statusList: object[] = []
  public orderList: object[] = [
    { name: 'Menor precio', value: 'price_asc' },
    { name: 'Mayor precio', value: 'price_desc' },
  ]

  async filter() {
    this.propertiesListFilter = this.propertiesList

    if (this.filterLocation.value !== null) {
      this.propertiesListFilter = this.propertiesListFilter.filter((item: any) => item.address.toUpperCase() === this.filterLocation.value.toUpperCase())
    }

    if (this.filterTypeProperty.value !== null) {
      this.propertiesListFilter = this.propertiesListFilter.filter((item: any) => item.typeId === this.filterTypeProperty.value)
    }

    if (this.filterRoom.value !== null) {
      this.propertiesListFilter = this.propertiesListFilter.filter((item: any) => item.room === this.filterRoom.value)
    }

    if (this.filterBath.value !== null) {
      this.propertiesListFilter = this.propertiesListFilter.filter((item: any) => item.bath === this.filterBath.value)
    }

    if (this.filterStatus.value !== null) {
      this.propertiesListFilter = this.propertiesListFilter.filter((item: any) => item.statusId === this.filterStatus.value)
    }

    if (this.filterPrice.value !== null) {
      this.propertiesListFilter = this.propertiesListFilter.filter((item: any) => item.price >= this.filterPrice.value[0] && item.price <= this.filterPrice.value[1])
    }

    switch (this.filterOrderby.value) {
      case 'price_asc':
      default:
        this.propertiesListFilter = this.propertiesListFilter.sort((low: any, high: any) => low.price - high.price);
        break;
      case 'price_desc':
        this.propertiesListFilter = this.propertiesListFilter.sort((low: any, high: any) => high.price - low.price);
        break;
    }
  }

  clearFilter() {
    this.filterForm.reset();
    this.filterPrice = [0, 25000000]
    this.filterOrderby = 'price_asc'
    this.filter()
  }

  onFilterLocationChange() {
    this.filter()
  }

  onFilterTypePropertyChange() {
    this.filter()
  }

  onFilterRoomChange() {
    this.filter()
  }

  onFilterBathChange() {
    this.filter()
  }

  onFilterStatusChange() {
    this.filter()
  }

  onFilterPriceChange() {
    this.filter()
  }

  onFilterOrderbyChange() {
    this.filter()
  }
}
