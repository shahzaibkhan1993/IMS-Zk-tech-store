import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
    <img width="100%" height="100%" src="../../../../assets/images/logos/logo-transp.png" alt="logo" >
 <h3>Inventory System</h3>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
