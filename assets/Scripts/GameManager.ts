import { _decorator, BoxCollider, Component, EPhysicsDrawFlags, EventTouch, input, Input, ITriggerEvent, Node, PhysicsSystem } from 'cc';
import { Boxes } from './Boxes';
import { Player } from './Player';
import { PlayerBody } from './PlayerBody';
import { FinalUI } from './FinalUI';
const { ccclass, property } = _decorator;

const MAX_FALLS = 1;
const MAX_JUMPS = 5;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: Player })
    private player!: Player;

    @property({ type: PlayerBody })
    private playerBody!: PlayerBody;

    @property({ type: Node })
    private gameUI!: Node;

    @property({ type: FinalUI })
    private finalUI!: FinalUI;

    @property({ type: Node })
    private tapToRun!: Node;

    private _numFalls = 0;
    private _numJumps = 0;

    protected override onLoad(): void {
        this.finalUI.node.active = false;
        input.once(Input.EventType.TOUCH_START, this.onGameStart, this);
    }

    protected override start(): void {
        const collider = this.playerBody.getComponent(BoxCollider);
        collider?.on('onCollisionEnter', this.onCollisionEnter, this);
    }

    private onCollisionEnter(event: ITriggerEvent): void {
        if (this._numFalls++ == MAX_FALLS) {
            this.player.fall(() => this.showGameOver());
            return;
        }

        input.off(Input.EventType.TOUCH_START, this.onPlayerJump, this);
        this.player.fall(() => this.showTryAgain());
    }

    private showGameOver(): void {
        this.gameUI.active = false;
        this.finalUI.node.active = true;
    }

    private showTryAgain(): void {
        this.tapToRun.active = true;
        input.once(Input.EventType.TOUCH_START, this.onGameStart, this);
    }

    private onGameStart(_event: EventTouch): void {
        input.on(Input.EventType.TOUCH_START, this.onPlayerJump, this);
        this._numJumps = 0;
        this.tapToRun.active = false;
        this.player.reset();
        this.player.move();
    }

    private onPlayerJump(_event: EventTouch): void {
        this.player.jump(() => this.onJumpComplete());
    }

    private onJumpComplete(): void {
        if (++this._numJumps == 5) {
            input.off(Input.EventType.TOUCH_START, this.onPlayerJump, this);
            this.player.stop();
            this.showGameOver();
        }
    }
}


