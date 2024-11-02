import { _decorator, CCFloat, Component, Vec3 } from 'cc';
import { PlayerBody } from './PlayerBody';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property({ type: PlayerBody })
    private playerBody: PlayerBody | null;

    @property({ type: CCFloat })
    private speed = 2;

    private _isRunning = false;
    private _isFalling = false;

    public move(): void {
        if (this._isRunning)
            return;

        this._isRunning = true;
        this.playerBody.run();
    }

    public fall(): void {
        if (this._isFalling)
            return;

        this._isFalling = true;
        this._isRunning = false;
        this.playerBody.stop();
    }

    public reset(): void {
        if (!this._isRunning)
            return;

        this._isRunning = false;
        this._isFalling = false;
        this.node.setPosition(new Vec3(0, 0, 0));
        this.playerBody.reset();
    }

    protected override update(deltaTime: number) {
        if (!this._isRunning)
            return;

        this.node.setPosition(new Vec3(0, 0, this.node.position.z + this.speed * deltaTime));
    }
}


