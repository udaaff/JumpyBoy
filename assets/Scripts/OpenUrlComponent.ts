import { _decorator, Component, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OpenUrlComponent')
export class OpenUrlComponent extends Component {

    @property
    public url = 'https://www.example.com';

    protected override onLoad() {
        this.node.on(Button.EventType.CLICK, this.openUrl, this);
    }

    private openUrl() {
        if (this.url) {
            window.open(this.url, '_blank');
        }
    }
}
