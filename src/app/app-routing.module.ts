import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from './authorization.guard';
import { GuestComponent } from './guest/guest.component';
import { WriterComponent } from './writer/writer.component';
import { AuthorComponent } from './author/author.component';
import { AdminComponent } from './admin/admin.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [ AuthorizationGuard ],
    children: [
      {
        path: '',
        component: GuestComponent,
        data: {}
      },
      {
        path: 'writer',
        component: WriterComponent,
        data: {
          allowedRoles: [ 'admin', 'writer', 'author' ]
        }
      },
      {
        path: 'author',
        component: AuthorComponent,
        data: {
          allowedRoles: [ 'admin', 'author' ]
        }
      },
      {
        path: 'admin',
        component: AdminComponent,
        data: {
          allowedRoles: [ 'admin' ]
        }
      },
      {
        path: 'access-denied',
        component: AccessDeniedComponent,
        data: {}
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
