import { Header } from "../components/components";
import StartPage from "../components/view/pages/StartPage";

export type Routes = { [key: string]: typeof StartPage };
export type Components = { [key: string]: typeof Header };
export type InitSpa = { [key: string]: typeof Header };

export interface ISpa {
    container: string;
    routes: Routes;
    components: Components;
}