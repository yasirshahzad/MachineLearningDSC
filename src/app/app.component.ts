import { RequestResultService } from "./services/request-result.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  form: FormGroup;
  constructor(private fb: FormBuilder, private req: RequestResultService) {
    this.form = fb.group({
      age: ["", [Validators.required]],
      sex: ["", [Validators.required]],
      trestbps: ["", [Validators.required]],
      chol: ["", [Validators.required]],
      fbs: ["", [Validators.required]],
      thalach: ["", [Validators.required]],
      exang: ["", [Validators.required]],
      oldpeak: ["", [Validators.required]],
      ca: ["", [Validators.required]],
      cp_0: ["", [Validators.required]],
      cp_1: ["", [Validators.required]],
      cp_2: ["", [Validators.required]],
      cp_3: ["", [Validators.required]],
      thal_0: ["", [Validators.required]],
      thal_1: ["", [Validators.required]],
      thal_2: ["", [Validators.required]],
      thal_3: ["", [Validators.required]],
      slope_0: ["", [Validators.required]],
      slope_1: ["", [Validators.required]],
      slope_2: ["", [Validators.required]],
      restecg_0: ["", [Validators.required]],
      restecg_1: ["", [Validators.required]],
      restecg_2: ["", [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe();
  }

  isLoading = false;

  slope = null;
  cp = null;
  thal = null;
  restecg = null;

  requestSubscription: Subscription;

  ngOnInit(): void {}

  //Submitting Values and Calling Service.
  fbs;
  disease;
  result;

  async submitForm(val) {
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    }

    this.isLoading = true;

    this.result = await this.req.getResult(val).toPromise();

    let positive = 0;
    let negative = 0;

    if (this.result != null) {
      Object.values(this.result).forEach(val => {
        if (val == 1) {
          positive += 1;
        } else {
          negative += 1;
        }
      });
    }

    this.disease = {
      positive: positive,
      negative: negative,
      result: true
    };

    console.log("Positive: ", positive);
    console.log("Negative", negative);

    this.isLoading = false;
  }

  //Changging Restecg
  restecgChange(val) {
    if (val == 0) {
      this.form.patchValue({
        restecg_0: 1,
        restecg_1: 0,
        restecg_2: 0
      });
    } else if (val == 1) {
      this.form.patchValue({
        restecg_0: 0,
        restecg_1: 1,
        restecg_2: 0
      });
    }
    if (val == 2) {
      this.form.patchValue({
        restecg_0: 0,
        restecg_1: 0,
        restecg_2: 1
      });
    } else {
      this.form.markAsDirty();
    }
  }

  //Changing Thal
  changeThal(val) {
    if (val == 0) {
      this.form.patchValue({
        thal_0: 1,
        thal_1: 0,
        thal_2: 0,
        thal_3: 0
      });
    } else if (val == 1) {
      this.form.patchValue({
        thal_0: 0,
        thal_1: 1,
        thal_2: 0,
        thal_3: 0
      });
    } else if (val == 2) {
      this.form.patchValue({
        thal_0: 0,
        thal_1: 0,
        thal_2: 1,
        thal_3: 0
      });
    } else if (val == 3) {
      this.form.patchValue({
        thal_0: 0,
        thal_1: 0,
        thal_2: 0,
        thal_3: 1
      });
    } else {
      this.form.markAsDirty();
    }
  }

  //Changing Slope
  changeSlope(val) {
    if (val == 0) {
      this.form.patchValue({
        slope_0: 1,
        slope_1: 0,
        slope_2: 0
      });
    } else if (val == 1) {
      this.form.patchValue({
        slope_0: 0,
        slope_1: 1,
        slope_2: 0
      });
    } else if (val == 2) {
      this.form.patchValue({
        slope_0: 0,
        slope_1: 0,
        slope_2: 1
      });
    } else {
      this.form.markAsDirty();
    }
  }

  //Changing CP
  changeCP(val) {
    if (val == 0) {
      this.form.patchValue({
        cp_0: 1,
        cp_1: 0,
        cp_2: 0,
        cp_3: 0
      });
    } else if (val == 1) {
      this.form.patchValue({
        cp_0: 0,
        cp_1: 1,
        cp_2: 0,
        cp_3: 0
      });
    } else if (val == 2) {
      this.form.patchValue({
        cp_0: 0,
        cp_1: 0,
        cp_2: 1,
        cp_3: 0
      });
    } else if (val == 3) {
      this.form.patchValue({
        cp_0: 0,
        cp_1: 0,
        cp_2: 0,
        cp_3: 1
      });
    } else {
      this.form.markAsDirty();
    }
  }

  //Change FBS

  changeFBS(val) {
    if (val > 120) {
      this.form.patchValue({
        fbs: 1
      });
    } else {
      this.form.patchValue({
        fbs: 0
      });
    }
  }
}
