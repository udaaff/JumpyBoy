import { _decorator, Component, EventMouse, EventTouch, Input, input, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const JUMP_HEIGHT = 3.5;
const JUMP_DURATION = 0.5;

@ccclass('Body')
export class Body extends Component {
    private _isJumping = false;

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    private onTouchStart(event: EventTouch): void {
        this.jump();
    }

    private onJumpComplete(): void {
        this._isJumping = false;
    }

    private jump(): void {
        if (this._isJumping)
            return;

        this._isJumping = true;

        tween(this.node)
            .by(JUMP_DURATION, { position: new Vec3(0, JUMP_HEIGHT, 0) }, { easing: 'smooth' })
            .by(JUMP_DURATION, { position: new Vec3(0, -JUMP_HEIGHT, 0) }, { easing: 'smooth' })
            .call(this.onJumpComplete, this)
            .start();
    }
}


