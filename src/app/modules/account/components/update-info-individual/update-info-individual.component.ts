import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { ePidTypes } from '@shared/enums';
import { RouteUtils } from '@shared/utils';
import { IFormUpdateInfoIndividual } from '@shared/models';

@Component({
  selector: 'mc-update-info-individual',
  templateUrl: './update-info-individual.component.html',
  styleUrls: ['./update-info-individual.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UpdateInfoIndividualComponent implements OnInit {
  readonly ePidTypes = ePidTypes;
  RouteUtils = RouteUtils;

  form!: FormGroup<IFormUpdateInfoIndividual>;

  pidTypeOptions = [ePidTypes.Nation, ePidTypes.IdentifyCard, ePidTypes.SocialInsurance, ePidTypes.DrivingLicense];

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control as FormGroup<IFormUpdateInfoIndividual>;
  }
}
