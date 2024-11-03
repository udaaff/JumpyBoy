import { _decorator, Component, Input, input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FinalUI')
export class FinalUI extends Component {
    @property
    public url = 'https://www.example.com';

    protected override onLoad() {
        input.on(Input.EventType.TOUCH_START, this.openUrl, this);
    }

    private openUrl() {
        if (this.url) {
            window.open(this.url, '_blank');
        }
    }

    protected override onDisable(): void {
        input.off(Input.EventType.TOUCH_START, this.openUrl, this);
    }
}


