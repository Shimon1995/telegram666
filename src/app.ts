import { AppComponent } from "./app.component";
import { DialogueService } from "./services/dialogue.service";
import { MessagesService } from "./services/messages.service";


export function main () {

    
    const app = new AppComponent(
        new DialogueService(new MessagesService()),
        new MessagesService(),
    );

    app.Init();
    
}