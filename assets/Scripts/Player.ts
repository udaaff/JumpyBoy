import { _decorator, CCFloat, Component, tween, Vec3 } from 'cc';
import { PlayerBody } from './PlayerBody';
const { ccclass, property } = _decorator;

const FALL_DURATION = 2;

@ccclass('Player')
export class Player extends Component {
    @property({ type: PlayerBody })
    private playerBody: PlayerBody | null;

    @property({ type: CCFloat })
    private speed = 2;

    private _isRunning = false;

    public move(): void {
        this._isRunning = true;
        this.playerBody.run();
    }

    public fall(onComplete?: () => void): void {
        this._isRunning = false;
        this.playerBody.stop();

        tween(this.playerBody.node)
            .by(FALL_DURATION, {
                eulerAngles: new Vec3(720, 720, 720),
                position: new Vec3(0, 20, 0),
            })
            .call(onComplete)
            .start();
    }

    public jump(): void {
        this.playerBody.jump();
    }

    public reset(): void {
        this._isRunning = false;
        this.node.setPosition(new Vec3(0, 0, 0));
        this.playerBody.reset();
    }

    protected override update(deltaTime: number) {
        if (!this._isRunning)
            return;

        this.node.setPosition(new Vec3(0, 0, this.node.position.z + this.speed * deltaTime));
    }
}


