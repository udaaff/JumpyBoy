import { _decorator, Component, director, EventTouch, input, Input, Node } from 'cc';
import { Player } from './Player';
import { Boxes } from './Boxes';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: Player })
    private player: Player;

    @property({ type: Boxes })
    private boxes: Boxes;

    protected onLoad(): void {
        input.once(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    private onTouchStart(event: EventTouch): void {
        this.player.run();
        this.boxes.move();
    }
}


