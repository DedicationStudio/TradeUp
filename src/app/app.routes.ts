import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuestFormComponent } from './quest-form/quest-form.component';
import { HomeComponent } from './home/home.component';
import { QuestFinishComponent } from './quest-finish/quest-finish.component';
import { LogUpComponent } from './log-up/log-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

export const routes: Routes = [
    {
        path: '',
        component: PortfolioComponent
    },
    {
        path: 'learn/:idUser',
        component: HomeComponent
    },
    {
        path: 'exercise/:levelId/:missionTag/:idUser',
        component: QuestFormComponent
    },
    {
        path: 'level-review/:idUser',
        component: QuestFinishComponent
    },
    {
        path: 'subscribe',
        component: LogUpComponent
    },
    {
        path: 'log-in',
        component: LogInComponent
    }
]