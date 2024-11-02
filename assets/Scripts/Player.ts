import { _decorator, CCFloat, Component, Tween, tween, Vec3 } from 'cc';
import { PlayerBody } from './PlayerBody';
const { ccclass, property } = _decorator;

const FALL_DURATION = 1.5;

@ccclass('Player')
export class Player extends Component {
    @property({ type: PlayerBody })
    private playerBody!: PlayerBody;

    @property({ type: CCFloat })
    private speed = 2;

    private _isRunning = false;
    private _fallTween: Tween | null = null;

    public move(): void {
        this._isRunning = true;
        this.playerBody.run();
    }

    public fall(onComplete: () => void): void {
        this._isRunning = false;
        this.playerBody.stop();

        this._fallTween = tween(this.playerBody.node)
            .by(FALL_DURATION, {
                eulerAngles: new Vec3(720, 720, 720),
                position: new Vec3(0, 20, 0),
            })
            .call(onComplete)
            .start();
    }

    public jump(onComplete: () => void): void {
        this.playerBody.jump(onComplete);
    }

    public reset(): void {
        this._fallTween?.stop();
        this._isRunning = false;
        this.node.setPosition(new Vec3(0, 0, 0));
        this.playerBody.reset();
    }

    public stop(): void {
        this.playerBody.stop();
        this._isRunning = false;
    }

    protected override update(deltaTime: number) {
        if (!this._isRunning)
            return;

        this.node.setPosition(new Vec3(0, 0, this.node.position.z + this.speed * deltaTime));
    }
}


