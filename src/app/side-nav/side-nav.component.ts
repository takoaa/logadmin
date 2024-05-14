import { Component } from '@angular/core';

import { Router } from '@angular/router'; // Import Router
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  showChildren: boolean = false;
  showSubmenu: { [key: string]: boolean } = {};

  constructor(private router: Router) {}

  // Navigation method to be called on click with routerLink alternatives
  navigate(path: string, event: MouseEvent): void {
    event.stopPropagation(); // Prevents the menu from collapsing
    this.router.navigate([path]); // Navigate programmatically
  }

  toggleChildren(event: MouseEvent): void {
    event.stopPropagation(); // Prevents the event from bubbling up
    this.showChildren = !this.showChildren; // Toggle visibility of children menu
  }

  toggleSubmenu(event: MouseEvent, submenuKey: string): void {
    event.stopPropagation(); // Prevents the event from bubbling up to toggleChildren
    this.showSubmenu = {
      ...this.closeAllSubmenusExcept(submenuKey),
      [submenuKey]: !this.showSubmenu[submenuKey] // Toggle the specific submenu
    };
  }

  // Closes all submenus except the one currently being toggled
  closeAllSubmenusExcept(submenuKey: string): { [key: string]: boolean } {
    const newSubmenuState: { [key: string]: boolean } = {};
    Object.keys(this.showSubmenu).forEach(key => {
      newSubmenuState[key] = key === submenuKey ? this.showSubmenu[key] : false;
    });
    return newSubmenuState;
  }

  // Prevent default action and stop propagation to maintain the state of the menu
  childClicked(event: MouseEvent): void {
    console.log('Child button clicked');
    event.stopPropagation(); // Stops the click from triggering toggleChildren
  }
}
