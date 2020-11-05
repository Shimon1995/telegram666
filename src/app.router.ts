export class StartComponent {
    View () {
        return `
            Start
        `;
    }
};

export class ReportComponent {
    View () {
        return `
            Report
        `;
    }
};

export const router = [
    { path: 'start', component: StartComponent },
    { path: '/', component: ReportComponent },
    // { path: 'report': component: ,children: [] }
];