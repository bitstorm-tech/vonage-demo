import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GetCodePageRoutingModule } from './get-code-routing.module';
import { GetCodePage } from './get-code.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GetCodePageRoutingModule,
        HttpClientModule
    ],
    declarations: [GetCodePage]
})
export class GetCodePageModule {
}
