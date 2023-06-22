import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  router: any;
  formBuilder: any;
  editForm: any;
  tripService: any;
  submitted: boolean;

  constructor() { }

  ngOnInit() {
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn't find where tripCode was stashed");
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson:['', Validators.required],
      image:['', Validators.required],
      description: ['', Validators.required],
    })
    this.tripService.getTrip(tripCode)
    .then(data => {
      console.log(data);
      this.editForm.patchValue(data);
    })

    onSubmit() {
      this.submitted = true;

      if (this.editForm.valid) {
        this.tripService.updateTrip(this.editForm.value)
        .then(data => {
          console.log(data);
          this.router.navigate(['']);
        })
      }
    }
  }

}
