import { _decorator, BoxCollider, Component, EPhysicsDrawFlags, EventTouch, input, Input, ITriggerEvent, PhysicsSystem } from 'cc';
import { Boxes } from './Boxes';
import { Player } from './Player';
import { PlayerBody } from './PlayerBody';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: Player })
    private player: Player | null;

    @property({ type: PlayerBody })
    private playerBody: PlayerBody | null;

    @property({ type: Boxes })
    private boxes: Boxes| null;

    protected onLoad(): void {
        input.once(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    protected override start(): void {
        const collider = this.playerBody.getComponent(BoxCollider);
        collider.on('onCollisionEnter', this.onCollisionEnter, this);
        PhysicsSystem.instance.debugDrawFlags = EPhysicsDrawFlags.AABB;
    }

    private onCollisionEnter(event: ITriggerEvent): void {
        console.log("GM")
        this.player.fall();
    }

    private onTouchStart(_event: EventTouch): void {
        this.player.move();
    }
}


